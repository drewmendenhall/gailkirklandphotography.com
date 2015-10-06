import About from './components/About'
import Contact from './components/Contact'
import Home from './components/Home'
import Links from './components/Links'
import Main from './components/Main'

import Gallery from './components/Gallery'

import SessionInfo from './components/SessionInfo'
import CatSessionsInfo from './components/sessions/CatSessionsInfo'
import DogSessionsInfo from './components/sessions/DogSessionsInfo'
import HorseSessionsInfo from './components/sessions/HorseSessionsInfo'
import TwilightSessionsInfo from './components/sessions/TwilightSessionsInfo'

import galleries from './public/galleries.json'

const defaultGalleryId = Object.keys(galleries)[0]

export default ({
  path: '/',
  component: Main,
  indexRoute: {component: Home},
  childRoutes: [
    {path: 'about', component: About},
    {path: 'contact', component: Contact},
    {path: 'galleries', childRoutes: [
      {path: ':galleryId(/:pictureId)', component: Gallery},
    ],
      onEnter(nextState, replaceState) {
        const gallery = galleries[nextState.params.galleryId]

        if (!gallery) {
          replaceState(null, `/galleries/${defaultGalleryId}`)
        }
      },
    },
    {path: 'links', component: Links},
    {path: 'sessions', component: SessionInfo},
    {path: 'sessions', childRoutes: [
      {path: 'cats', component: CatSessionsInfo},
      {path: 'dogs', component: DogSessionsInfo},
      {path: 'horses', component: HorseSessionsInfo},
      {path: 'twilight', component: TwilightSessionsInfo},
      {
        path: '*',
        onEnter(nextState, replaceState) {
          replaceState(null, '/sessions')
        },
      },
    ]},
  ],
})
