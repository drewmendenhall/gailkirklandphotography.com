import React from 'react'

// import Image from 'next/image'

const GalleryPicture = (props) => {
  const {picture} = props

  // const id = props.id || `picture-${picture.id}`
  // const {minHeight, minWidth} = picture

  return (
    // <Image height={minHeight} width={minWidth} src={picture.url} />
    <img src={picture.url} />
  )
}

export default GalleryPicture
