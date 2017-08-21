import React from 'react'

import Gallery from '../Gallery'

export default (props) => (
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
