import React from 'react'

import {
  Link,
  browserHistory,
} from 'react-router'

import galleriesObject from '../public/galleries.json'

const galleries = (Object.keys(galleriesObject)
  .filter((key) => key !== 'home')
  .map((key) => galleriesObject[key])
)

export default class TopNav extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  state = {};

  handleGalleriesNavControlChange = (event) => {
    this.setState({
      showGalleriesNavMenu: event.target.checked,
      showSessionsNavMenu: false,
    })
  };
  handleSessionsNavControlChange = (event) => {
    this.setState({
      showGalleriesNavMenu: false,
      showSessionsNavMenu: event.target.checked,
    })
  };
  handleTopNavControlChange = (event) => {
    this.setState({showTopNavMenu: event.target.checked})
  };
  handleSubNavClick = (event) => {
    event.stopPropagation()
  };

  componentDidMount() {
    this.unlisten = browserHistory.listen((location) => {
      const {state} = location

      if (!state || !state.autoplay) {
        /* eslint-disable react/no-did-mount-set-state */
        this.setState({
          showGalleriesNavMenu: false,
          showSessionsNavMenu: false,
          showTopNavMenu: false,
        })
      }
    })
  }
  componentWillUnmount() {
    this.unlisten()
  }
  render() {
    const {
      showGalleriesNavMenu,
      showSessionsNavMenu,
      showTopNavMenu,
    } = this.state

    return (
      <label className="top-nav-control-label">
        <i className="top-nav-control-icon"></i>
        <input
          className="top-nav-control"
          type="checkbox"
          checked={showTopNavMenu || false}
          onChange={this.handleTopNavControlChange}
        />
        <div className="top-nav-control-overlay"></div>
        <nav className="top-nav">
          <ul>
            <li><Link to="/" className="top-nav-link">home</Link></li>
            <li><Link to="/about" className="top-nav-link">about</Link></li>
            <li>
              <label className="top-nav-control-label top-nav-control-label-sub" onClick={this.handleSubNavClick}>
                <input
                  className="top-nav-control"
                  type="checkbox"
                  checked={showGalleriesNavMenu || false}
                  onChange={this.handleGalleriesNavControlChange}
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
              <label className="top-nav-control-label top-nav-control-label-sub" onClick={this.handleSubNavClick}>
                <input
                  className="top-nav-control"
                  type="checkbox"
                  checked={showSessionsNavMenu || false}
                  onChange={this.handleSessionsNavControlChange}
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
}
