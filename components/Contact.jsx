import React from 'react'

// import '../styles/contact'

export default class Contact extends React.Component {
  render() {
    return (
      <div className="contact-page">
        <p>You can reach us via phone or email at:</p>
        <p>214-538-9427</p>
        <p><a href="gmkirkland@juno.com">gmkirkland@juno.com</a></p>
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
  }
}
