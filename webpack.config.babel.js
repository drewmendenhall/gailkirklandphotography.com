import webpack from 'webpack'

export default ({
  entry: {
    app: './client',
    vendor: [
      'classnames',
      'react',
      'react-dom',
      'react-helmet',
      'react-router',
    ],
  },
  output: {
    path: `${__dirname}/public`,
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
    new webpack.DefinePlugin({
      '__DEV__': JSON.stringify(process.env.NODE_ENV !== 'production'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
})
