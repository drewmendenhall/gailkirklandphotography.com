import nodeExternals from 'webpack-node-externals'
import webpack from 'webpack'

import config from './webpack.config.production.babel'

export default ({
  ...config,
  entry: {
    server: './server/index',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
  },

  externals: [nodeExternals()],
  node: {
    __dirname: false,
  },
  target: 'node',

  plugins: (config.plugins || []).filter((plugin) => (
    !(plugin instanceof webpack.optimize.CommonsChunkPlugin)
  )),
})
