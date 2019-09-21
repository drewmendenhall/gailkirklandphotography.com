const COMMONJS =
  !process.env.WEBPACK_VERSION || /^1\./.test(process.env.WEBPACK_VERSION)

module.exports = {
  plugins: [
    '@babel/proposal-object-rest-spread',
    '@babel/transform-runtime',
    ...(COMMONJS ? ['@babel/transform-modules-commonjs'] : []),
  ],
}
