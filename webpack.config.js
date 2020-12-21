const path = require('path');
module.exports = {
  entry: './src/config.ts',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // libraryTarget: 'commonjs'
    libraryTarget: 'umd'
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "src")
    },
    extensions: ['.ts']
  }
}
