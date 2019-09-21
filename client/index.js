import React from 'react'

import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'
import {hot} from 'react-hot-loader/root'
import {renderRoutes} from 'react-router-config'

import routes from '../routes'

const App = () =>
  React.createElement(
    BrowserRouter,
    null,
    React.createElement(HelmetProvider, null, renderRoutes(routes)),
  )

ReactDOM.render(React.createElement(hot(App)), document.querySelector('main'))
