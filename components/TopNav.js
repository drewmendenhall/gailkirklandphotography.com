import React from 'react'

import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import galleriesObject from '../public/galleries.json'
import useRouter from './useRouter'

const galleries = (Object.keys(galleriesObject)
  .filter((key) => key !== 'home')
  .map((key) => galleriesObject[key])
)

const TopNav = () => {
  const {history} = useRouter()
  const [{
    showGalleriesNavMenu,
    showSessionsNavMenu,
    showTopNavMenu,
  }, setMenuState] = useState({})

  const handleGalleriesNavControlChange = ({
    target: {checked: showGalleriesNavMenu},
  }) => {
    setMenuState((menuState) => ({
      ...menuState,
      showGalleriesNavMenu,
      showSessionsNavMenu: false,
    }))
  }
  const handleSessionsNavControlChange = ({
    target: {checked: showSessionsNavMenu},
  }) => {
    setMenuState((menuState) => ({
      ...menuState,
      showGalleriesNavMenu: false,
      showSessionsNavMenu,
    }))
  }
  const handleTopNavControlChange = ({target: {checked: showTopNavMenu}}) => {
    setMenuState((menuState) => ({
      ...menuState,
      showTopNavMenu,
    }))
  }
  const handleSubNavClick = (event) => {
    event.stopPropagation()
  }

  useEffect(() => {
    const unlisten = history.listen((location) => {
      const {state} = location

      if (!state || !state.autoplay) {
        /* eslint-disable react/no-did-mount-set-state */
        setMenuState({
          showGalleriesNavMenu: false,
          showSessionsNavMenu: false,
          showTopNavMenu: false,
        })
      }
    })

    return unlisten
  }, [history])

  return (
    <label className="top-nav-control-label">
      <i className="top-nav-control-icon"></i>
      <input
        className="top-nav-control"
        type="checkbox"
        checked={showTopNavMenu || false}
        onChange={handleTopNavControlChange}
      />
      <div className="top-nav-control-overlay"></div>
      <nav className="top-nav">
        <ul>
          <li><Link to="/" className="top-nav-link">home</Link></li>
          <li><Link to="/about" className="top-nav-link">about</Link></li>
          <li>
            <label className="top-nav-control-label top-nav-control-label-sub" onClick={handleSubNavClick}>
              <input
                className="top-nav-control"
                type="checkbox"
                checked={showGalleriesNavMenu || false}
                onChange={handleGalleriesNavControlChange}
              />
              <input className="top-nav-control" type="checkbox" />
              <span to="/galleries" className="top-nav-link">galleries</span>
              <div className="top-nav-control-overlay top-nav-control-overlay-sub"></div>
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
            <label className="top-nav-control-label top-nav-control-label-sub" onClick={handleSubNavClick}>
              <input
                className="top-nav-control"
                type="checkbox"
                checked={showSessionsNavMenu || false}
                onChange={handleSessionsNavControlChange}
              />
              <span to="/sessions" className="top-nav-link">sessions</span>
              <div className="top-nav-control-overlay top-nav-control-overlay-sub"></div>
              <ul className="top-nav-sub top-nav-sub-sessions">
                <li><Link to="/sessions/dogs" className="top-nav-link">dogs</Link></li>
                <li><Link to="/sessions/cats" className="top-nav-link">cats</Link></li>
                <li><Link to="/sessions/horses" className="top-nav-link">horses</Link></li>
                <li><Link to="/sessions/twilight" className="top-nav-link">twilight</Link></li>
              </ul>
            </label>
          </li>
          <li><Link to="/links" className="top-nav-link">links</Link></li>
          <li><Link to="/contact" className="top-nav-link">contact us</Link></li>
        </ul>
      </nav>
    </label>
  )
}

export default TopNav
