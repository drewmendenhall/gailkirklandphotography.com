const webpack = require('webpack')

const config = require('./webpack.config')

const hotEntry = ['webpack-hot-middleware/client'].concat(
  typeof config.entry === 'string' ?
    config.entry : config.entry.app
)

module.exports = (
  Object.assign({}, config, {
    devtool: '#cheap-module-eval-source-map',
    devServer: {
      publicPath: config.output.publicPath,
    },
    entry: (typeof config.entry === 'string' ?
      hotEntry
    :
      Object.assign({}, config.entry, {app: hotEntry})
    ),
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
