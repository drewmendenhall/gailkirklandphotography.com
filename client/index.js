import React from 'react'

import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {hot} from 'react-hot-loader/root'
import {renderRoutes} from 'react-router-config'

import routes from '../routes'

const App = () => React.createElement(BrowserRouter,
  null,
  renderRoutes(routes)
)

ReactDOM.render(
  React.createElement(hot(App)),
  document.querySelector('main')
)
