require('babel-register')

var PROD = (process.env.NODE_ENV === 'production')
if (PROD) require('newrelic')

require('./server')
