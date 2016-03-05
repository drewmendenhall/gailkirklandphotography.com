import React from 'react'

import Helmet from 'react-helmet'
import classnames from 'classnames'
import {Link} from 'react-router'

function rotateForward(max, index) {
  return (index < max - 1 ? index + 1 : 0)
}
function rotateBackward(max, index) {
  return (index > 0 ? index - 1 : max - 1)
}

export default class Carousel extends React.Component {
  static contextTypes = {
    location: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
  };
  static defaultProps = {
    items: [],
    slideInterval: 2000,
  };
  static propTypes = {
    index: React.PropTypes.number,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      url: React.PropTypes.string,
    })),
    slideInterval: React.PropTypes.number,
  };

  constructor(props) {
    super(props)

    const {index = 0, items} = props

    this.state = {
      index,
      nextIndex: rotateForward(items.length, index),
      prevIndex: rotateBackward(items.length, index),
    }
  }

  handleKeyDown = (event) => {
    const {key} = event

    switch (key) {
      case 'ArrowLeft':
        this.handlePrev(event)
        break
      case 'ArrowRight':
        this.handleNext(event)
        break
    }
  };
  handleNext = (event) => {
    if (this.props.autoplay) this.resetAutoplay()
    this.goToNextSlide()
    event.preventDefault()
  };
  handlePrev = (event) => {
    if (this.props.autoplay) this.resetAutoplay()
    this.goToPreviousSlide()
    event.preventDefault()
  };
  goToNextSlide = () => {
    const {router} = this.context
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
      router.push({
        pathname: items[nextIndex].route,
        state: {autoplay: true},
      })
    }
  };
  goToPreviousSlide = () => {
    const {router} = this.context
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
      router.push({
        pathname: items[prevIndex].route,
        state: {autoplay: true},
      })
    }
  };
  resetAutoplay = () => {
    window.clearInterval(this.autoplayInterval)
    this.autoplayInterval = window.setInterval(this.goToNextSlide, this.props.slideInterval)
  };

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
    if (items !== this.props.items) {
      this.setState({
        index: 0,
        nextIndex: rotateForward(items.length, 0),
        prevIndex: rotateBackward(items.length, 0),
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
    const {location} = this.context
    const {items} = this.props
    const {index, nextIndex, prevIndex} = this.state

    const url = items[index].route
    const nextUrl = items[nextIndex].route
    const prevUrl = items[prevIndex].route

    return (
      <div className="stretch carousel" onKeyDown={this.handleKeyDown}>
        <Helmet
          link={[
            {rel: 'canonical', href: (location.pathname === '/' ? '/' : url)},
            {rel: 'next', href: nextUrl},
            {rel: 'prev', href: prevUrl},
          ]}
        />
        {React.Children.map(this.props.children, (child, index) => (
          <div
            className={classnames('carousel-slide', {
              'carousel-slide-current': this.props.index || this.state.index === index,
              'carousel-slide-next': (this.props.index || index === nextIndex),
              'carousel-slide-prev': (this.props.index || index === prevIndex),
            })}
            key={index}
          >
            {child}
          </div>
        ))}
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
      </div>
    )
  }
}
