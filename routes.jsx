import About from './components/About'
import Contact from './components/Contact'
import Home from './components/Home'
import Main from './components/Main'

import GalleryIndex from './components/galleries/Index'
import DogsGallery from './components/galleries/DogsGallery'
import HorsesGallery from './components/galleries/HorsesGallery'
import PeopleGallery from './components/galleries/PeopleGallery'
import TwilightGallery from './components/galleries/TwilightGallery'

// TODO: migrate to react-router 1.0
// export default {
//   component: Main,
//   childRoutes: [
//     {name: 'add-game', path: '/add-game/:teamId', component: AddGame},
//     {name: 'home', path: '/', component: Home},
//     {path: 'login', component: Login},
//     {path: 'logout', component: Logout},
//     {path: 'register', component: Register},
//     {name: 'schedule', path: 'schedule/:teamId', component: Schedule},
//   ],
// }

import React from 'react'
import {
  DefaultRoute,
  Redirect,
  Route,
} from 'react-router'

const inBrowser = ('document' in global)

export default (
  <Route handler={Main}>
    <DefaultRoute name="home" handler={Home} />
    <Route name="about" handler={About} />
    <Route name="contact" handler={Contact} />
    {/* TODO: gallery index */}
    {/*<Route name="galleries" handler={GalleryIndex} />*/}
    {inBrowser && <Redirect from="galleries" to="dogs" />}
    <Route name="galleries">
      <Route path="dogs" handler={DogsGallery} />
      <Route path="horses" handler={HorsesGallery} />
      <Route path="people" handler={PeopleGallery} />
      <Route path="twilight" handler={TwilightGallery} />
      {inBrowser && <Redirect to="dogs" />}
    </Route>
  </Route>
)
