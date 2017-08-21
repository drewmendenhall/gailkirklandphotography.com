import webpack from 'webpack'

import config from './webpack.config.babel'

export default ({
  ...config,
  plugins: [
    ...(config.plugins || []),
    new webpack.optimize.UglifyJsPlugin(),
  ],
})
