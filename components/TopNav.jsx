import React from 'react'

import {
  Link,
  RouteHandler,
} from 'react-router'

import '../styles/top-nav'

export default class TopNav extends React.Component {
  render() {
    return (
      <nav className="top-nav">
        <ul>
          <li><Link to="home" className="top-nav-link">home</Link></li>
          <li><Link to="about" className="top-nav-link">about</Link></li>
          <li>
            <Link to="galleries" className="top-nav-link">galleries</Link>
            <ul>
              <li><Link to="dogs" className="top-nav-link">dogs</Link></li>
              <li><Link to="cats" className="top-nav-link">cats</Link></li>
              <li><Link to="horses" className="top-nav-link">horses</Link></li>
              <li><Link to="people" className="top-nav-link">people</Link></li>
            </ul>
          </li>
          <li><Link to="contact" className="top-nav-link">contact us</Link></li>
        </ul>
      </nav>
    )
  }
}
