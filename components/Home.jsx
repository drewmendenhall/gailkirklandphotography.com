import React from 'react'

import Gallery from './Gallery'

export default class Home extends React.Component {
  render() {
    return (
      <Gallery
        {...this.props}
        params={Object.assign({galleryId: 'home'}, this.props.params)}
      />
    )
  }
}
