var Analytics = require('analytics-node')
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
var routerRedirects = require('./react-router-redirects')
var tracker = require('./tracker')
var webpackDevServer = require('./webpack-dev-server')

var PROD = (process.env.NODE_ENV === 'production')
var segmentWriteKey = process.env.SEGMENT_WRITE_KEY

var analytics = segmentWriteKey && new Analytics(segmentWriteKey, {
	flushAt: (!PROD ? 1 : null),
})
var server = connect()

config.server = Object.assign({
	base: path.resolve('public'),
	hostname: 'localhost',
	port: 8000,
	protocol: 'http',
}, config.server || {})

if (PROD) {
	server.use(tracker.eventMiddleware(analytics))
}
else {
	server.use(webpackDevServer({
		server: config.server,
		makeHot: 'app',
	}))
	server.use(livereload())
	server.use('/styles', serveStatic('styles'))
}
server.use(serveStatic(config.server.base))
server.use(trailingSlashes(false))
server.use(routerRedirects())
server.use(function(req, res) {
  Router.run(routes, req.url, function(Handler) {
		if (PROD) {
			tracker.page(analytics, req)
		}

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
