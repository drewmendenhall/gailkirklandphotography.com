var Analytics = require('analytics-node')
var React = require('react')
var Router = require('react-router')
var express = require('express')
var fs = require('fs')
var livereload = require('connect-livereload')
var path = require('path')
var serveStatic = require('serve-static')
var trailingSlashes = require('connect-slashes')
var url = require('url')

require('babel/register')

var Html = require('./components/Html')
var config = require('./config')
var reactRouter = require('./server/react-router-middleware')
var routes = require('./routes')
var tracker = require('./tracker')
var webpackDevServer = require('./webpack-dev-server')

var PROD = (process.env.NODE_ENV === 'production')
var segmentWriteKey = process.env.SEGMENT_WRITE_KEY

var analytics = segmentWriteKey && new Analytics(segmentWriteKey, {
	flushAt: (!PROD ? 1 : null),
})
var server = express()

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
server.use(serveStatic(config.server.base + '/images/favicons'))
server.use(trailingSlashes(false))
server.use(reactRouter())

server.listen(config.server.port, config.server.hostname, function () {
	console.log('Express started at ' + url.format(config.server))
})
