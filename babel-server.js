var PROD = (process.env.NODE_ENV === 'production')
if (PROD) require('newrelic')

require('babel/register')

require('./server')
