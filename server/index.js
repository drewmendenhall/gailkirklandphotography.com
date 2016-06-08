import Analytics from 'analytics-node'
import compression from 'compression'
import express from 'express'
import serveStatic from 'serve-static'
import trailingSlashes from 'connect-slashes'
import url from 'url'

import config from '../config'
import reactRouter from './react-router-middleware'
import tracker from './tracker'

const server = express()

let segmentWriteKey

server.disable('x-powered-by')
if (config.analytics) {
  segmentWriteKey = config.analytics.segmentWriteKey

  if (segmentWriteKey) {
    let analytics = new Analytics(segmentWriteKey, {
      flushAt: (__DEV__ ? null : 1),
    })
    server.use(tracker(analytics))
  } else {
    throw new Error('analytics requires `SEGMENT_WRITE_KEY`' +
      ' environment variable'
    )
  }
}
if (__DEV__) {
  let livereload = require('connect-livereload')
  let webpack = require('webpack')
  let webpackDevMiddleware = require('webpack-dev-middleware')
  let webpackHotMiddleware = require('webpack-hot-middleware')

  let webpackConfig = require('../webpack.config.development.babel')

  let compiler = webpack(webpackConfig)

  server.use(webpackDevMiddleware(compiler, {noInfo: true}))
  server.use(webpackHotMiddleware(compiler, {reload: true}))
  server.use(livereload())
  server.use('/styles', serveStatic('../styles'))
} else {
  server.use(compression())
}
server.use(serveStatic(config.server.base))
server.use(serveStatic(`${config.server.base}/images/favicons`))
server.use(trailingSlashes(false))
server.use(reactRouter({
  includeTracking: config.analytics,
  renderApp: config.serverSideRendering,
  segmentWriteKey,
  sendErrorStacks: __DEV__,
}))

server.listen(config.server.port, config.server.hostname, () => {
  console.log(`Express started at ${url.format(config.server)}`)
})
