import {exec} from 'child_process'
import fs from 'fs'
import path from 'path'

fs.watch(path.resolve(__dirname, '../package.json'), restartServer)
fs.watch(path.resolve(__dirname, 'server.js'), restartServer)

function restartServer() {
  exec('npm prune && npm install', (error) => {
    if (error) throw error

    exec('npm run serve:prod:stop && npm run serve:prod:www')
  })
}
