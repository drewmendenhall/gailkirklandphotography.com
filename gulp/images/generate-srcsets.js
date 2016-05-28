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

  const ext = path.extname(pictureUrl)
  const picture = gallery.pictures.find((picture) => (
    picture.url === pictureUrl
  ))

  if (!picture) return

  return im.identifyAsync(filename).then((features) => {
    const aspectRatio = features.width / features.height

    picture.minWidth = features.width + layoutWidth
    picture.minHeight = features.height + layoutHeight

    picture.srcSet = [{
      url: pictureUrl.replace(ext, `-${widths[0] - layoutWidth}` + ext),
    }]
    widths.forEach((width, index) => {
      const pictureWidth = pictureWidths[index + 1]

      if (pictureWidth && pictureWidth < features.width) {
        picture.srcSet.push({
          height: Math.round(
            (width - layoutWidth) / aspectRatio
          ) + layoutHeight,
          width,
          url: pictureUrl.replace(ext, `-${pictureWidth}` + ext),
        })
      }
    })
  }).then(() => {
    return fs.writeFileAsync(path.resolve(__dirname, '../../public/galleries.json'),
      JSON.stringify(galleries, null, 2) + '\n'
    )
  })
}
