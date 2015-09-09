var React = require('react')
var Router = require('react-router')
var connect = require('connect')
var livereload = require('connect-livereload')
var path = require('path')
var serveStatic = require('serve-static')
var trailingSlashes = require('connect-slashes')
var url = require('url')

require('babel/register')

var Html = require('./components/Html')
var config = require('./config')
var routes = require('./routes')
var webpackDevServer = require('./webpack-dev-server')

var server = connect()

config.server = Object.assign({
	base: path.resolve('public'),
	hostname: 'localhost',
	port: 8000,
	protocol: 'http',
}, config.server || {})

if (process.env.NODE_ENV !== 'production') {
	server.use(webpackDevServer({
		server: config.server,
		makeHot: 'app',
	}))
	server.use(livereload())
}
server.use(serveStatic(config.server.base))
server.use(trailingSlashes(false))
server.use(function(req, res) {
  Router.run(routes, req.url, function(Handler) {
    res.write(
			React.renderToStaticMarkup(React.createElement(Html, {
				markup: React.renderToString(React.createElement(Handler)),
			}))
		)
    res.end()
  })
})

server.listen(config.server.port, config.server.hostname, function () {
	console.log('Express started at ' + url.format(config.server))
})
