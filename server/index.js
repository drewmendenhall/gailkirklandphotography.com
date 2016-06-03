import Analytics from 'analytics-node'
import compression from 'compression'
import express from 'express'
import serveStatic from 'serve-static'
import trailingSlashes from 'connect-slashes'
import url from 'url'

import config from '../config'
import reactRouter from './react-router-middleware'
import tracker from './tracker'

const PROD = (process.env.NODE_ENV === 'production')
const server = express()

let segmentWriteKey

server.disable('x-powered-by')
if (config.analytics) {
  segmentWriteKey = config.analytics.segmentWriteKey

  if (segmentWriteKey) {
    let analytics = new Analytics(segmentWriteKey, {
      flushAt: (!PROD ? 1 : null),
    })
    server.use(tracker(analytics))
  } else {
    throw new Error('analytics requires `SEGMENT_WRITE_KEY`' +
      ' environment variable'
    )
  }
}
if (PROD) {
  server.use(compression())
} else {
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
}
server.use(serveStatic(config.server.base))
server.use(serveStatic(`${config.server.base}/images/favicons`))
server.use(trailingSlashes(false))
server.use(reactRouter({
  includeTracking: config.analytics,
  renderApp: config.serverSideRendering,
  segmentWriteKey,
  sendErrorStacks: !PROD,
}))

server.listen(config.server.port, config.server.hostname, () => {
  console.log(`Express started at ${url.format(config.server)}`)
})
