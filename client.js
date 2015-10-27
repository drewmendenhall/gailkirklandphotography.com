/* eslint-env browser */

import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import assign from 'object-assign'
import createHistory from 'history/lib/createBrowserHistory'

import routes from './routes'

Object.assign = assign

const history = createHistory()

ReactDOM.render(
  React.createElement(Router, {history, routes}),
  document.querySelector('main')
)
