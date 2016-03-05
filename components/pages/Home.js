import React from 'react'

import Gallery from '../Gallery'

export default (props) => (
  <Gallery
    {...props}
    params={{
      ...props.params,
      galleryId: 'home',
    }}
  />
)
