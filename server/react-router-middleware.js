import Helmet from 'react-helmet'
import React from 'react'
import {RoutingContext, match} from 'react-router'
import {createMemoryHistory} from 'history'
import {renderToStaticMarkup, renderToString} from 'react-dom/server'

import Html from '../components/Html'
import routes from '../routes'

export default ({
  includeTracking,
  renderApp,
  sendErrorStacks,
}) => ((req, res) => {
  let history = createMemoryHistory()
  let location = history.createLocation(req.url)

  location.href = `http://${req.headers.host}${location.pathname}`

  match({routes, location}, (error, redirectLocation, renderProps) => {
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
          React.createElement(RoutingContext, {...renderProps})
        ) : '')
        const head = Helmet.rewind()

        res.send(
          '<!doctype html>' +
        	renderToStaticMarkup(React.createElement(Html, {
            includeMicrosoftTags,
            includeOpenGraphTags,
            includeTracking,
            location,
            markup,
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
