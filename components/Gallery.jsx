import Helmet from 'react-helmet'
import React from 'react'

import Carousel from './Carousel'

import galleries from '../public/galleries.json'

export default class Gallery extends React.Component {
  render() {
    var {params} = this.props
    var {
      galleryId,
      pictureId,
    } = params
    var gallery = galleries[galleryId]
    var pictures = gallery.pictures.map((picture) => {
      picture.route = `/galleries/${gallery.id}/${picture.id}`
      return picture
    })
    var index = pictureId && pictures.findIndex((picture) => picture.id === pictureId)

    if (index === -1) index = 0

    var picture = pictures[index]

    return (
      <div>
        <Helmet
          title={`${(this.props.index ?
            picture.title + ' | ' : ''
          )}${gallery.title}`}
        />
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
}
