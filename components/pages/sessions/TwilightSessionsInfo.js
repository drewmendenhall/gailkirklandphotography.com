import React from 'react'

import Head from 'next/head'
import Link from 'next/link'

import {siteTitle} from '../../Layout'

const TwilightSessionsInfo = () => (
  <div className="container">
    <Head>
      <title>Twilight Sessions | {siteTitle}</title>
    </Head>
    <h1>Twilight Sessions</h1>
    <p>
      Often times, a pet is more than just a pet, but a true member of your
      family. Just as it is for any family member, sometimes the unthinkable
      approaches or happens. Suddenly, you're wishing that you could capture
      those minute details - from the sparkle in their eyes to those gestures
      and nuances that define them.
    </p>
    <p>
      Sometimes, even worse is when your pets are taken from us too soon due to
      terminal illness. That is why I offer designed Twilight Sessions. They are
      an opportunity to capture those details of your blessed pet and cherish
      them forever. Because I understand these decisions have to be made in a
      short period of time, I try to be available to come to you when needed.
      Please <Link href="/contact">contact me</Link> to look into scheduling a
      session.
    </p>
  </div>
)

export default TwilightSessionsInfo
