import Helmet from 'react-helmet'
import React from 'react'

import CommonSessionInfo from './CommonSessionInfo'

export default () => (
  <div className="container">
    <Helmet title="Horse Sessions" />
    <h1>Horse Sessions</h1>
    <p>Session fee: $200 per horse (includes setup)</p>
    <CommonSessionInfo includes={[
      'One setup from the same stable at a location of your choice',
    ]} />
  </div>
)