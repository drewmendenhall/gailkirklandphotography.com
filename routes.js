import About from './components/pages/About'
import Contact from './components/pages/Contact'
import Home from './components/pages/Home'
import Copyright from './components/pages/Copyright'
import Links from './components/pages/Links'
import Layout from './components/Layout'

import Gallery from './components/Gallery'

import SessionInfo from './components/pages/SessionInfo'
import CatSessionsInfo from './components/pages/sessions/CatSessionsInfo'
import DogSessionsInfo from './components/pages/sessions/DogSessionsInfo'
import HorseSessionsInfo from './components/pages/sessions/HorseSessionsInfo'
import TwilightSessionsInfo from './components/pages/sessions/TwilightSessionsInfo'

export default [
  {
    component: Layout,
    routes: [
      {path: '/', exact: true, component: Home},
      {path: '/about', component: About},
      {path: '/contact', component: Contact},
      {path: '/galleries/:galleryId/:pictureId?', component: Gallery},
      {path: '/copyright', component: Copyright},
      {path: '/links', component: Links},
      {path: '/sessions', exact: true, component: SessionInfo},
      {path: '/sessions/cats', component: CatSessionsInfo},
      {path: '/sessions/dogs', component: DogSessionsInfo},
      {path: '/sessions/horses', component: HorseSessionsInfo},
      {path: '/sessions/twilight', component: TwilightSessionsInfo},
    ],
  },
]
