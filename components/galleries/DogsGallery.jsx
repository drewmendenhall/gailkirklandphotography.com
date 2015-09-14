import React from 'react'
// import ImageGallery from 'react-image-gallery'
// import ImageGallery from 'react-image-gallery/src/ImageGallery.react'

import Carousel from '../Carousel'

var pictureNames = []
for (var i = 1; i <= 35; i++) {
  pictureNames.push(i)
}

export default class Dogs extends React.Component {
  render() {
    return (
      <Carousel
        autoplay
        slideInterval={3000}
      >
        {pictureNames.map((name, index) => (
          <img src={`/images/dogs/${name}.jpg`} key={index} />
        ))}
      </Carousel>
    )
  }
}
