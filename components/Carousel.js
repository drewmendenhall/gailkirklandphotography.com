import React from 'react'

import PropTypes from 'prop-types'
import classnames from 'classnames'
import styled from 'styled-components'
import {Helmet} from 'react-helmet-async'
import {Link} from 'react-router-dom'
import {useCallback, useEffect, useRef, useState} from 'react'
import {useHistory, useLocation} from 'react-router'

import {stretch} from './styled/layout'

const carouselNavPadding = 10

const StyledCarousel = styled.div`
  ${stretch}
  overflow: hidden;

  picture {
    height: 100%;
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50%;

    img {
      display: none;
    }
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
const CarouselSlideNavLink = styled(Link)`
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
  const history = useHistory()
  const location = useLocation()
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
    event.preventDefault()
  }
  const handlePrev = (event) => {
    if (props.autoplay) resetAutoplay()
    goToPreviousSlide()
    event.preventDefault()
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
      history.push({
        pathname: nextUrl,
        state: {autoplay: true},
      })
    }
  }, [history, nextIndex, nextUrl, props.index])
  const goToPreviousSlide = () => {
    if (props.index == null) {
      setIndex(prevIndex)
    } else {
      history.push({
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
      <Helmet
        link={[
          {rel: 'canonical', href: location.pathname === '/' ? '/' : url},
          {rel: 'next', href: nextUrl},
          {rel: 'prev', href: prevUrl},
        ]}
      />
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
        to={prevUrl || ''}
        onClick={handlePrev}
        rel="prev"
      />
      <CarouselSlideNextLink
        to={nextUrl || ''}
        onClick={handleNext}
        rel="next"
      />
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
