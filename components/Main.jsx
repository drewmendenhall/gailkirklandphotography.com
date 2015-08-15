import React from 'react'

import {
  Link,
  RouteHandler,
} from 'react-router'

import TopNav from './TopNav'

import '../styles/buttons'
import '../styles/flex'
import '../styles/header'
import '../styles/scaffolding'

export default class Main extends React.Component {
  render() {
    return (
      <main>
        <header>
          <Link to="home" className="logo-link">
            <img src="/images/logo.png" alt="Gail Kirkland Photography" />
          </Link>
          <TopNav />
        </header>
        <div className="sub-header">
          <span className="tagline">
            A picture says more than a thousand words...
          </span>
          <Link to="contact" className="book-session-button button-primary">
            Book a Session
          </Link>
        </div>
        <section className="content">
          <RouteHandler />
        </section>
        <footer>
          <div>
            <div className="copyright">
              Gail Kirkland Photography &copy;
              {new Date().getFullYear()}
            </div>
          </div>
        </footer>
      </main>
    )
  }
}
