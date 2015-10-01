import React from 'react'
import {RoutingContext, match} from 'react-router'
import createLocation from 'history/lib/createLocation'
// import { renderToString } from 'react-dom/server'

import Html from '../components/Html'
import galleries from '../public/galleries.json'
import routes from '../routes'

export default () => (
  (req, res) => {
    let location = createLocation(req.url)

    match({routes, location}, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(301, redirectLocation.pathname + redirectLocation.search)
      }
      else if (error) {
        res.status(500).send(error.message)
      }
      else if (!renderProps) {
        res.status(404).send('Not found')
      }
      else {
        res.send(
        	React.renderToStaticMarkup(React.createElement(Html, {
            markup: React.renderToString(
              React.createElement(RoutingContext, {galleries, ...renderProps})
            ),
          }))
        )
      }
    })
  }
)
