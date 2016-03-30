import filter from 'gulp-filter'
import gulp from 'gulp'
import gutil from 'gulp-util'
import newer from 'gulp-newer'
import rename from 'gulp-rename'
import webpack from 'webpack'
import {Transform} from 'stream'

export default ({
  name,

  dest = {},
  source = {},
  webpackConfig,
}) => {
  source.pattern = [__filename].concat(source.pattern || [])

  gulp.task(name, (callback) => gulp.src(source.pattern)
    .pipe(newer(`${dest.path}/${dest.filename}`))
    .pipe(filter(source.file))
    .pipe(rename(dest.filename))
    .pipe(new Transform({objectMode: true, transform: () => {
      webpack(webpackConfig, (error) => {
        if (error) throw new gutil.PluginError('webpack', error)

        callback()
      })
    }}))
  )
}
