var url = require('url')
var webpack = require('webpack')

module.exports = {
  devtool: '#eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index.js',
  ],
  output: {
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        devLoader: 'react-hot',
        exclude: /node_modules/,
        // loader: 'babel',
        loaders: [
          'react-hot',
          'babel' + url.format({
            query: {
              cacheDirectory: true,
              optional: ['runtime'],
              stage: 0,
            },
          }),
        ],
        // query: {
        //   cacheDirectory: true,
        //   optional: ['runtime'],
        //   stage: 0,
        // },
      },
      {
        // test: /\.js$/,
        test: /react-image-gallery/,
        loaders: [
          'react-hot',
          'babel',
        ],
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css',
          'autoprefixer',
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
  },
}
