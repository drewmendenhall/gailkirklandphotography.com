import React from 'react'
// import ImageGallery from 'react-image-gallery'
// import ImageGallery from 'react-image-gallery/src/ImageGallery.react'

import Carousel from '../Carousel'

var pictureNames = [
  'ablueDSC_7124',
  'abrighteyeDSC_7124',
  'acallieDSC_0805',
  'achurchillDSC_4866 3',
  'aDSC_8104 copy',
  'aDSC_8202',
  'ajDSC_1771',
  'amaincoonDSC_7056',
  'amona',
  'aXDSC_1778',
  'aXDSC_1837',
]

export default class CatsGallery extends React.Component {
  render() {
    return (
      <Carousel
        autoplay
        slideInterval={3000}
      >
        {pictureNames.map((name, index) => (
          <img src={`/images/cats/${name}.jpg`} key={index} />
        ))}
      </Carousel>
    )
  }
}
