import React from 'react'

import { StyleSheetManager } from 'styled-components'

import type { AppProps } from 'next/app'

import GlobalStyle from '../styles/GlobalStyle'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyleSheetManager disableVendorPrefixes>
      <Layout>
        <GlobalStyle />
        <Component {...pageProps} />
      </Layout>
    </StyleSheetManager>
  )
}

export default MyApp
