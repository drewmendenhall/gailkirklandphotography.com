import Analytics from 'analytics-node'
import dotenv from 'dotenv-safe'
import express from 'express'
import serveStatic from 'serve-static'
import trailingSlashes from 'connect-slashes'
import url from 'url'

import config from '../config'
import reactRouter from './react-router-middleware'
import tracker from './tracker'

dotenv.config({allowEmptyValues: true})

const PROD = (process.env.NODE_ENV === 'production')
const segmentWriteKey = process.env.SEGMENT_WRITE_KEY

let analytics = segmentWriteKey && new Analytics(segmentWriteKey, {
  flushAt: (!PROD ? 1 : null),
})
let server = express()

server.disable('x-powered-by')
if (process.env.ANALYTICS) {
  server.use(tracker(analytics))
}
if (!PROD) {
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
  includeTracking: process.env.ANALYTICS,
  renderApp: process.env.SERVER_SIDE_RENDER,
  sendErrorStacks: !PROD,
}))

server.listen(config.server.port, config.server.hostname, () => {
  console.log(`Express started at ${url.format(
    Object.assign({hostname: 'localhost'}, config.server)
  )}`)
})
