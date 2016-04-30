require('dotenv').config({
  allowEmptyValues: true,
  silent: true,
})

require('babel-register')

require('./gulp/images')
require('./gulp/scripts/client')
require('./gulp/scripts/server')
require('./gulp/styles')
