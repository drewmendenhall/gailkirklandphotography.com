module.exports = {
  extends: '../.babelrc.js',

  env: {
    production: {
      plugins: [
        '@babel/transform-react-constant-elements',
        '@babel/transform-react-inline-elements',
      ],
    },
  },
  plugins: [
    ['@babel/proposal-class-properties', {loose: true}],
  ],
  presets: [
    '@babel/react',
  ],
}
