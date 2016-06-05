import registerTask from './registerTask'
import webpackConfig from '../../webpack.config.server.production.babel'

export default registerTask({
  name: 'server',

  dest: {
    filename: 'server.js',
    path: 'dist',
  },
  source: {
    file: 'server/index.js',
    pattern: [
      '.babelrc',
      '.env',
      'components/.babelrc',
      'components/**',
      'server/.babelrc',
      'server/**',
      'webpack.config.babel.js',
      'webpack.config.production.babel.js',
      'webpack.config.server.production.babel.js',
      __filename,
    ],
  },
  webpackConfig,
})
