const COMMONJS =
  !process.env.WEBPACK_VERSION || /^1\./.test(process.env.WEBPACK_VERSION)

module.exports = {
  plugins: [
    '@babel/transform-runtime',
    ...(COMMONJS ? ['@babel/transform-modules-commonjs'] : []),
  ],
}
