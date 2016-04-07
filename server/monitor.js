import {exec} from 'child_process'
import fs from 'fs'
import path from 'path'
import timestamp from 'time-stamp'

fs.watch(path.resolve(__dirname, '../package.json'), restartServer)
fs.watch(path.resolve(__dirname, 'server.js'), restartServer)

function restartServer() {
  console.log(`${timestamp('[YYYY/MM/DD HH:mm:ss.ms]')} restarting server`)

  exec('npm prune && npm install', (error, stdout, stderr) => {
    if (error) throw error

    console.log(stdout)
    console.error(stderr)

    exec('npm run serve:prod:www:stop && npm run serve:prod:www')
  })
}
