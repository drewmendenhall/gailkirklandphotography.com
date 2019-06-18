import React from 'react'

import Helmet from 'react-helmet'

const Contact = () => (
  <div className="contact-page">
    <Helmet title="Contact" />
    <p>You can reach us via phone or email at:</p>
    <p><a href="tel:214-538-9427">214-538-9427</a></p>
    <p><a href="mailto:gmkirkland@juno.com">gmkirkland@juno.com</a></p>
    <img src="/images/merlo.jpg" />
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
