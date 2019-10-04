import compression from 'compression'
import express from 'express'
import path from 'path'
import serveStatic from 'serve-static'
import trailingSlashes from 'connect-slashes'
import url from 'url'

import config from '../config'
import reactRouter from './react-router-middleware'

const __DEV__ = process.env.NODE_ENV !== 'production'
const server = express()

server.disable('x-powered-by')
server.enable('trust proxy')
if (__DEV__) {
  let webpack = require('webpack')
  let webpackDevMiddleware = require('webpack-dev-middleware')
  let webpackHotMiddleware = require('webpack-hot-middleware')

  let webpackConfig = require('../webpack.config.development.babel')

  let compiler = webpack(webpackConfig)

  compiler.hooks.done.tap('ReactSsrHmrPlugin', () => {
    Object.keys(require.cache).forEach((id) => {
      if (
        id.startsWith(path.resolve(__dirname, '..', 'components')) ||
        [
          path.join(__dirname, 'react-router-middleware.js'),
          path.resolve(__dirname, '..', 'routes.js'),
        ].includes(id)
      ) {
        delete require.cache[id]
      }
    })

    server._router.stack = server._router.stack.filter(
      ({name}) => name !== 'reactRouter',
    )
    server.use(
      require('./react-router-middleware').default({
        sendErrorStacks: __DEV__,
      }),
    )
  })

  server.use(webpackDevMiddleware(compiler))
  server.use(webpackHotMiddleware(compiler))
} else {
  server.use(compression())
}
server.use(serveStatic(config.server.base))
server.use(serveStatic(`${config.server.base}/images/favicons`))
server.use(trailingSlashes(false))
server.use(
  reactRouter({
    sendErrorStacks: __DEV__,
  }),
)

server.listen(config.server.port, config.server.hostname, () => {
  console.log(`Express started at ${url.format(config.server)}`)
})
