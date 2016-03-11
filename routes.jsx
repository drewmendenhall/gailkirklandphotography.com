import About from './components/About'
import Contact from './components/Contact'
import Home from './components/Home'
import Main from './components/Main'

import Dogs from './components/galleries/Dogs'
import Horses from './components/galleries/Horses'
import People from './components/galleries/People'
import Twilight from './components/galleries/Twilight'

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
import {DefaultRoute, Route} from 'react-router'

export default (
  <Route handler={Main}>
    <DefaultRoute name="home" handler={Home} />
    <Route name="about" handler={About} />
    <Route name="contact" handler={Contact} />
    <Route name="galleries">
      <Route name="cats" handler={Home} />
      <Route name="dogs" handler={Dogs} />
      <Route name="horses" handler={Horses} />
      <Route name="people" handler={People} />
      <Route name="twilight" handler={Twilight} />
    </Route>
  </Route>
)
