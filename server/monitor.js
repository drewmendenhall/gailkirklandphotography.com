import {exec} from 'child_process'
import chokidar from 'chokidar'
import timestamp from 'time-stamp'

chokidar.watch([
  '../package.json',
  'server.js',
]).on('change', function restartServer() {
  console.log(`${timestamp('[YYYY/MM/DD HH:mm:ss.ms]')} restarting server`)

  exec('npm prune && npm install', (error, stdout, stderr) => {
    if (error) throw error

    console.log(stdout)
    console.error(stderr)

    exec('npm run serve:prod:www:stop && npm run serve:prod:www')
  })
})
