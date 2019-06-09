import registerTask from './registerTask'
import webpackConfig from '../../webpack.config.production.babel'

export default registerTask({
  name: 'client',

  dest: {
    filename: 'app.js',
    path: 'public',
  },
  source: {
    file: 'client/index.js',
    pattern: [
      '.babelrc.js',
      '.env',
      'client/**',
      'components/.babelrc.js',
      'components/**',
      'package.json',
      'webpack.config.babel.js',
      'webpack.config.production.babel.js',
      __filename,
    ],
  },
  webpackConfig,
})
