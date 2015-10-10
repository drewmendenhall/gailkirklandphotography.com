import Helmet from 'react-helmet'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {RoutingContext, match} from 'react-router'
import {createMemoryHistory} from 'history'

import Html from '../components/Html'
import galleries from '../public/galleries.json'
import routes from '../routes'

export default () => (
  (req, res) => {
    let history = createMemoryHistory()
    let location = history.createLocation(req.url)

    match({routes, location}, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      }
      else if (error) {
        res.status(500).send(error.message)
      }
      else if (!renderProps) {
        res.status(404).send('Not found')
      }
      else {
        let markup = ReactDOMServer.renderToString(
          React.createElement(RoutingContext, {galleries, ...renderProps})
        )
        let head = Helmet.rewind()

        res.send(
        	ReactDOMServer.renderToStaticMarkup(React.createElement(Html, {
            markup,
            ...head,
          }))
        )
      }
    })
  }
)
