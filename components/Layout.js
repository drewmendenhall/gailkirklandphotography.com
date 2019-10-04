import React from 'react'

import styled from 'styled-components'
import {Helmet} from 'react-helmet-async'
import {Link} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'

import GlobalStyle from './GlobalStyle'
import TopNav from './TopNav'
import {gray} from './styled/colors'
import {logoHeight, logoPadding} from './styled/variables'

const title = 'Gail Kirkland Photography'

const contentFontSize = '1.25rem'
const headerBackground = gray

const Content = styled.section`
  padding: 10px;
  font-size: 1.25rem;
  flex: 1;
  overflow: auto;
  position: relative;
  font-size: ${contentFontSize};
  -webkit-overflow-scrolling: touch;
`
const Header = styled.header`
  background: ${headerBackground};
  display: flex;
  justify-content: space-between;
  ${'' /* support TopNav negative z-index */}
  z-index: 1;

  @media (min-width: 600px) {
    justify-content: flex-start;
    justify-content: initial;
    flex-flow: column;
  }
  @media (min-width: 1000px) {
    flex-flow: row;
    flex-flow: initial;
  }
`
const SubHeader = styled.div`
  background: #3a3a3a;

  @media (min-width: 600px) {
    text-align: center;
  }
  @media (min-width: 1000px) {
    text-align: left;
    text-align: initial;
  }
`
const Tagline = styled.span`
  font-size: 0.8rem;
  line-height: 2.5em;
  color: @tagline-color;
  padding-left: 1rem;
  @media (min-width: 600px) {
    font-size: 1rem;
    font-size: initial;
  }
`

const BrandLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b31474;
  font: bolder 'Century Gothic', sans-serif;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;

  padding: ${logoPadding}rem;
  padding-right: 0;
  @media (min-width: 600px) {
    padding: ${logoPadding}rem;
    padding-bottom: 0;
    width: 100%;
    font-size: 1.25rem;
  }
  @media (min-width: 1000px) {
    padding: 0 ${logoPadding}rem;
    width: auto;
  }

  img {
    height: ${logoHeight}rem;
  }
`
const CompanyName = styled.span`
  display: inline-block;
  padding-left: 0.5em;
`

const Layout = ({route}) => (
  <React.Fragment>
    <GlobalStyle />
    <Helmet
      link={[{rel: 'license', href: '/copyright'}]}
      meta={[
        {
          name: 'description',
          content: 'A picture says more than a thousand words...',
        },
        {name: 'viewport', content: 'width=device-width,initial-scale=1'},
      ]}
      defaultTitle={title}
      titleTemplate={`%s | ${title}`}
    />
    <Header>
      <BrandLink to="/">
        <img src="/images/logo-pink.svg" />
        <CompanyName>
          <div>Gail Kirkland</div>
          <div>
            <small>Photography</small>
          </div>
        </CompanyName>
      </BrandLink>
      <TopNav />
    </Header>
    <SubHeader>
      <Tagline>A picture says more than a thousand words...</Tagline>
      {/*
      <Link to="/contact" className="book-session-button button-primary">
      Book a Session
      </Link>
      */}
    </SubHeader>
    <Content>{renderRoutes(route.routes)}</Content>
    <footer>
      <div>
        <Link to="/copyright" className="copyright" rel="license">
          © Gail Kirkland Photography {new Date().getFullYear()}. All rights
          reserved.
        </Link>
      </div>
    </footer>
  </React.Fragment>
)

export default Layout
