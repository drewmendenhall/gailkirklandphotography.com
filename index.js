import React from 'react'
import Router from 'react-router'
import assign from 'object-assign'

import routes from './routes'

Object.assign = assign

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(
    React.createElement(Handler),
    document.querySelector('main')
  )
})
