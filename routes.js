import About from './components/About'
import Contact from './components/Contact'
import Home from './components/Home'
import Links from './components/Links'
import Main from './components/Main'

import GalleryIndex from './components/galleries/Index'
import CatsGallery from './components/galleries/CatsGallery'
import DogsGallery from './components/galleries/DogsGallery'
import HorsesGallery from './components/galleries/HorsesGallery'
import PeopleGallery from './components/galleries/PeopleGallery'
import TwilightGallery from './components/galleries/TwilightGallery'

import SessionInfo from './components/SessionInfo'
import CatSessionsInfo from './components/sessions/CatSessionsInfo'
import DogSessionsInfo from './components/sessions/DogSessionsInfo'
import HorseSessionsInfo from './components/sessions/HorseSessionsInfo'
import TwilightSessionsInfo from './components/sessions/TwilightSessionsInfo'

export default ({
  path: '/',
  component: Main,
  indexRoute: {component: Home},
  childRoutes: [
    {path: 'about', component: About},
    {path: 'contact', component: Contact},
    {path: 'galleries', childRoutes: [
      {path: 'cats', component: CatsGallery},
      {path: 'dogs', component: DogsGallery},
      {path: 'horses', component: HorsesGallery},
      {path: 'people', component: PeopleGallery},
      {path: 'twilight', component: TwilightGallery},
      {
        path: '*',
        onEnter(nextState, replaceState) {
          replaceState(null, '/galleries/dogs')
        },
      },
    ],
      onEnter(nextState, replaceState) {
        if (nextState.location.pathname === '/galleries') {
          replaceState(null, '/galleries/dogs')
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
