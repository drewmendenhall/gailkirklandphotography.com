var path = require('path')

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
    path: path.resolve('public'),
    publicPath: '/',
    filename: 'app.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          // 'react-hot',
          'babel?cacheDirectory',
        ],

        devLoader: 'react-hot',
      },
      {test: /\.json$/, loader: 'json'},
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
}
