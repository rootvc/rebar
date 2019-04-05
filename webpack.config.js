const path = require('path');
const webpack = require("webpack");

module.exports = [{
  mode: 'production',
  entry: ['./src/stylesheets/app.scss',
          './src/app.jsx'
         ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
    resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              path: path.resolve(__dirname, 'src'),
              name: 'bundle.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules']
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/env'],
          plugins: ['@babel/transform-object-assign']
        },
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        query: {
          presets: ['@babel/env', '@babel/react'],
        },
      },
    ]
  },
}];

