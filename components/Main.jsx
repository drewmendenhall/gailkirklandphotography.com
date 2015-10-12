import React from 'react'
import Helmet from 'react-helmet'

import {
  IndexLink,
  Link,
} from 'react-router'

import TopNav from './TopNav'

const title = 'Gail Kirkland Photography'

export default ({children, location}) => (
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
        {name: 'msapplication-TileColor', content: '#414141'},
        {name: 'msapplication-TileImage', content: '/touch-icon-144x144.png'},
        {name: 'viewport', content: 'width=device-width,initial-scale=1'},
      ]}
      title={title}
      titleTemplate={location.pathname === '/' ? null : `%s | ${title}`}
    />
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
      {children}
    </section>
    <footer>
      <div>
        <Link to="/copyright" className="copyright" rel="license">
          © Gail Kirkland Photography {new Date().getFullYear()}
        </Link>
      </div>
    </footer>
  </main>
)
