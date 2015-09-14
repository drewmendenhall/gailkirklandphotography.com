import React from 'react'

import Carousel from '../Carousel'

var pictureNames = [1, 2, 3]

export default class Twilight extends React.Component {
  render() {
    return (
      <Carousel
        autoplay
        slideInterval={3000}
      >
        {pictureNames.map((name, index) => (
          <img src={`/images/twilight/${name}.jpg`} key={index} />
        ))}
      </Carousel>
    )
  }
}
