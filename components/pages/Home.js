import React from 'react'

import Gallery from '../Gallery'

const Home = (props) => (
  <Gallery
    {...props}
    match={{
      ...props.match,
      params: {
        ...props.match.params,
        galleryId: 'home',
      },
    }}
  />
)

export default Home
