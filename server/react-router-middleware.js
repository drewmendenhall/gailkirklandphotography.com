import Helmet from 'react-helmet'
import React from 'react'
import {StaticRouter} from 'react-router'
import {renderRoutes} from 'react-router-config'
import {renderToStaticMarkup, renderToString} from 'react-dom/server'

import Html from '../components/Html'
import routes from '../routes'

export default ({
  includeTracking,
  renderApp,
  segmentWriteKey,
  sendErrorStacks,
}) => ((req, res) => {
  const context = {}
  
  try {
    const markup = (renderApp ? renderToString(
      React.createElement(StaticRouter,
        {context, location: req.url},
        renderRoutes(routes)
      )
    ) : '')

    if (context.url) {
      res.redirect(302, context.url)
      return
    }
    
    const head = Helmet.renderStatic()
    const userAgent = req.headers['user-agent']

    const includeOpenGraphTags = /^facebook/.test(userAgent)
    const includeMicrosoftTags = (
      /^Mozilla\/\d+\.0 \(compatible; MSIE \d+\.0; Windows /.test(userAgent)
    )

    res.send(
      '<!doctype html>' +
      renderToStaticMarkup(React.createElement(Html, {
        href: `http://${req.headers.host}${req.url}`,
        includeMicrosoftTags,
        includeOpenGraphTags,
        includeTracking,
        markup,
        segmentWriteKey,
        ...head,
      }))
    )
  }
  catch (error) {
    res.status(500).send(sendErrorStacks ? error.stack : null)
    throw error
  }
})
