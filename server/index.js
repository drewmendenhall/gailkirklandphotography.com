import compression from 'compression'
import express from 'express'
import path from 'path'
import serveStatic from 'serve-static'
import trailingSlashes from 'connect-slashes'
import url from 'url'

import config from '../config'
import reactRouter from './react-router-middleware'

const server = express()

server.disable('x-powered-by')
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
  server.use('/node_modules', serveStatic(path.join(
    __dirname, '../node_modules'
  )))
  server.use('/styles', serveStatic(path.join(__dirname, '../styles')))
} else {
  server.use(compression())
}
server.use(serveStatic(config.server.base))
server.use(serveStatic(`${config.server.base}/images/favicons`))
server.use(trailingSlashes(false))
server.use(reactRouter({
  renderApp: config.serverSideRendering,
  sendErrorStacks: __DEV__,
}))

server.listen(config.server.port, config.server.hostname, () => {
  console.log(`Express started at ${url.format(config.server)}`)
})
