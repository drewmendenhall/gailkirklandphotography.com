const COMMONJS = (!process.env.WEBPACK_VERSION ||
  /^1\./.test(process.env.WEBPACK_VERSION)
)

module.exports = {
  plugins: [
    'dev',
    '@babel/proposal-object-rest-spread',
    '@babel/transform-runtime',
  ].concat(COMMONJS
    ? '@babel/transform-modules-commonjs'
    : []
  )
}
