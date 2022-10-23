import React from 'react'

import Head from 'next/head'
import {useRouter} from 'next/router'

import Carousel from './Carousel'
import GalleryPicture from './GalleryPicture'
import {siteTitle} from './Layout'

import galleries from '../public/galleries.json'

const Gallery = ({galleryId, pictureId = ''}) => {
  const router = useRouter()

  const gallery = galleries[galleryId]
  const pictures = gallery.pictures.map((picture) => {
    picture.route = `/galleries/${gallery.id}/${picture.id}`
    return picture
  })
  let index = pictures.findIndex((picture) => picture.id === pictureId)

  if (index === -1) index = 0

  const picture = pictures[index]

  return (
    <div>
      {router.pathname !== '/' && (
        <Head>
          <title>{[
            index ? picture.title : null,
            gallery.title,
            siteTitle,
          ].filter(Boolean).join(' | ')}</title>
        </Head>
      )}
      <Carousel slideInterval={3000} items={pictures} index={index}>
        {pictureId ? (
          <GalleryPicture picture={picture} />
        ) : (
          pictures.map((picture) => (
            <GalleryPicture key={picture.id} picture={picture} />
          ))
        )}
      </Carousel>
    </div>
  )
}

export default Gallery
