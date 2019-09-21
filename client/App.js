import {hot} from 'react-hot-loader/root'
import {renderRoutes} from 'react-router-config'

import routes from '../routes'

const App = () => renderRoutes(routes)

export default hot(App)
