import React from 'react'

import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'

import App from './App'

ReactDOM.render(
  React.createElement(
    BrowserRouter,
    null,
    React.createElement(HelmetProvider, null, React.createElement(App)),
  ),
  document.querySelector('main'),
)
