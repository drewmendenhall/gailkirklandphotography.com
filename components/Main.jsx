import React from 'react'

import {
  Link,
  RouteHandler,
} from 'react-router'

import TopNav from './TopNav'

export default class Main extends React.Component {
  render() {
    return (
      <main>
        <header>
          <Link to="/" className="logo-link">
            <img
              alt="Gail Kirkland Photography"
              src="/images/logo.png"
              sizes="(max-width: 600px) 200px"
              srcSet="/images/logo-200.png 200w, /images/logo.png"
            />
          </Link>
          <TopNav {...this.state} />
        </header>
        <div className="sub-header">
          <span className="tagline">
            A picture says more than a thousand words...
          </span>
          <Link to="/contact" className="book-session-button button-primary">
            Book a Session
          </Link>
        </div>
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
