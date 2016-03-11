var path = require('path')
var url = require('url')
var webpack = require('webpack')

module.exports = {
  entry: './client',
  // entry: {
  //   app: './client',
  //   vendor: [
  //     'babel-runtime',
  //     'classnames',
  //     'react',
  //   ],
  // },
  output: {
    // path: path.join(__dirname, 'public'),
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          // 'react-hot',
          'babel' + url.format({
            query: {
              cacheDirectory: true,
              optional: ['runtime'],
              stage: 0,
            },
          }),
        ],

        devLoader: 'react-hot',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
}
