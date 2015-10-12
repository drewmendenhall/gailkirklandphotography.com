import Helmet from 'react-helmet'
import React from 'react'
import classnames from 'classnames'

import {Link, PropTypes} from 'react-router'

const {history, location} = PropTypes

function rotateForward(max, index) {
  return (index < max - 1 ? index + 1 : 0)
}
function rotateBackward(max, index) {
  return (index > 0 ? index - 1 : max - 1)
}

export default class Carousel extends React.Component {
  static contextTypes = {
    history,
    location,
  }
  static defaultProps = {
    items: [],
    slideInterval: 2000,
  }
  static propTypes = {
    index: React.PropTypes.number,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      url: React.PropTypes.string,
    })),
    slideInterval: React.PropTypes.number,
  }

  constructor(props) {
    super(props)

    const {index = 0, items} = props

    this.state = {
      index,
      nextIndex: rotateForward(items.length, index),
      prevIndex: rotateBackward(items.length, index),
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.goToNextSlide = this.goToNextSlide.bind(this)
    this.goToPreviousSlide = this.goToPreviousSlide.bind(this)
    this.resetAutoplay = this.resetAutoplay.bind(this)
  }

  handleKeyDown(event) {
    const {key} = event

    switch (key) {
      case 'ArrowLeft':
        this.handlePrev(event)
        break
      case 'ArrowRight':
        this.handleNext(event)
        break
    }
  }
  handleNext(event) {
    if (this.props.autoplay) this.resetAutoplay()
    this.goToNextSlide()
    event.preventDefault()
  }
  handlePrev(event) {
    if (this.props.autoplay) this.resetAutoplay()
    this.goToPreviousSlide()
    event.preventDefault()
  }

  goToNextSlide() {
    const {history} = this.context
    const {children, items} = this.props
    const {nextIndex} = this.state

    if (this.props.index == null) {
      let {index} = this.state

      index = (index >= children.length - 1 ?
        0 : index + 1
      )

      this.setState({
        index,
        nextIndex: rotateForward(items.length, index),
        prevIndex: rotateBackward(items.length, index),
      })
    }
    else {
      history.pushState({autoplay: true}, items[nextIndex].route)
    }
  }
  goToPreviousSlide() {
    const {history} = this.context
    const {children, items} = this.props
    const {prevIndex} = this.state

    if (this.props.index == null) {
      let {index} = this.state

      index = (index <= 0 ?
        children.length - 1 : index - 1
      )

      this.setState({
        index,
        nextIndex: rotateForward(items.length, index),
        prevIndex: rotateBackward(items.length, index),
      })
    }
    else {
      history.pushState({autoplay: true}, items[prevIndex].route)
    }
  }
  resetAutoplay() {
    window.clearInterval(this.autoplayInterval)
    this.autoplayInterval = window.setInterval(this.goToNextSlide, this.props.slideInterval)
  }

  componentDidMount() {
    if (this.props.autoplay) {
      this.autoplayInterval = window.setInterval(this.goToNextSlide, this.props.slideInterval)
    }
  }
  componentWillReceiveProps(nextProps) {
    const {index, items} = nextProps

    if (items && index != null) {
      this.setState({
        index,
        nextIndex: rotateForward(items.length, index),
        prevIndex: rotateBackward(items.length, index),
      })
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.autoplay &&
      prevProps.slideInterval !== this.props.slideInterval
    ) {
      this.resetAutoplay()
    }
  }
  componentWillUnmount() {
    window.clearInterval(this.autoplayInterval)
  }
  render() {
    const {items} = this.props
    const {index, nextIndex, prevIndex} = this.state

    const url = items[index].route
    const nextUrl = items[nextIndex].route
    const prevUrl = items[prevIndex].route

    return (
      <div className="stretch carousel" onKeyDown={this.handleKeyDown}>
        <Helmet
          link={[
            {rel: 'canonical', href: url},
            {rel: 'next', href: nextUrl},
            {rel: 'prev', href: prevUrl},
          ]}
        />
        <Link
          to={prevUrl || ''}
          className="carousel-nav carousel-nav-prev"
          onClick={this.handlePrev}
          rel="prev"
        >
        </Link>
        <Link
          to={nextUrl || ''}
          className="carousel-nav carousel-nav-next"
          onClick={this.handleNext}
          rel="next"
        >
        </Link>
        {React.Children.map(this.props.children, (child, index) => (
          <div
            className={classnames('carousel-slide', {
              'carousel-slide-current': this.props.index || this.state.index === index,
            })}
            key={index}
          >
            {child}
          </div>
        ))}
      </div>
    )
  }
}
