const path = require('path');
const nodeModules = require('webpack-node-externals');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: [
    './src/bootstrap.ts'
  ],
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['ts-loader'],
        include: path.resolve(__dirname, "src"),
      },
      {
        test: /\.spec.ts$/,
        loaders: ['ts-loader'],
        include: path.resolve(__dirname, "test"),
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{from:'./src/workers', to: path.resolve(__dirname, 'dist/workers')}]),
    new CleanWebpackPlugin(['dist'], { root : __dirname})
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: [nodeModules()]
};