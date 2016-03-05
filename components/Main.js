import React from 'react'

import Helmet from 'react-helmet'
import {Link} from 'react-router'

import TopNav from './TopNav'

const title = 'Gail Kirkland Photography'

export default class Main extends React.Component {
  static childContextTypes = {
    location: React.PropTypes.object,
  };

  getChildContext() {
    return {
      location: this.props.location,
    }
  }
  render() {
    const {location} = this.props
    
    return (
      <main>
        <Helmet
          link={[
            {rel: 'license', href: '/copyright'},
          ]}
          meta={[
            {
              name: 'description',
              content: 'A picture says more than a thousand words...',
            },
            {name: 'viewport', content: 'width=device-width,initial-scale=1'},
          ]}
          title={title}
          titleTemplate={location.pathname === '/' ? null : `%s | ${title}`}
        />
        <header>
          <Link to="/" className="logo-link">
            <img src="/images/logo-pink.svg" />
            <span className="logo-company-name">
              <div>Gail Kirkland</div>
              <div><small>Photography</small></div>
            </span>
          </Link>
          <TopNav />
        </header>
        <div className="sub-header">
          <span className="tagline">
            A picture says more than a thousand words...
          </span>
          {/*
          <Link to="/contact" className="book-session-button button-primary">
          Book a Session
          </Link>
          */}
        </div>
        <section className="content">
          {this.props.children}
        </section>
        <footer>
          <div>
            <Link to="/copyright" className="copyright" rel="license">
              © Gail Kirkland Photography {new Date().getFullYear()}. All rights reserved.
            </Link>
          </div>
        </footer>
      </main>
    )
  }
}
