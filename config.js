import dotenv from 'dotenv-safe'

dotenv.config({allowEmptyValues: true})

export default {
  server: {
    base: process.env.SERVER_BASE || `${__dirname}/public`,
    port: process.env.SERVER_PORT || 8000,
    protocol: process.env.SERVER_PROTOCOL || 'http',
  },
}
