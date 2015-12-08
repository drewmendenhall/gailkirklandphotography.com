import {exec} from 'child_process'

export default () => (request, response) => {
  exec(`
    git fetch &&
    git checkout master -f &&
    git reset --hard origin
  `, (error) => {
    if (error) throw error

    exec('npm install', (error) => {
      if (error) throw error

      response.send()
      exec('npm run serve:prod:restart')
    })
  })
}
