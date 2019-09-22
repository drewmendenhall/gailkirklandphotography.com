import React from 'react'
import ssrPrepass from 'react-ssr-prepass'
import {HelmetProvider} from 'react-helmet-async'
import {StaticRouter} from 'react-router'
import {renderRoutes} from 'react-router-config'
import {renderToNodeStream, renderToStaticMarkup} from 'react-dom/server'

import Html, {splitMark} from '../components/Html'
import routes from '../routes'

export default ({sendErrorStacks}) =>
  async function reactRouter(req, res) {
    const helmetContext = {}
    const routerContext = {}

    try {
      const app = React.createElement(
        StaticRouter,
        {context: routerContext, location: req.url},
        React.createElement(
          HelmetProvider,
          {context: helmetContext},
          renderRoutes(routes),
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

      const [header, footer] = renderToStaticMarkup(
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
      renderToNodeStream(app)
        .on('end', () => {
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
