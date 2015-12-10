import React from 'react'

import {
  Link,
  PropTypes,
} from 'react-router'

const {history} = PropTypes

import galleriesObject from '../public/galleries.json'

const galleries = (Object.keys(galleriesObject)
  .filter((key) => key !== 'home')
  .map((key) => galleriesObject[key])
)

export default class TopNav extends React.Component {
  static contextTypes = {
    history,
  }

  constructor(props) {
    super(props)

    this.state = {}
  }

  handleChange = (event) => {
    this.setState({showTopNavMenu: event.target.checked})
  }
  handleSubNavClick = (event) => {
    event.stopPropagation()
  }

  componentDidMount() {
    const {history} = this.context

    this.unlisten = history.listen((_, locationState) => {
      const {location} = locationState
      const {state} = location

      if (!state || !state.autoplay) {
        /* eslint-disable react/no-did-mount-set-state */
        this.setState({showTopNavMenu: false})
      }
    })
  }
  componentWillUnmount() {
    this.unlisten()
  }
  render() {
    const {showTopNavMenu} = this.state

    return (
      <label className="top-nav-control-label">
        <i className="top-nav-control-icon"></i>
        <input
          className="top-nav-control"
          type="checkbox"
          checked={showTopNavMenu}
          onChange={this.handleChange}
        />
        <div className="top-nav-control-overlay"></div>
        <nav className="top-nav">
          <ul>
            <li><Link to="/" className="top-nav-link">home</Link></li>
            <li><Link to="/about" className="top-nav-link">about</Link></li>
            <li>
              <label className="top-nav-control-label top-nav-control-label-sub" onClick={this.handleSubNavClick}>
                <input className="top-nav-control" type="checkbox" />
                <span to="/galleries" className="top-nav-link">galleries</span>
                <div className="top-nav-control-overlay top-nav-control-overlay-sub"></div>
                <ul className="top-nav-sub top-nav-sub-galleries">
                  {galleries.map((gallery, index) => (
                    <li key={index}>
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
              <label className="top-nav-control-label top-nav-control-label-sub" onClick={this.handleSubNavClick}>
                <input className="top-nav-control" type="checkbox" />
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
}
