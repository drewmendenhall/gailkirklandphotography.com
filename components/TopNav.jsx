import React from 'react'

import {
  IndexLink,
  Link,
} from 'react-router'

import connectHistory from './connectHistory'
import galleriesObject from '../public/galleries.json'

var galleries = (Object.keys(galleriesObject)
  .filter((key) => key !== 'home')
  .map((key) => galleriesObject[key])
)

@connectHistory
export default class TopNav extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  handleChange(event) {
    this.setState({showTopNavMenu: event.target.checked})
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen((_, locationState) => {
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
    return (
      <label className="top-nav-control-label">
        <i className="top-nav-control-icon"></i>
        <input
          className="top-nav-control"
          type="checkbox"
          checked={this.state.showTopNavMenu}
          onChange={::this.handleChange}
        />
        <div className="top-nav-control-overlay"></div>
        <nav className="top-nav">
          <ul>
            <li><IndexLink to="/" className="top-nav-link">home</IndexLink></li>
            <li><Link to="/about" className="top-nav-link">about</Link></li>
            <li>
              <Link to="/galleries" className="top-nav-link">galleries</Link>
              <ul>
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
            </li>
            <li>
              <Link to="/sessions" className="top-nav-link">sessions</Link>
              <ul>
                <li><Link to="/sessions/dogs" className="top-nav-link">dogs</Link></li>
                <li><Link to="/sessions/cats" className="top-nav-link">cats</Link></li>
                <li><Link to="/sessions/horses" className="top-nav-link">horses</Link></li>
                <li><Link to="/sessions/twilight" className="top-nav-link">twilight</Link></li>
              </ul>
            </li>
            <li><Link to="/links" className="top-nav-link">links</Link></li>
            <li><Link to="/contact" className="top-nav-link">contact us</Link></li>
          </ul>
        </nav>
      </label>
    )
  }
}
