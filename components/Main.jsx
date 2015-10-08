import React from 'react'

import {
  // IndexLink,
  Link,
  RouteHandler,
} from 'react-router'
import IndexLink from 'react-router/lib/IndexLink'

import TopNav from './TopNav'

export default class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  render() {
    return (
      <main>
        <header>
          <IndexLink to="/" className="logo-link">
            <img src="/images/logo-pink.svg" />
            <span className="logo-company-name">
              <span>Gail Kirkland</span>
              <small>Photography</small>
            </span>
          </IndexLink>
          <TopNav />
        </header>
        {/*
        <div className="sub-header">
          <span className="tagline">
            A picture says more than a thousand words...
          </span>
          <Link to="/contact" className="book-session-button button-primary">
            Book a Session
          </Link>
        </div>
        */}
        <section className="content">
          {this.props.children}
        </section>
        <footer>
          <div>
            <div className="copyright">
              Gail Kirkland Photography ©
              {new Date().getFullYear()}
            </div>
          </div>
        </footer>
      </main>
    )
  }
}
