import React from 'react'

import Head from 'next/head'
import styled from 'styled-components'

import {siteTitle} from '../Layout'

const Image = styled.img`
  max-width: 50%;
`

const Contact = () => (
  <div className="contact-page">
    <Head>
      <title>Contact | {siteTitle}</title>
    </Head>
    <p>You can reach us via phone or email at:</p>
    <p>
      <a href="tel:214-538-9427">214-538-9427</a>
    </p>
    <p>
      <a href="mailto:gmkirkland@juno.com">gmkirkland@juno.com</a>
    </p>
    <Image src="/images/merlo.jpg" />
    {/*
      <form method="post">
        <input name="name" autoFocus placeholder="Name" />
        <input name="email" placeholder="Email" />
        <textarea name="message" placeholder="Message"></textarea>
        <button type="reset">Clear Form</button>
        <button className="button-primary">Send</button>
      </form>
    */}
  </div>
)

export default Contact
