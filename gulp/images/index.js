import filter from 'gulp-filter'
import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import livereload from 'gulp-livereload'
import newer from 'gulp-newer'
import path from 'path'
import {log, PluginError} from 'gulp-util'
import {Transform} from 'stream'

import generateSrcsets from './generate-srcsets'
import resizeImage from './resize-image'

const destPath = 'public/images'
const sourceFilePattern = [
  '.env',
  'images/**',
  path.join(__dirname, '**'),
]

gulp.task('images', () => gulp.src(sourceFilePattern)
  .pipe(newer(destPath))
  .pipe(filter('images/**'))
  .pipe(imagemin())
  .pipe(gulp.dest(destPath))
  .pipe(new Transform({objectMode: true, transform: (file, enc, cb) => {
    if (file.isDirectory() ||
      file.relative.startsWith('favicons') ||
      path.extname(file.relative) !== '.jpg'
    ) {
      return cb(null, file)
    }

    const relativePath = path.join(destPath, file.relative)

    log(`images generated for ${relativePath}`)

    resizeImage(relativePath).then((imagesWritten) => (
      imagesWritten && generateSrcsets(relativePath)
    )).then(() => {
      cb(null, file)
    }).catch((error) => {
      throw new PluginError('image', error)
    })
  }}))
  .pipe(livereload())
)

gulp.task('watch:images', () => {
  livereload.listen()
  gulp.watch(sourceFilePattern, ['images'])
})