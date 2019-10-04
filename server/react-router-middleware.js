import React from 'react'
import ssrPrepass from 'react-ssr-prepass'
import {HelmetProvider} from 'react-helmet-async'
import {StaticRouter} from 'react-router'
import {ServerStyleSheet} from 'styled-components'
import {readFileSync} from 'fs'
import {renderRoutes} from 'react-router-config'
import {renderToNodeStream, renderToStaticMarkup} from 'react-dom/server'

import Html, {splitMark} from '../components/Html'
import config from '../config'
import routes from '../routes'

const __DEV__ = process.env.NODE_ENV !== 'production'

let scripts =
  !__DEV__ &&
  Object.values(JSON.parse(readFileSync(`${config.server.base}/manifest.json`)))

export default ({sendErrorStacks}) =>
  async function reactRouter(req, res) {
    const helmetContext = {}
    const routerContext = {}
    const sheet = new ServerStyleSheet()

    if (__DEV__) {
      scripts = res.locals.webpackStats
        .toJson()
        .entrypoints.app.assets.map((asset) => `/${asset}`)
    }

    try {
      const app = sheet.collectStyles(
        React.createElement(
          StaticRouter,
          {context: routerContext, location: req.url},
          React.createElement(
            HelmetProvider,
            {context: helmetContext},
            renderRoutes(routes),
          ),
        ),
      )

      await ssrPrepass(app)

      if (routerContext.url) {
        res.redirect(302, routerContext.url)
        return
      }

      const userAgent = req.headers['user-agent']

      const includeOpenGraphTags = /^facebook/.test(userAgent)
      const includeMicrosoftTags = /^Mozilla\/\d+\.0 \(compatible; MSIE \d+\.0; Windows /.test(
        userAgent,
      )

      const [header, appClosingTag, footer] = renderToStaticMarkup(
        React.createElement(Html, {
          includeMicrosoftTags,
          includeOpenGraphTags,
          url: `https://${req.headers.host}${req.url}`,
          ...helmetContext.helmet,
        }),
      ).split(splitMark)

      res.type('html')
      res.write('<!doctype html>')
      res.write(header)
      sheet
        .interleaveWithNodeStream(renderToNodeStream(app))
        .on('end', () => {
          res.write(appClosingTag)
          res.write(
            scripts
              .map((src) => `<script async src="${src}"></script>`)
              .join(''),
          )
          res.write(footer)
          res.end()
        })
        .pipe(
          res,
          {end: false},
        )
    } catch (error) {
      res.status(500).send(sendErrorStacks ? error.stack : null)
      throw error
    }
  }
