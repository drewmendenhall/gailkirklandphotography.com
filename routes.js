import About from './components/pages/About'
import Contact from './components/pages/Contact'
import Home from './components/pages/Home'
import Copyright from './components/pages/Copyright'
import Links from './components/pages/Links'
import Main from './components/Main'

import Gallery from './components/Gallery'

import SessionInfo from './components/pages/SessionInfo'
import CatSessionsInfo from './components/pages/sessions/CatSessionsInfo'
import DogSessionsInfo from './components/pages/sessions/DogSessionsInfo'
import HorseSessionsInfo from './components/pages/sessions/HorseSessionsInfo'
import TwilightSessionsInfo from './components/pages/sessions/TwilightSessionsInfo'

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
      onEnter(nextState, replace) {
        const gallery = galleries[nextState.params.galleryId]

        if (!gallery) {
          replace({pathname: `/galleries/${defaultGalleryId}`})
        }
      },
    },
    {path: 'copyright', component: Copyright},
    {path: 'links', component: Links},
    {path: 'sessions', component: SessionInfo},
    {path: 'sessions', childRoutes: [
      {path: 'cats', component: CatSessionsInfo},
      {path: 'dogs', component: DogSessionsInfo},
      {path: 'horses', component: HorseSessionsInfo},
      {path: 'twilight', component: TwilightSessionsInfo},
      {
        path: '*',
        onEnter(nextState, replace) {
          replace({pathname: '/sessions'})
        },
      },
    ]},
  ],
})
