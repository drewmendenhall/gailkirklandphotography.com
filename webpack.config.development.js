var merge = require('lodash.merge')
var webpack = require('webpack')

var config = require('./webpack.config')

// var loader = config.module.loaders.filter(function(loader) {
//   return loader.test === /\.jsx?$/
// })[0]

module.exports = merge({
  devtool: '#eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
  ].concat(config.entry),
  module: {
    loaders: config.module.loaders.map(function(loader) {
      if (loader.devLoader) {
        loader.loaders = []
          .concat(loader.loader || loader.loaders)
          .concat(loader.devLoader)
        delete loader.loader
      }
    }),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
}, config)
