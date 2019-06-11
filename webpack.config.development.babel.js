import webpack from 'webpack'

import config from './webpack.config.babel'

const hotEntry = ['react-hot-loader/patch', 'webpack-hot-middleware/client'].concat(
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
  : {
    ...config.entry,
    app: hotEntry,
  }),
  plugins: (config.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin(),
  ]),
})
