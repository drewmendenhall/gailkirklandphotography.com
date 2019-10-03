import React from 'react'
import {HelmetProvider} from 'react-helmet-async'
import {StaticRouter} from 'react-router'
import {renderRoutes} from 'react-router-config'
import {renderToStaticMarkup, renderToString} from 'react-dom/server'

import Html from '../components/Html'
import routes from '../routes'

export default ({renderApp, sendErrorStacks}) =>
  function reactRouter(req, res) {
    const helmetContext = {}
    const routerContext = {}

    try {
      const markup = renderApp
        ? renderToString(
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
        : ''

      if (routerContext.url) {
        res.redirect(302, routerContext.url)
        return
      }

      const userAgent = req.headers['user-agent']

      const includeOpenGraphTags = /^facebook/.test(userAgent)
      const includeMicrosoftTags = /^Mozilla\/\d+\.0 \(compatible; MSIE \d+\.0; Windows /.test(
        userAgent,
      )

      res.send(
        '<!doctype html>' +
          renderToStaticMarkup(
            React.createElement(Html, {
              includeMicrosoftTags,
              includeOpenGraphTags,
              markup,
              url: `https://${req.headers.host}${req.url}`,
              ...helmetContext.helmet,
            }),
          ),
      )
    } catch (error) {
      res.status(500).send(sendErrorStacks ? error.stack : null)
      throw error
    }
  }
