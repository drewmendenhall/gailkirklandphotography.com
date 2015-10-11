var path = require('path')
var url = require('url')

var PROD = (process.env.NODE_ENV === 'production')

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
              optional: (['runtime']
                .concat(PROD ? 'optimisation.react.constantElements' : [])
                .concat(PROD ? 'optimisation.react.inlineElements' : [])
              ),
              stage: 0,
            },
          }),
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
