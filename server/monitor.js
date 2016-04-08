import {exec} from 'child_process'
import chokidar from 'chokidar'
import path from 'path'
import timestamp from 'time-stamp'

const log = (...messages) => {
  console.log.apply(console, [
    timestamp('[YYYY/MM/DD HH:mm:ss.ms]'),
  ].concat(messages))
}
const serverPath = path.resolve(__dirname, 'server.js')

chokidar.watch([
  path.resolve(__dirname, '../package.json'),
  serverPath,
]).on('change', (path) => {
  log(`${path} changed`)

  if (path === serverPath) {
    restartServer()
  } else {
    exec('npm prune && npm install', (error, stdout, stderr) => {
      if (error) throw error

      console.log(stdout)
      console.error(stderr)

      restartServer()
    })
  }
})

function restartServer() {
  log('restarting server')

  exec('npm run serve:prod:www:stop && npm run serve:prod:www', (error, stdout, stderr) => {
    if (error) throw error

    console.log(stdout)
    console.error(stderr)
  })
}

log('monitor started')
