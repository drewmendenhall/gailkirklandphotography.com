const path = require('path')
const {promisify} = require('util')

const stat = promisify(require('fs').stat)
const resize = promisify(require('imagemagick').resize)

const {pictureWidths} = require('./layout')

export default async (filename) => {
  const ext = path.extname(filename)

  const [srcStat, dstStat] = await Promise.all([
    stat(filename),
    stat(filename.replace(ext, `-${pictureWidths[0]}` + ext)).catch(() => {}),
  ])

  const shouldWriteImages = !dstStat || srcStat.mtime > dstStat.mtime

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
}
