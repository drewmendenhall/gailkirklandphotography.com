const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: './client',
    vendor: [
      'classnames',
      'core-js',
      'history',
      'react',
      'react-dom',
      'react-helmet',
      'react-router',
    ],
  },
  output: {
    path: path.resolve('public'),
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    preLoaders: [
      {test: /\.jsx?$/, loader: 'eslint'},
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
        },
      },
      {test: /\.json$/, loader: 'json'},
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
}
