const Promise = require('bluebird')

const fs = Promise.promisifyAll(require('fs'))
const im = Promise.promisifyAll(require('imagemagick'))
const path = require('path')

const {pictureWidths} = require('./layout')

export default (filename) => {
  const ext = path.extname(filename)

  return Promise.all([
    fs.statAsync(filename),
    (fs.statAsync(filename.replace(ext, `-${pictureWidths[0]}` + ext))
      .catch(() => {})
    ),
  ]).then(([srcStat, dstStat]) => (
    !dstStat || srcStat.mtime > dstStat.mtime
  )).then((shouldWriteImages) => {
    return (shouldWriteImages && Promise.all(pictureWidths.map((width) => (
      im.resizeAsync({
        srcPath: filename,
        dstPath: filename.replace(ext, `-${width}` + ext),
        width,
      }).then((stdout, stderr) => {
        if (stdout) console.log(stdout)
        if (stderr) console.error(stderr)
      })
    ))))
  })
}
