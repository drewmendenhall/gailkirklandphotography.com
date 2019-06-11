const nodeExternals = require('webpack-node-externals')

const config = require('./webpack.config.babel')

module.exports = {
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
}
