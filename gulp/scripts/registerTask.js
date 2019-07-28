import gulp from 'gulp'
import newer from 'gulp-newer'
import rename from 'gulp-rename'
import webpack from 'webpack'
import {PluginError} from 'gulp-util'
import {Transform} from 'stream'

export default ({
  name,

  dest = {},
  source = {},
  webpackConfig,
}) => {
  source.pattern = [__filename].concat(source.pattern || [])

  gulp.task(name, (callback) =>
    gulp
      .src(source.file)
      .pipe(
        newer({
          dest: `${dest.path}/${dest.filename}`,
          extra: source.pattern,
        }),
      )
      .pipe(rename(dest.filename))
      .pipe(
        new Transform({
          objectMode: true,
          transform: () => {
            webpack(webpackConfig, (err, stats) => {
              const {errors} = stats.compilation

              const error = err || errors[0]

              if (error) throw new PluginError('webpack', error)

              console.log(
                stats.toString({
                  chunks: false,
                  colors: true,
                }),
              )

              callback()
            })
          },
        }),
      ),
  )
}
