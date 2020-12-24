const path = require('path')

const webpackBar = require('webpackbar')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const logLoader = path.resolve(__dirname, 'loaders')

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
        oneOf: [
          {
            test: /\.tsx?$/,
            include: path.resolve(__dirname, 'src'),
            use: [
              // { loader: 'thread-loader', options: { workers: 2 } },
              // 'cache-loader',
              'ts-loader',
              // {loader: 'ts-loader', options: {
              //   cacheDirectory:true
              // }},
              'loader-log',
            ],
            // use: ['loader-log', 'ts-loader'],
            // exclude: /node_modules/,
          },
        ],
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
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin()
    ]
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
