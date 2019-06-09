const path = require('path')
const {promisify} = require('util')

const stat = promisify(require('fs').stat)
const resize = promisify(require('imagemagick').resize)

const {pictureWidths} = require('./layout')

export default (filename) => {
  const ext = path.extname(filename)

  return Promise.all([
    stat(filename),
    (stat(filename.replace(ext, `-${pictureWidths[0]}` + ext))
      .catch(() => {})
    ),
  ]).then(([srcStat, dstStat]) => (
    !dstStat || srcStat.mtime > dstStat.mtime
  )).then((shouldWriteImages) => {
    return (shouldWriteImages && Promise.all(pictureWidths.map((width) => (
      resize({
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
