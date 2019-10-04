import PluginError from 'plugin-error'
import filter from 'gulp-filter'
import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import newer from 'gulp-newer'
import path from 'path'
import {Transform} from 'stream'

import generateSrcsets from './generate-srcsets'
import resizeImage from './resize-image'

const destPath = 'public/images'
const sourceFilePattern = ['images/**', path.join(__dirname, '**')]

gulp.task('images', () =>
  gulp
    .src(sourceFilePattern)
    .pipe(newer(destPath))
    .pipe(filter('images/**'))
    .pipe(imagemin())
    .pipe(gulp.dest(destPath))
    .pipe(
      new Transform({
        objectMode: true,
        transform: async (file, encoding, callback) => {
          if (
            file.isDirectory() ||
            file.relative.startsWith('favicons') ||
            path.extname(file.relative) !== '.jpg'
          ) {
            return callback(null, file)
          }

          const relativePath = path.join(destPath, file.relative)

          console.log(`images generated for ${relativePath}`)

          try {
            await resizeImage(relativePath)
            await generateSrcsets(relativePath)
            callback(null, file)
          } catch (error) {
            throw new PluginError('image', error)
          }
        },
      }),
    ),
)
