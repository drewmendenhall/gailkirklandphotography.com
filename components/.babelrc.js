const __DEV__ = process.env.NODE_ENV !== 'production'

module.exports = {
  extends: '../.babelrc.js',

  plugins: [
    ['@babel/proposal-class-properties', {loose: true}],
    ...(__DEV__ ? [] : [
      '@babel/transform-react-constant-elements',
      '@babel/transform-react-inline-elements',
    ]),
  ],
  presets: [
    ['@babel/react', {development: __DEV__}],
  ],
}
