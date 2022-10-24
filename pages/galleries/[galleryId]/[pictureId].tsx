import React from 'react'

import {useRouter} from 'next/router'

import type {GetStaticPaths, GetStaticProps} from 'next'

import Gallery from '../../../components/Gallery'
import galleries from '../../../public/galleries.json'

const GalleryPage = () => {
  const router = useRouter()

  const {galleryId, pictureId} = router.query

  return (
    <Gallery galleryId={galleryId} pictureId={pictureId as string} />
  )
}

export const getStaticPaths: GetStaticPaths = () => ({
  fallback: false,
  paths: Object.entries(galleries).flatMap(([name, gallery]) => (
    gallery.pictures.map((picture) => `/galleries/${name}/${picture.id}`)
  )),
})
export const getStaticProps: GetStaticProps = () => ({props: {}})

export default GalleryPage
