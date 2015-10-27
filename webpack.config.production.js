import webpack from 'webpack'

import config from './webpack.config'

export default (
  Object.assign({}, config, {
    plugins: (config.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),

      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
    ]),
  })
)
