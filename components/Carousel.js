import React from 'react'

import PropTypes from 'prop-types'
import Head from 'next/head'
import Link from 'next/link'
import classnames from 'classnames'
import styled from 'styled-components'
import {useCallback, useEffect, useRef, useState} from 'react'
import {useRouter} from 'next/router'

import {stretch} from './styled/layout'

const carouselNavPadding = 10

const StyledCarousel = styled.div`
  ${stretch}
  overflow: hidden;

  img {
    max-height: 100%;
    max-width: 100%;
  }
`

const CarouselSlide = styled.div`
  position: absolute;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: none;
  padding: 3em;

  height: 100%;

  &.current,
  &.next,
  &.prev {
    display: flex;
    transition: transform 0.3s;
  }
  &.next {
    transform: translate(100%);
  }
  &.prev {
    transform: translate(-100%);
  }

  &.current {
    transform: translate(0);
  }
`
const CarouselSlideNavLink = styled.a`
  display: flex;
  flex-flow: column;
  justify-content: center;
  position: absolute;
  height: 100%;
  color: white;
  font-family: Arial;
  font-size: 6em;
  text-decoration: none;
  text-shadow: 0 2px 2px #222;
  outline: none;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
  &::before {
    position: relative;
    top: -10px;
  }
`

const CarouselSlideNextLink = styled(CarouselSlideNavLink)`
  width: 67%;
  right: 0;
  text-align: right;

  &::before {
    content: '›';
    right: ${carouselNavPadding}px;
  }
`
const CarouselSlidePreviousLink = styled(CarouselSlideNavLink)`
  width: 33%;

  &::before {
    content: '‹';
    left: ${carouselNavPadding}px;
  }
`

const Carousel = (props) => {
  const router = useRouter()
  const {items} = props

  const [index, setIndex] = useState(props.index || 0)
  const autoplayInterval = useRef(null)

  const nextIndex = (index + 1) % items.length
  const prevIndex = index > 0 ? index - 1 : items.length - 1

  const url = items[index].route
  const nextUrl = items[nextIndex].route
  const prevUrl = items[prevIndex].route

  const handleNext = (event) => {
    if (props.autoplay) resetAutoplay()
    goToNextSlide()
    event.stopPropagation()
  }
  const handlePrev = (event) => {
    if (props.autoplay) resetAutoplay()
    goToPreviousSlide()
    event.stopPropagation()
  }
  const handleKeyDown = (event) => {
    const {key} = event

    switch (key) {
      case 'ArrowLeft':
        handlePrev(event)
        break
      case 'ArrowRight':
        handleNext(event)
        break
    }
  }
  const goToNextSlide = useCallback(() => {
    if (props.index == null) {
      setIndex(nextIndex)
    } else {
      router.push({
        pathname: nextUrl,
        state: {autoplay: true},
      })
    }
  }, [nextIndex, nextUrl, props.index, router])
  const goToPreviousSlide = () => {
    if (props.index == null) {
      setIndex(prevIndex)
    } else {
      router.push({
        pathname: prevUrl,
        state: {autoplay: true},
      })
    }
  }
  const resetAutoplay = useCallback(() => {
    if (autoplayInterval.current) {
      window.clearInterval(autoplayInterval.current)
    }
    autoplayInterval.current = window.setInterval(
      goToNextSlide,
      props.slideInterval,
    )
  }, [props.slideInterval, goToNextSlide])

  useEffect(() => {
    if (props.autoplay) {
      resetAutoplay()
    }

    return () => {
      window.clearInterval(autoplayInterval.current)
    }
  }, [props.autoplay, props.slideInterval, resetAutoplay])

  return (
    <StyledCarousel className="carousel" onKeyDown={handleKeyDown}>
      <Head>
        <link rel="canonical" href={router.pathname === '/' ? '/' : url} />
        <link rel="next" href={nextUrl} />
        <link rel="prev" href={prevUrl} />
      </Head>
      {React.Children.map(props.children, (child, i) => (
        <CarouselSlide
          className={classnames({
            current: props.index || index === i,
            next: i === nextIndex,
            prev: i === prevIndex,
          })}
          key={child.key || index}
        >
          {child}
        </CarouselSlide>
      ))}
      <CarouselSlidePreviousLink
        href={prevUrl || ''}
        onClick={handlePrev}
        rel="prev"
      />
      <Link href={nextUrl || ''} passHref>
        <CarouselSlideNextLink
          onClick={handleNext}
          rel="next"
        />
      </Link>
    </StyledCarousel>
  )
}

Carousel.defaultProps = {
  slideInterval: 2000,
}
Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
    }),
  ),
  slideInterval: PropTypes.number,
}

export default Carousel
