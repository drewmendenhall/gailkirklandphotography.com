import webpack from 'webpack'

import config from './webpack.config.babel'

const hotEntry = ['webpack-hot-middleware/client'].concat(
  typeof config.entry === 'string' ?
    config.entry : config.entry.app
)

module.exports = ({
  ...config,
  devtool: 'inline-source-map',
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
    rules: config.module.rules.map((loader) => {
      if (loader.loader === 'babel') {
        const presetName = 'react-hmre'

        if (!loader.query) loader.query = {}
        if (!Array.isArray(loader.query.presets)) loader.query.presets = []
        if (!loader.query.presets.includes(presetName)) {
          loader.query.presets.push(presetName)
        }
      }

      return loader
    }),
  },
  plugins: (config.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin(),
  ]),
})
