const __DEV__ = process.env.NODE_ENV !== 'production'

module.exports = {
  extends: '../.babelrc.js',

  plugins: [
    'babel-plugin-styled-components',
    ...(__DEV__
      ? ['react-hot-loader/babel']
      : [
          '@babel/transform-react-constant-elements',
          '@babel/transform-react-inline-elements',
        ]),
  ],
  presets: [['@babel/react', {development: __DEV__}]],
}
