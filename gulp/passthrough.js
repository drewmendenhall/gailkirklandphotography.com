import {Transform} from 'stream'

export default () =>
  new Transform({
    objectMode: true,
    transform: (file, encoding, callback) => callback(null, file),
  })
