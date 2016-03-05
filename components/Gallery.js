import React from 'react'

import Helmet from 'react-helmet'

import Carousel from './Carousel'

import galleries from '../public/galleries.json'

export default (props) => {
  const {location, params} = props
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
        autoplay
        slideInterval={3000}
        items={pictures}
        index={index}
      >
        {pictureId ?
          <img src={picture.url} />
        :
          pictures.map((picture, index) => (
            <img src={picture.url} key={index} />
          ))
        }
      </Carousel>
    </div>
  )
}
