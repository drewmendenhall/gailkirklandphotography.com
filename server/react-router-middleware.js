import Helmet from 'react-helmet'
import React from 'react'
import {RouterContext, match} from 'react-router'
import {renderToStaticMarkup, renderToString} from 'react-dom/server'

import Html from '../components/Html'
import routes from '../routes'

export default ({
  includeTracking,
  renderApp,
  segmentWriteKey,
  sendErrorStacks,
}) => ((req, res) => {
  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    }
    else if (error) {
      res.status(500).send(sendErrorStacks ? error.stack : null)
    }
    else if (!renderProps) {
      res.status(404).send()
    }
    else {
      try {
        const userAgent = req.headers['user-agent']
        const includeOpenGraphTags = /^facebook/.test(userAgent)
        const includeMicrosoftTags = (
          /^Mozilla\/\d+\.0 \(compatible; MSIE \d+\.0; Windows /.test(userAgent)
        )

        const markup = (renderApp ? renderToString(
          React.createElement(RouterContext, {...renderProps})
        ) : '')
        const head = Helmet.renderStatic()

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
    }
  })
})
