import React from 'react'

import CommonSessionInfo from './CommonSessionInfo'

export default class HorseSessionsInfo extends React.Component {
  render() {
    return (
      <div>
        <h1>Horse Sessions</h1>
        <p>Session fee: $200 per horse (includes setup)</p>
        <CommonSessionInfo includes={[
          'One setup from the same stable at a location of your choice',
        ]} />
      </div>
    )
  }
}
