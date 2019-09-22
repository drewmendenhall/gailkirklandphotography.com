import PluginError from 'plugin-error'
import newer from 'gulp-newer'
import rename from 'gulp-rename'
import webpack from 'webpack'
import {Transform} from 'stream'
import {src} from 'gulp'

export default ({dest = {}, source = {}, webpackConfig}) => (callback) => {
  src(source.file)
    .pipe(
      newer({
        dest: `${dest.path}/${dest.filename}`,
        extra: [__filename].concat(source.pattern || []),
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
    )
}
