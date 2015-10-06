import React from 'react'
import classnames from 'classnames'

import {Link} from 'react-router'

export default class Carousel extends React.Component {
  static defaultProps = {
    slideInterval: 2000,
  }
  static propTypes = {
    index: React.PropTypes.number,
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        url: React.PropTypes.string,
      })
    ),
    slideInterval: React.PropTypes.number,
  }

  constructor(props) {
    super(props)

    let {index, items} = props
    if (items && index != null) {
      var nextIndex = index < items.length - 1 ? index + 1 : 0
      var prevIndex = index > 0 ? index - 1 : items.length - 1
    }

    this.state = {
      index: index || 0,
      nextIndex,
      prevIndex,
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.goToNextSlide = this.goToNextSlide.bind(this)
    this.goToPreviousSlide = this.goToPreviousSlide.bind(this)
    this.resetAutoplay = this.resetAutoplay.bind(this)
  }

  handleKeyDown(event) {
    var {key} = event

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
    event.preventDefault()
    this.goToNextSlide()
    if (this.props.autoplay) this.resetAutoplay()
  }
  handlePrev(event) {
    event.preventDefault()
    this.goToPreviousSlide()
    if (this.props.autoplay) this.resetAutoplay()
  }

  goToNextSlide() {
    if (this.props.index == null) {
      let {children} = this.props
      let {index} = this.state

      this.setState({
        index: (index >= children.length - 1 ?
          0 : index + 1
        ),
      })
    }
    else {
      let {items} = this.props
      let {nextIndex} = this.state

      history.pushState({}, items[nextIndex].route)
    }
  }
  goToPreviousSlide() {
    if (this.props.index == null) {
      let {children} = this.props
      let {index} = this.state

      this.setState({
        index: (index <= 0 ?
          children.length - 1 : index - 1
        ),
      })
    }
    else {
      let {items} = this.props
      let {prevIndex} = this.state

      history.pushState({}, items[prevIndex].route)
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
    var {index, items} = nextProps

    if (items && index != null) {
      var nextIndex = index < items.length - 1 ? index + 1 : 0
      var prevIndex = index > 0 ? index - 1 : items.length - 1

      this.setState({
        index,
        nextIndex,
        prevIndex,
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
    var {items} = this.props
    var {index, nextIndex, prevIndex} = this.state

    if (items && this.props.index != null) {
      var nextUrl = items[nextIndex].route
      var prevUrl = items[prevIndex].route
    }

    return (
      <div className="stretch carousel" onKeyDown={this.handleKeyDown}>
        <Link
          to={prevUrl || ''}
          className="carousel-nav carousel-nav-prev"
          onClick={!prevUrl && this.handlePrev || null}
          rel="prev"
        >
        </Link>
        <Link
          to={nextUrl || ''}
          className="carousel-nav carousel-nav-next"
          onClick={!nextUrl && this.handleNext || null}
          rel="next"
        >
        </Link>
        {React.Children.map(this.props.children, (child, index) => (
          <div className={classnames('carousel-slide', {
            'carousel-slide-current': this.props.index || this.state.index === index,
          })} key={index}>
            {child}
          </div>
        ))}
      </div>
    )
  }
}
