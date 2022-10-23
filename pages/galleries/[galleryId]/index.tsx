import React from 'react'

import type { GetStaticPaths, GetStaticProps } from 'next'

import { useRouter } from 'next/router'

import Gallery from '../../../components/Gallery'
import galleries from '../../../public/galleries.json'

const GalleryPage = () => {
  const router = useRouter()

  const {galleryId} = router.query

  return (
    <Gallery galleryId={galleryId} />
  )
}

export const getStaticPaths: GetStaticPaths = () => ({
  fallback: false,
  paths: Object.keys(galleries).map(name => `/galleries/${name}`),
})
export const getStaticProps: GetStaticProps = () => ({props: {}})

export default GalleryPage
