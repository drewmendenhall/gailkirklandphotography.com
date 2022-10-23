import { createElement } from 'react'
import { useRouter } from 'next/router'

import type { GetStaticPaths, GetStaticProps } from 'next'

import SessionInfo from '../../components/pages/SessionInfo'
import CatSessionsInfo from '../../components/pages/sessions/CatSessionsInfo'
import DogSessionsInfo from '../../components/pages/sessions/DogSessionsInfo'
import HorseSessionsInfo from '../../components/pages/sessions/HorseSessionsInfo'
import TwilightSessionsInfo from '../../components/pages/sessions/TwilightSessionsInfo'

const componentMap = {
  cats: CatSessionsInfo,
  dogs: DogSessionsInfo,
  horse: HorseSessionsInfo,
  twilight: TwilightSessionsInfo,
} as const

const SessionPage = () => {
  const router = useRouter()
  const { sessionId } = router.query

  return createElement(componentMap[sessionId as keyof typeof componentMap] || SessionInfo)
}

export const getStaticPaths: GetStaticPaths = () => ({
  fallback: false,
  paths: Object.keys(componentMap).map(name => `/sessions/${name}`),
})
export const getStaticProps: GetStaticProps = () => ({props: {}})

export default SessionPage
