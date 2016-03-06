import webpack from 'webpack'

import config from './webpack.config.babel'

export default ({
  ...config,
    plugins: [
      ...(config.plugins || []),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),

      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
    ],
})
