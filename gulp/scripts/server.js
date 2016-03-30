import registerTask from './registerTask'
import webpackConfig from '../../webpack.config.server.production.babel'

const sourceFile = 'server.js'

export default registerTask({
  name: 'server',

  dest: {
    filename: sourceFile,
    path: 'dist',
  },
  source: {
    file: sourceFile,
    pattern: [
      'server/**',
      __filename,
      sourceFile,
    ],
  },
  webpackConfig,
})
