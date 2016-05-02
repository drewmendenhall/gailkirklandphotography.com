import dotenv from 'dotenv-safe'

dotenv.config({
  allowEmptyValues: true,
  silent: true,
})

export default {
  analytics: process.env.ANALYTICS && {
    segmentWriteKey: process.env.SEGMENT_WRITE_KEY,
  },
  server: {
    base: process.env.SERVER_BASE || `${__dirname}/public`,
    hostname: process.env.SERVER_HOST || '0.0.0.0',
    port: process.env.SERVER_PORT || 8000,
    protocol: process.env.SERVER_PROTOCOL || 'http',
  },
  serverSideRendering: process.env.SERVER_SIDE_RENDERING,
}
