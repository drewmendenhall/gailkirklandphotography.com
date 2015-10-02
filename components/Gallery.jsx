import React from 'react'

import Carousel from './Carousel'

import galleries from '../public/galleries.json'

export default class Gallery extends React.Component {
  render() {
    var gallery = galleries[this.props.params.galleryId]

    return (
      <Carousel
        autoplay
        slideInterval={3000}
      >
        {gallery.pictures.map((picture, index) => (
          <img src={picture.url} key={index} />
        ))}
      </Carousel>
    )
  }
}
