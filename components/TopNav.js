import React from 'react'

import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {useHistory} from 'react-router'

import galleriesObject from '../public/galleries.json'
import {headerBackground, headerHeight} from './styled/variables'

const galleries = Object.keys(galleriesObject)
  .filter((key) => key !== 'home')
  .map((key) => galleriesObject[key])

const dropdownShadow = '0 0 20px -5px black'
const subMenuBackground = '#343434'
const subMenuItemPaddingVertical = 10
const subMenuItemLineHeight = 16
const subMenuItemHeight = 2 * subMenuItemPaddingVertical + subMenuItemLineHeight

const StyledTopNav = styled.nav`
  flex: 1;
  position: fixed;
  max-height: calc(100% - ${headerHeight});
  top: ${headerHeight};
  left: 100%;
  overflow: auto;
  transition: all 0.2s;
  background: ${headerBackground};

  @media (min-width: 600px) {
    flex: none;
    position: static;
    position: initial;
    max-height: auto;
    max-height: initial;
    width: 100%;
    overflow: visible;
    transition: none;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  > ul {
    @media (min-width: 600px) {
      display: flex;
    }
    > li {
      @media (min-width: 600px) {
        flex: 1;
      }
    }
  }
`

const TopNavControlIcon = styled.i`
  font-size: 2rem;
  font-style: normal;
  padding: 0 2rem;

  ::before {
    content: '☰';
  }

  @media (min-width: 600px) {
    display: none;
  }
`
const TopNavControlLabel = styled.label`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  user-select: none;
  @media (min-width: 600px) {
    flex: 1;

    ${'' /* IE fix */}
    display: inline;
  }

  @media (min-width: 1000px) {
    ${'' /* IE fix */}
    display: flex;
  }
`
const NavMenuItem = styled.span.attrs(({to}) => ({
  as: to ? NavLink : 'span',
  exact: true,
}))`
  display: block;
  flex: 1;
  width: 100%;
  color: white;
  letter-spacing: 1px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;
  opacity: 0.3;
  z-index: 1;
  -ms-flex-preferred-size: auto;

  &:hover {
    opacity: 1;
  }
  &.active {
    font-weight: bold;
    opacity: 0.7;
    cursor: default;
  }
`
const TopNavOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  cursor: default;
  cursor: initial;
`

const StyledSubNav = styled.ul`
  height: 0;
  overflow: hidden;
  width: 100%;
  transition: height 0.2s;

  @media (min-width: 600px) {
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    position: absolute;
    top: 100%;
    right: 0;
    min-width: 100%;
    z-index: -1;
    background: ${headerBackground};
    box-shadow: ${dropdownShadow};
  }

  li {
    display: block;
  }
`
const StyledSubNavGalleries = styled(StyledSubNav)``
const StyledSubNavSessions = styled(StyledSubNav)``
const SubNavControlLabel = styled(TopNavControlLabel)`
  display: flex;
`
const SubNavMenuItem = styled(NavMenuItem)`
  padding: ${subMenuItemPaddingVertical}px;
  line-height: ${subMenuItemLineHeight}px;
  text-align: center;
  @media (min-width: 600px) {
    text-align: left;
  }
`
const TopNavMenuItem = styled(NavMenuItem)`
  padding: 1em;
  @media (min-width: 600px) {
    padding: 1em 0;
  }
  @media (min-width: 1000px) {
    padding-top: 36px;
    padding-bottom: 30px;
  }
`
const SubNavOverlay = styled(TopNavOverlay).attrs({as: 'label'})``

const TopNavControl = styled.input.attrs((props) => ({
  type: 'checkbox',
  ...props,
}))`
  display: none;

  :checked {
    ~ ${StyledTopNav} {
      transform: translate(-100%);

      @media (min-width: 600px) {
        transform: none;
        transform: initial;
      }
    }

    ~ ${NavMenuItem}, ~ ${StyledSubNav} {
      background: ${subMenuBackground};
    }

    ~ ${StyledSubNavGalleries} {
      height: ${galleries.length * subMenuItemHeight}px;
    }

    ~ ${StyledSubNavSessions} {
      height: ${4 * subMenuItemHeight}px;
    }

    ~ ${TopNavMenuItem} {
      color: white;
      opacity: 1;
    }

    ~ ${TopNavOverlay} {
      display: block;
    }

    ~ ${SubNavOverlay} {
      display: none;
      @media (min-width: 600px) {
        display: block;
        display: initial;
      }
    }
  }
`

const TopNav = () => {
  const [showGalleriesSubNavMenu, setShowGalleriesSubNavMenu] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showSessionsSubNavMenu, setShowSessionsSubNavMenu] = useState(false)
  const history = useHistory()

  const handleTopNavControlChange = () => {
    setShowMenu((show) => !show)
  }

  useEffect(
    () =>
      history.listen(({state}) => {
        if (!state || !state.autoplay) {
          setShowMenu(false)
          setShowGalleriesSubNavMenu(false)
          setShowSessionsSubNavMenu(false)
        }
      }),
    [history],
  )

  return (
    <TopNavControlLabel>
      <TopNavControlIcon />
      <TopNavControl checked={showMenu} onChange={handleTopNavControlChange} />
      <TopNavOverlay />
      <StyledTopNav>
        <ul>
          <li>
            <TopNavMenuItem to="/">home</TopNavMenuItem>
          </li>
          <li>
            <TopNavMenuItem to="/about">about</TopNavMenuItem>
          </li>
          <li>
            <SubNavControlLabel>
              <TopNavControl
                name="top-nav"
                value="galleries"
                type="radio"
                checked={showGalleriesSubNavMenu}
                onChange={() => {
                  setShowGalleriesSubNavMenu(true)
                  setShowSessionsSubNavMenu(false)
                }}
              />
              <TopNavMenuItem>galleries</TopNavMenuItem>
              <SubNavOverlay>
                <TopNavControl
                  name="top-nav"
                  value="hide"
                  type="radio"
                  onChange={() => {
                    setShowGalleriesSubNavMenu(false)
                    setShowSessionsSubNavMenu(false)
                  }}
                />
              </SubNavOverlay>
              <StyledSubNavGalleries>
                {galleries.map((gallery) => (
                  <li key={gallery.id}>
                    <SubNavMenuItem to={`/galleries/${gallery.id}`}>
                      {gallery.title}
                    </SubNavMenuItem>
                  </li>
                ))}
              </StyledSubNavGalleries>
            </SubNavControlLabel>
          </li>
          <li>
            <SubNavControlLabel>
              <TopNavControl
                name="top-nav"
                value="sessions"
                type="radio"
                checked={showSessionsSubNavMenu}
                onChange={() => {
                  setShowGalleriesSubNavMenu(false)
                  setShowSessionsSubNavMenu(true)
                }}
              />
              <TopNavMenuItem>sessions</TopNavMenuItem>
              <SubNavOverlay>
                <TopNavControl
                  name="top-nav"
                  value="hide"
                  type="radio"
                  onChange={() => {
                    setShowGalleriesSubNavMenu(false)
                    setShowSessionsSubNavMenu(false)
                  }}
                />
              </SubNavOverlay>
              <StyledSubNavSessions>
                <li>
                  <SubNavMenuItem to="/sessions/dogs">dogs</SubNavMenuItem>
                </li>
                <li>
                  <SubNavMenuItem to="/sessions/cats">cats</SubNavMenuItem>
                </li>
                <li>
                  <SubNavMenuItem to="/sessions/horses">horses</SubNavMenuItem>
                </li>
                <li>
                  <SubNavMenuItem to="/sessions/twilight">
                    twilight
                  </SubNavMenuItem>
                </li>
              </StyledSubNavSessions>
            </SubNavControlLabel>
          </li>
          <li>
            <TopNavMenuItem to="/links">links</TopNavMenuItem>
          </li>
          <li>
            <TopNavMenuItem to="/contact">contact us</TopNavMenuItem>
          </li>
        </ul>
      </StyledTopNav>
    </TopNavControlLabel>
  )
}

export default TopNav
