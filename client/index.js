import React from 'react'

import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'

import routes from '../routes'

ReactDOM.render(
  React.createElement(BrowserRouter,
    null,
    renderRoutes(routes)
  ),
  document.querySelector('main')
)
