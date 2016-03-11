import React from 'react'
import classnames from 'classnames'

import {Link} from 'react-router'

// import '../styles/carousel'

export default class Carousel extends React.Component {
  static defaultProps = {
    slideInterval: 2000,
  }
  static propTypes = {
    children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
    slideInterval: React.PropTypes.number,
  }

  constructor(props) {
    super(props)

    this.state = {
      currentIndex: 0,
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
    var {children} = this.props
    var {currentIndex} = this.state

    this.setState({
      currentIndex: (currentIndex >= children.length - 1 ?
        0 : currentIndex + 1
      ),
    })
  }
  goToPreviousSlide() {
    var {children} = this.props
    var {currentIndex} = this.state

    this.setState({
      currentIndex: (currentIndex <= 0 ?
        children.length - 1 : currentIndex - 1
      ),
    })
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
    var {currentIndex} = this.state

    return (
      <div className="stretch carousel" onKeyDown={this.handleKeyDown}>
        <a
          className="carousel-nav carousel-nav-prev"
          href=""
          onClick={this.handlePrev}
        >
        </a>
        <a
          className="carousel-nav carousel-nav-next"
          href=""
          onClick={this.handleNext}
        >
        </a>
        <div className="carousel-slides">
          {this.props.children.map((child, index) => (
            <div className={classnames('carousel-slide', {
              'carousel-slide-current': currentIndex === index,
            })} key={index}>
              {child}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
