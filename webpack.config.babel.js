import webpack from 'webpack'

export default ({
  entry: {
    app: './client',
    vendor: [
      'babel-polyfill',
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
    preLoaders: [
      {test: /\.jsx?$/, loader: 'eslint'},
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
        },
      },
      {test: /\.json$/, loader: 'json'},
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
    new webpack.DefinePlugin({
      'PROD': JSON.stringify(process.env.NODE_ENV === 'production'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
})
