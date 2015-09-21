import React from 'react'

import {Link} from 'react-router'

// import '../styles/top-nav'

export default class TopNav extends React.Component {
  render() {
    return (
      <label className="top-nav-control-label">
        <i className="top-nav-control-icon"></i>
        <input
          className="top-nav-control"
          type="checkbox"
        />
        <div className="top-nav-control-overlay"></div>
        <nav className="top-nav">
          <ul>
            <li><Link to="home" className="top-nav-link">home</Link></li>
            <li><Link to="about" className="top-nav-link">about</Link></li>
            <li>
              <Link to="galleries" className="top-nav-link">galleries</Link>
              <ul>
                <li><Link to="/galleries/dogs" className="top-nav-link">dogs</Link></li>
                <li><Link to="/galleries/horses" className="top-nav-link">horses</Link></li>
                <li><Link to="/galleries/twilight" className="top-nav-link">twilight</Link></li>
                <li><Link to="/galleries/people" className="top-nav-link">people</Link></li>
              </ul>
            </li>
            <li>
              <Link to="sessions" className="top-nav-link">sessions</Link>
              <ul>
                <li><Link to="/sessions/dogs" className="top-nav-link">dogs</Link></li>
                <li><Link to="/sessions/cats" className="top-nav-link">cats</Link></li>
                <li><Link to="/sessions/horses" className="top-nav-link">horses</Link></li>
                <li><Link to="/sessions/twilight" className="top-nav-link">twilight</Link></li>
              </ul>
            </li>
            <li><Link to="contact" className="top-nav-link">contact us</Link></li>
          </ul>
        </nav>
      </label>
    )
  }
}
