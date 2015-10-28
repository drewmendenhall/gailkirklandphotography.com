import Analytics from 'analytics-node'
import express from 'express'
import livereload from 'connect-livereload'
import path from 'path'
import serveStatic from 'serve-static'
import trailingSlashes from 'connect-slashes'
import url from 'url'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import config from './config'
import reactRouter from './server/react-router-middleware'
import tracker from './tracker'
import webpackConfig from './webpack.config.development'

const PROD = (process.env.NODE_ENV === 'production')
const segmentWriteKey = process.env.SEGMENT_WRITE_KEY

let analytics = segmentWriteKey && new Analytics(segmentWriteKey, {
  flushAt: (!PROD ? 1 : null),
})
let server = express()
let compiler = webpack(webpackConfig)

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
  server.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }))
  server.use(webpackHotMiddleware(compiler))
  server.use(livereload())
  server.use('/styles', serveStatic('styles'))
}
server.use(serveStatic(config.server.base))
server.use(serveStatic(`${config.server.base}/images/favicons`))
server.use(trailingSlashes(false))
// TODO: cli switches for these options
server.use(reactRouter({
  includeTracking: PROD,
  renderApp: PROD,
  sendErrorStacks: !PROD,
}))

server.listen(config.server.port, config.server.hostname, () => {
  console.log(`Express started at ${url.format(config.server)}`)
})
