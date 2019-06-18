import React from 'react'

import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {Link} from 'react-router-dom'
import {useCallback, useEffect, useRef, useState} from 'react'

import useRouter from './useRouter'

const rotateForward = (max, index) => (
  index < max - 1 ? index + 1 : 0
)

const rotateBackward = (max, index) => (
  index > 0 ? index - 1 : max - 1
)

const Carousel = (props) => {
  const {history, location} = useRouter()
  const {items} = props

  const [index, setIndex] = useState(props.index || 0)
  const autoplayInterval = useRef(null)

  const nextIndex = rotateForward(items.length, index)
  const prevIndex = rotateBackward(items.length, index)

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
    }
    else {
      history.push({
        pathname: nextUrl,
        state: {autoplay: true},
      })
    }
  }, [history, nextIndex, nextUrl, props.index])
  const goToPreviousSlide = () => {
    if (props.index == null) {
      setIndex(prevIndex)
    }
    else {
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
    autoplayInterval.current = window.setInterval(goToNextSlide, props.slideInterval)
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
    <div className="stretch carousel" onKeyDown={handleKeyDown}>
      <Helmet
        link={[
          {rel: 'canonical', href: (location.pathname === '/' ? '/' : url)},
          {rel: 'next', href: nextUrl},
          {rel: 'prev', href: prevUrl},
        ]}
      />
      {React.Children.map(props.children, (child, i) => (
        <div
          className={classnames('carousel-slide', {
            'carousel-slide-current': (props.index || index === i),
            'carousel-slide-next': (i === nextIndex),
            'carousel-slide-prev': (i === prevIndex),
          })}
          key={child.key || index}
        >
          {child}
        </div>
      ))}
      <Link
        to={prevUrl || ''}
        className="carousel-nav carousel-nav-prev"
        onClick={handlePrev}
        rel="prev"
      >
      </Link>
      <Link
        to={nextUrl || ''}
        className="carousel-nav carousel-nav-next"
        onClick={handleNext}
        rel="next"
      >
      </Link>
    </div>
  )
}

Carousel.defaultProps = {
  slideInterval: 2000,
}
Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
  })),
  slideInterval: PropTypes.number,
}

export default Carousel
