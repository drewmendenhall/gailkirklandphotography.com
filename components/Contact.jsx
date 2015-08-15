import React from 'react'

import '../styles/contact'

export default class About extends React.Component {
  render() {
    return (
      <form>
        <input name="name" autoFocus placeholder="Name" />
        <input name="email" placeholder="Email" />
        <textarea name="message" placeholder="Message"></textarea>
        <button type="reset">Clear Form</button>
        <button className="button-primary">Send</button>
      </form>
    )
  }
}
