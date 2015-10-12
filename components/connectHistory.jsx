import React from 'react'
import {History} from 'react-router'

export default function connectHistory(Component) {
  return React.createClass({
    displayName: 'connectHistory',
    mixins: [History],
    render() {
      return <Component {...this.props} history={this.history} />
    },
  })
}
