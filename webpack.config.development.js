import webpack from 'webpack'

import config from './webpack.config'

export default (
  Object.assign({}, config, {
    devtool: 'cheap-module-eval-source-map',
    entry: [
      'webpack-hot-middleware/client',
    ].concat(Array.isArray(config.entry) ? config.entry[0] : config.entry),
    module: Object.assign({}, config.module, {
      loaders: config.module.loaders.map((loader) => {
        if (loader.loader === 'babel') {
          if (!loader.query) loader.query = {}
          if (!loader.query.extra) loader.query.extra = {}
          if (!loader.query.extra['react-transform']) {
            loader.query.extra['react-transform'] = {}
          }
          if (!Array.isArray(loader.query.extra['react-transform'].transforms)) {
            loader.query.extra['react-transform'].transforms = []
          }

          loader.query.extra['react-transform'].transforms.push({
            transform: 'react-transform-hmr',
            imports: ['react'],
            locals: ['module'],
          })
        }

        return loader
      }),
    }),
    plugins: (config.plugins || []).concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ]),
  })
)
