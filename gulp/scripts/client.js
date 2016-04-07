import registerTask from './registerTask'
import webpackConfig from '../../webpack.config.production.babel'

const sourceFile = 'client.js'

export default registerTask({
  name: 'client',

  dest: {
    filename: 'app.js',
    path: 'public',
  },
  source: {
    file: sourceFile,
    pattern: [
      '.babelrc',
      '.env',
      'components/.babelrc',
      'components/**',
      'package.json',
      'webpack.config.babel.js',
      'webpack.config.production.babel.js',
      __filename,
      sourceFile,
    ],
  },
  webpackConfig,
})
