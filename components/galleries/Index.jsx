import React from 'react'

import {Link} from 'react-router'

export default class GalleryIndex extends React.Component {
  render() {
    return (
      <ul>
        <li><Link to="dogs">dogs</Link></li>
        <li><Link to="horses">horses</Link></li>
        <li><Link to="people">people</Link></li>
        <li><Link to="twilight">twilight</Link></li>
      </ul>
    )
  }
}
