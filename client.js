/* eslint-env browser */

import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import createHistory from 'history/lib/createBrowserHistory'

import routes from './routes'

const history = createHistory()

ReactDOM.render(
  React.createElement(Router, {history, routes}),
  document.querySelector('main'),
)
