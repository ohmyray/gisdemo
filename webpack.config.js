const path = require('path')

const webpackBar = require('webpackbar')

const logLoader = path.resolve(__dirname, 'loaders');

module.exports = {
  entry: './src/config.ts',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // libraryTarget: 'commonjs'
    libraryTarget: 'umd',
  },

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [ 'ts-loader','loader-log'],
        // use: ['loader-log', 'ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.ts'],
  },

  resolveLoader: {
    modules: [logLoader, 'node_modules'],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  plugins: [
    // new webpackBar()
  ],

  performance: {
    // hints: false
    // hints: 'error'
    hints: 'warning',
  },
}
