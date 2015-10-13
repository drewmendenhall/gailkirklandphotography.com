const PROD = (process.env.NODE_ENV === 'production')
if (PROD) require('newrelic')

import Analytics from 'analytics-node'
import express from 'express'
import livereload from 'connect-livereload'
import path from 'path'
import serveStatic from 'serve-static'
import trailingSlashes from 'connect-slashes'
import url from 'url'

import config from './config'
import reactRouter from './server/react-router-middleware'
import tracker from './tracker'
import webpackDevServer from './webpack-dev-server'

const PROD = (process.env.NODE_ENV === 'production')
const segmentWriteKey = process.env.SEGMENT_WRITE_KEY

let analytics = segmentWriteKey && new Analytics(segmentWriteKey, {
	flushAt: (!PROD ? 1 : null),
})
let server = express()

config.server = Object.assign({
	base: path.resolve('public'),
	hostname: 'localhost',
	port: 8000,
	protocol: 'http',
}, config.server || {})

server.disable('x-powered-by')
if (PROD) {
	server.use(tracker(analytics))
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
server.use(serveStatic(`${config.server.base}/images/favicons`))
server.use(trailingSlashes(false))
server.use(reactRouter())

server.listen(config.server.port, config.server.hostname, () => {
	console.log(`Express started at ${url.format(config.server)}`)
})
