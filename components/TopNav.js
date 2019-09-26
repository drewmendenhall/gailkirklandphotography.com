import React from 'react'

import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {useHistory} from 'react-router'

import galleriesObject from '../public/galleries.json'

const galleries = Object.keys(galleriesObject)
  .filter((key) => key !== 'home')
  .map((key) => galleriesObject[key])

const TopNav = () => {
  const [showGalleriesSubNavMenu, setShowGalleriesSubNavMenu] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showSessionsSubNavMenu, setShowSessionsSubNavMenu] = useState(false)
  const history = useHistory()

  const handleTopNavControlChange = () => {
    setShowMenu((show) => !show)
  }

  useEffect(
    () =>
      history.listen(({state}) => {
        if (!state || !state.autoplay) {
          setShowMenu(false)
          setShowGalleriesSubNavMenu(false)
          setShowSessionsSubNavMenu(false)
        }
      }),
    [history],
  )

  return (
    <label className="top-nav-control-label">
      <i className="top-nav-control-icon"></i>
      <input
        className="top-nav-control"
        type="checkbox"
        checked={showMenu}
        onChange={handleTopNavControlChange}
      />
      <div className="top-nav-control-overlay"></div>
      <nav className="top-nav">
        <ul>
          <li>
            <Link to="/" className="top-nav-link">
              home
            </Link>
          </li>
          <li>
            <Link to="/about" className="top-nav-link">
              about
            </Link>
          </li>
          <li>
            <label className="top-nav-control-label top-nav-control-label-sub">
              <input
                className="top-nav-control"
                name="top-nav"
                value="galleries"
                type="radio"
                checked={showGalleriesSubNavMenu}
                onChange={() => {
                  setShowGalleriesSubNavMenu(true)
                  setShowSessionsSubNavMenu(false)
                }}
              />
              <span to="/galleries" className="top-nav-link">
                galleries
              </span>
              <label className="top-nav-control-overlay top-nav-control-overlay-sub">
                <input
                  className="top-nav-control"
                  name="top-nav"
                  value="hide"
                  type="radio"
                  onChange={() => {
                    setShowGalleriesSubNavMenu(false)
                    setShowSessionsSubNavMenu(false)
                  }}
                />
              </label>
              <ul className="top-nav-sub top-nav-sub-galleries">
                {galleries.map((gallery) => (
                  <li key={gallery.id}>
                    <Link
                      to={`/galleries/${gallery.id}`}
                      className="top-nav-link"
                    >
                      {gallery.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </label>
          </li>
          <li>
            <label className="top-nav-control-label top-nav-control-label-sub">
              <input
                className="top-nav-control"
                name="top-nav"
                value="sessions"
                type="radio"
                checked={showSessionsSubNavMenu}
                onChange={() => {
                  setShowGalleriesSubNavMenu(false)
                  setShowSessionsSubNavMenu(true)
                }}
              />
              <span to="/sessions" className="top-nav-link">
                sessions
              </span>
              <label className="top-nav-control-overlay top-nav-control-overlay-sub">
                <input
                  className="top-nav-control"
                  name="top-nav"
                  value="hide"
                  type="radio"
                  onChange={() => {
                    setShowGalleriesSubNavMenu(false)
                    setShowSessionsSubNavMenu(false)
                  }}
                />
              </label>
              <ul className="top-nav-sub top-nav-sub-sessions">
                <li>
                  <Link to="/sessions/dogs" className="top-nav-link">
                    dogs
                  </Link>
                </li>
                <li>
                  <Link to="/sessions/cats" className="top-nav-link">
                    cats
                  </Link>
                </li>
                <li>
                  <Link to="/sessions/horses" className="top-nav-link">
                    horses
                  </Link>
                </li>
                <li>
                  <Link to="/sessions/twilight" className="top-nav-link">
                    twilight
                  </Link>
                </li>
              </ul>
            </label>
          </li>
          <li>
            <Link to="/links" className="top-nav-link">
              links
            </Link>
          </li>
          <li>
            <Link to="/contact" className="top-nav-link">
              contact us
            </Link>
          </li>
        </ul>
      </nav>
    </label>
  )
}

export default TopNav
