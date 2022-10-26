import React from 'react'

import Head from 'next/head'
import Link from 'next/link'

import {siteTitle} from '../Layout'

const SessionInfo = () => (
  <div className="container">
    <Head>
      <title>Sessions | {siteTitle}</title>
    </Head>
    <h1>Sessions</h1>
    <p>
      Photographs capture the character and personality of your best friend and
      the bond you share with them. That lovable face can be preserved in an
      image that hangs on your wall and can serve as a daily reminder of the
      love they bring into your life.
    </p>
    <p>
      I create a relaxed and enjoyable environment, and I understand the
      importance of making memorable moments for you.
    </p>
    <p>
      Prior to your session, we will discuss session ideas. The portrait session
      fee includes pre-consultations and a 1.5-2 hour photo session at a
      location of your choice.
    </p>
    <br />
    <p>50% Deposit is required to book your session.</p>
    <p>Full payment and signed release are due at the session.</p>
    <br />
    <p>Ready to book a session?</p>
    <p>
      Questions or concerns? No problem! I'll be happy to provide you with any
      information you need.
    </p>
    <p>
      <Link href="/contact">Contact us</Link>
    </p>
  </div>
)

export default SessionInfo
