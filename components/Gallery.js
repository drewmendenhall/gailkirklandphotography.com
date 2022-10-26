import React, {useRef} from 'react'

import Head from 'next/head'
import SliderBase from 'react-slick'
import styled from 'styled-components'
import {useRouter} from 'next/router'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import GalleryPicture from './GalleryPicture'
import {siteTitle} from './Layout'

import galleries from '../public/galleries.json'

const navPadding = '10px'
const horizontalSpacing = '40px'

const Slider = styled(SliderBase)`
  &, .slick-list, .slick-track {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .slick-slide {
    padding: ${horizontalSpacing};

    > div {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 100%;
      width: 100%;
    }

    img {
      max-height: 100%;
      max-width: 100%;
    }
  }

  .slick-dots {
    bottom: 8px;

    &, .slick-active {
      button::before {
        color: white;
      }
    }
  }
`

const SlideNavLink = styled.a`
  position: absolute;
  top: 0;
  bottom: 0;

  display: flex;
  flex-flow: column;
  justify-content: center;
  height: 100%;
  width: ${horizontalSpacing};

  color: white;
  font-family: Arial;
  font-size: 6em;
  text-decoration: none;
  text-shadow: 0 2px 2px #222;
  opacity: 0.5;
  outline: none;

  &:hover {
    opacity: 1;
  }
  &::before {
    position: relative;
    top: -12px;
  }
`

const SlidePreviousLink = styled(SlideNavLink)`
  left: 0;

  &::before {
    content: '‹';
    left: ${navPadding};
  }
`
const SlideNextLink = styled(SlideNavLink)`
  right: 0;
  text-align: right;

  &::before {
    content: '›';
    right: ${navPadding};
  }
`

const Gallery = ({galleryId, pictureId = ''}) => {
  const router = useRouter()
  const slider = useRef()

  const gallery = galleries[galleryId]
  const pictures = gallery.pictures.map((picture) => {
    picture.route = `/galleries/${gallery.id}/${picture.id}`
    return picture
  })
  let index = pictures.findIndex((picture) => picture.id === pictureId)

  if (index === -1) index = 0

  const nextIndex = (index + 1) % gallery.pictures.length
  const prevIndex = index > 0 ? index - 1 : gallery.pictures.length - 1

  const picture = pictures[index]

  const handleNext = (event) => {
    slider.current.slickNext()
    event.preventDefault()
  }
  const handlePrevious = (event) => {
    slider.current.slickPrev()
    event.preventDefault()
  }

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
      <Slider
        arrows={false}
        centerMode
        centerPadding={0}
        dots
        ref={slider}
      >
        {pictures.map((picture) => (
          <GalleryPicture key={picture.id} picture={picture} />
        ))}
      </Slider>
      <SlidePreviousLink href={`/galleries/${galleryId}/${pictures[prevIndex].id}`} onClick={handlePrevious} />
      <SlideNextLink href={`/galleries/${galleryId}/${pictures[nextIndex].id}`} onClick={handleNext} />
    </div>
  )
}

export default Gallery
