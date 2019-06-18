import React from 'react'

import Helmet from 'react-helmet'

import Carousel from './Carousel'
import GalleryPicture from './GalleryPicture'

import galleries from '../public/galleries.json'

const Gallery = (props) => {
  const {location, match: {params}} = props
  const {
    galleryId,
    pictureId,
  } = params
  const gallery = galleries[galleryId]
  const pictures = gallery.pictures.map((picture) => {
    picture.route = `/galleries/${gallery.id}/${picture.id}`
    return picture
  })
  let index = pictureId && pictures.findIndex((picture) => picture.id === pictureId)

  if (index === -1) index = 0

  const picture = pictures[index]

  return (
    <div>
      {location.pathname !== '/' &&
        <Helmet
          title={`${(props.index ?
            picture.title + ' | ' : ''
          )}${gallery.title}`}
        />
      }
      <Carousel
        slideInterval={3000}
        items={pictures}
        index={index}
      >
        {pictureId ?
          <GalleryPicture picture={picture} />
        :
          pictures.map((picture) => (
            <GalleryPicture key={picture.id} picture={picture} />
          ))
        }
      </Carousel>
    </div>
  )
}

export default Gallery
