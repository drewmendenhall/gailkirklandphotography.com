import {exec} from 'child_process'
import bodyParser from 'body-parser'
import express from 'express'
import url from 'url'

import config from '../config'

config.monitor = Object.assign({
  port: 8001,
  protocol: 'http',
}, config.monitor || {})

const server = express()

server.use('/trigger-update', bodyParser.json(), (request, response) => {
  const {body} = request

  if (!body
    || body.build_name !== 'deploy'
    || body.build_status !== 'success'
  ) {
    response.send('not updated')
    return
  }
  exec(`
    git fetch &&
    git checkout master -f &&
    git reset --hard origin
  `, (error) => {
    if (error) throw error

    exec('npm prune && npm install', (error) => {
      if (error) throw error

      response.send()
      exec('npm run serve:prod:stop && npm run serve:prod:www')
    })
  })
})

server.listen(config.monitor.port, config.monitor.hostname, () => {
  console.log(`Express started at ${url.format(
    Object.assign({hostname: 'localhost'}, config.monitor)
  )}`)
})
