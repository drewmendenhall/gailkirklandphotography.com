import React from 'react'

// import '../styles/contact'

export default class Contact extends React.Component {
  render() {
    return (
      <div>
        <p>gmkirkland@juno.com</p>
        <p>214-538-9427</p>
        <form method="post">
          <input name="name" autoFocus placeholder="Name" />
          <input name="email" placeholder="Email" />
          <textarea name="message" placeholder="Message"></textarea>
          <button type="reset">Clear Form</button>
          <button className="button-primary">Send</button>
        </form>
      </div>
    )
  }
}
