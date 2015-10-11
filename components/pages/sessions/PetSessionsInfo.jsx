import React from 'react'

import CommonSessionInfo from './CommonSessionInfo'

export default class PetSessionsInfo extends React.Component {
  static defaultProps = {
    type: 'pet',
  }

  render() {
    var {type} = this.props
    var capitalizedType = type[0].toUpperCase() + type.slice(1)

    return (
      <div>
        <h1>{capitalizedType} Sessions</h1>
        <p>Session fee: $200</p>
        <CommonSessionInfo includes={[
          'Photography of up to two animals from the same household at a location of your choice',
        ]} />
      </div>
    )
  }
}
