const Promise = require('bluebird')

const fs = Promise.promisifyAll(require('fs'))
const im = Promise.promisifyAll(require('imagemagick'))
const path = require('path')

const galleries = require('../../public/galleries.json')
const {layoutHeight, layoutWidth, pictureWidths, widths} = require('./layout')

export default (filename) => {
  const matches = filename.match(/\/images\/([^\/]+)\/.+/)

  if (!matches) return

  const galleryName = matches[1]
  const gallery = galleries[galleryName]

  if (!gallery) return

  const pictureUrl = matches[0]
  const {pictures} = gallery

  const ext = path.extname(pictureUrl)
  const picture = pictures.find((picture) => (
    picture.url === pictureUrl
  ))

  if (!picture) return

  const serializedPicture = JSON.stringify(picture)

  const newPicture = JSON.parse(serializedPicture)

  return im.identifyAsync(filename).then((features) => {
    const aspectRatio = features.width / features.height

    newPicture.minWidth = features.width + layoutWidth
    newPicture.minHeight = features.height + layoutHeight

    newPicture.srcSet = [{
      url: pictureUrl.replace(ext, `-${widths[0] - layoutWidth}` + ext),
    }]
    widths.forEach((width, index) => {
      const pictureWidth = pictureWidths[index + 1]

      if (pictureWidth && pictureWidth < features.width) {
        newPicture.srcSet.push({
          height: Math.round(
            (width - layoutWidth) / aspectRatio
          ) + layoutHeight,
          width,
          url: pictureUrl.replace(ext, `-${pictureWidth}` + ext),
        })
      }
    })
  }).then(() => {
    if (JSON.stringify(newPicture) === serializedPicture) {
      return Promise.resolve()
    }

    pictures[pictures.indexOf(picture)] = newPicture

    return fs.writeFileAsync(
      path.resolve(__dirname, '../../public/galleries.json'),
      JSON.stringify(galleries, null, 2) + '\n'
    )
  })
}
