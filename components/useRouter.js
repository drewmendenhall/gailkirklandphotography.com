import {__RouterContext, matchPath} from 'react-router'
import {useContext} from 'react'

export default (options = {}) => {
  const context = useContext(__RouterContext)

  const location = options.location || context.location

  const match = (options.path
    ? matchPath(location.pathname, options)
    : context.match
  )

  return {...context, location, match}
}
