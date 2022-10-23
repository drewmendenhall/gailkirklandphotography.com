import React from 'react'

import Head from 'next/head'

import CommonSessionInfo from './CommonSessionInfo'
import {siteTitle} from '../../Layout'

const HorseSessionsInfo = () => (
  <div className="container">
    <Head>
      <title>Horse Sessions | {siteTitle}</title>
    </Head>
    <h1>Horse Sessions</h1>
    <p>Session fee: $200 per horse (includes setup)</p>
    <CommonSessionInfo
      includes={['One setup from the same stable at a location of your choice']}
    />
  </div>
)

export default HorseSessionsInfo
