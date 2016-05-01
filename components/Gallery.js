import React from 'react'

import {extname} from 'path'
import Helmet from 'react-helmet'

import Carousel from './Carousel'

import galleries from '../public/galleries.json'

const baseFontSize = 16
const widths = [
  320,
  375,
  425,
  768,
  1024,
]

const fontSize = baseFontSize * 1.25
const padding = fontSize * 3
const pictureWidths = widths.map((width) => width - padding * 2)

const pictureSizes = widths.map((width, index) => (
  `(min-width: ${width + 1}px) ${pictureWidths[index]}w`
))

function fileSuffix(filename, suffix) {
  const ext = extname(filename)

  return filename.replace(ext, `${suffix}${ext}`)
}

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
          pictures.map((picture) => (
            <img
              src={picture.url}
              srcSet={pictureWidths.map((width) => (
                `${fileSuffix(picture.url, `-${width}`)} ${width}w`
              ))}
              sizes={pictureSizes}
              key={picture.id}
            />
          ))
        }
      </Carousel>
    </div>
  )
}
