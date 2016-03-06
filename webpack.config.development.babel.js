import webpack from 'webpack'

import config from './webpack.config.babel'

const hotEntry = ['webpack-hot-middleware/client'].concat(
  typeof config.entry === 'string' ?
    config.entry : config.entry.app
)

module.exports = ({
  ...config,
    devtool: '#cheap-module-eval-source-map',
    devServer: {
      publicPath: config.output.publicPath,
    },
    entry: (typeof config.entry === 'string' ?
      hotEntry
    :
      {
        ...config.entry,
        app: hotEntry,
      }
    ),
    module: {
      ...config.module,
      loaders: config.module.loaders.map((loader) => {
        if (loader.loader === 'babel') {
          if (!loader.query) loader.query = {}
          if (!Array.isArray(loader.query.plugins)) loader.query.plugins = []
          let plugin = loader.query.plugins.find((plugin) => (
            plugin[0] === 'react-transform'
          ))
          if (!plugin) {
            plugin = ['react-transform', {}]
            loader.query.plugins.push(plugin)
          }
          let pluginOptions = plugin[1]
          if (!Array.isArray(pluginOptions.transforms)) {
            pluginOptions.transforms = []
          }

          pluginOptions.transforms.push({
            transform: 'react-transform-hmr',
            imports: ['react'],
            locals: ['module'],
          })
        }

        return loader
      }),
    },
    plugins: (config.plugins || []).concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ]),
})
