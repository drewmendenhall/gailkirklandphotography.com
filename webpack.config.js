import path from 'path'
import webpack from 'webpack'

export default {
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
    preLoaders : [
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
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
}
