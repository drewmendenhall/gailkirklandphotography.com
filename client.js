import React from 'react'
import Router from 'react-router'
import assign from 'object-assign'
import createHistory from 'history/lib/createBrowserHistory'

import routes from './routes'

Object.assign = assign

var history = createHistory()

React.render(
  React.createElement(Router, {history, routes}),
  document.querySelector('main')
)
