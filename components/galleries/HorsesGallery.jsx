import React from 'react'
// import ImageGallery from 'react-image-gallery'
// import ImageGallery from 'react-image-gallery/src/ImageGallery.react'

import Carousel from '../Carousel'

var pictureNames = []
for (var i = 0; i <= 36; i++) {
  pictureNames.push(i)
}

export default class Horses extends React.Component {
  render() {
    return (
      <Carousel
        autoplay
        slideInterval={3000}
      >
        {pictureNames.map((name, index) => (
          <img src={`/images/horses/${name}.jpg`} key={index} />
        ))}
      </Carousel>
    )
  }
}
