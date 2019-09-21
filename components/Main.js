import React from 'react'

import {Helmet} from 'react-helmet-async'
import {Link} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'

import TopNav from './TopNav'

const title = 'Gail Kirkland Photography'

const Main = ({route}) => (
  <React.Fragment>
    <Helmet
      link={[{rel: 'license', href: '/copyright'}]}
      meta={[
        {
          name: 'description',
          content: 'A picture says more than a thousand words...',
        },
        {name: 'viewport', content: 'width=device-width,initial-scale=1'},
      ]}
      defaultTitle={title}
      titleTemplate={`%s | ${title}`}
    />
    <header>
      <Link to="/" className="logo-link">
        <img src="/images/logo-pink.svg" />
        <span className="logo-company-name">
          <div>Gail Kirkland</div>
          <div>
            <small>Photography</small>
          </div>
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
    <section className="content">{renderRoutes(route.routes)}</section>
    <footer>
      <div>
        <Link to="/copyright" className="copyright" rel="license">
          © Gail Kirkland Photography {new Date().getFullYear()}. All rights
          reserved.
        </Link>
      </div>
    </footer>
  </React.Fragment>
)

export default Main
