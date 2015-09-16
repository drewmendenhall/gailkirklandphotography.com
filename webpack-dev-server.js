var url = require('url')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')

var webpackConfig = require('./webpack.config')

function mergeOptions(options) {
	options = options || {}
	options.server = options.server || {}

	return Object.assign({
    hostname: options.hostname || options.server.hostname || 'localhost',
    port: 8001,
		protocol: 'http',
		server: Object.assign({
			hostname: options.server.hostname || options.hostname || 'localhost',
			port: 8000,
			protocol: options.protocol,
		}, options.server),
	}, options)
}
function makeEntryHot(entry, options) {
  return [
    'webpack-dev-server/client?' + url.format(options),
    'webpack/hot/only-dev-server',
  ].concat(entry)
}

module.exports = function (options) {
	options = mergeOptions(options)

	var entry = webpackConfig.entry

  if (options.makeHot) {
    if (typeof entry === 'string') {
      webpackConfig.entry = makeEntryHot(webpackConfig.entry, options)
    }
    else {
			entry[options.makeHot] = makeEntryHot(entry[options.makeHot], options)
    }
  }
  var webpackDevServerConfig = Object.assign(webpackConfig, {
		devtool: '#eval-source-map',
    module: Object.assign({}, webpackConfig.module, {
      loaders: webpackConfig.module.loaders.map(function (loader) {
        var devLoader = loader.devLoader

        return (devLoader && devLoader.length ?
          Object.assign({}, loader, {
            loaders: [].concat(devLoader).concat(loader.loaders),
          })
        :
          loader
        )
      }),
    }),
    plugins: (options.makeHot ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ] : []).concat(webpackConfig.plugins || []),
  })
	var webpackDevServer = new WebpackDevServer(webpack(webpackDevServerConfig), {
		contentBase: url.format(options.server),
		publicPath: webpackConfig.output.publicPath,
		stats: {colors: true},
	})

	webpackDevServer.listen(options.port, options.hostname, function(error) {
		if (error) {
			throw error
		}

		console.log('Webpack Dev Server started at ' + url.format(options))
	})

	return webpackDevServer.middleware
}
