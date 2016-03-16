import {exec} from 'child_process'

export default () => (request, response) => {
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
      exec('npm run serve:prod:restart')
    })
  })
}
