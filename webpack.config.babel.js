const ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')

process.env.WEBPACK_VERSION = require('webpack/package.json').version

module.exports = {
  mode: process.env.NODE_ENV || 'development',

  entry: {
    app: './client',
  },
  output: {
    path: `${__dirname}/public`,
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    splitChunks: {chunks: 'all'},
  },
  performance: {hints: false},
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new ManifestPlugin(),
  ],
}
