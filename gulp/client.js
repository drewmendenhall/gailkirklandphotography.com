import filter from 'gulp-filter'
import gulp from 'gulp'
import gutil from 'gulp-util'
import newer from 'gulp-newer'
import rename from 'gulp-rename'
import webpack from 'webpack'
import {Transform} from 'stream'

import config from '../webpack.config.production.babel'

const destFilename = 'app.js'
const destPath = 'public'
const sourceFile = 'client.js'
const sourceFilePattern = [
  'components/**',
  __filename,
  sourceFile,
]

gulp.task('client', (callback) => gulp.src(sourceFilePattern)
  .pipe(newer(`${destPath}/${destFilename}`))
  .pipe(filter(sourceFile))
  .pipe(rename(destFilename))
  .pipe(new Transform({objectMode: true, transform: () => {
    webpack(config, (error, stats) => {
      if (error) throw new gutil.PluginError('webpack', error)

      gutil.log('[webpack]', stats)
      callback()
    })
  }}))
)
