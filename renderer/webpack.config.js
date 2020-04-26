const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './renderer/src/index.tsx',
  target: 'electron-renderer',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, '../dist/renderer'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './renderer/src/index.html'
    })
  ],
  resolve: {
    extensions: [ '.desktop.tsx', '.desktop.ts', '.desktop.js', '.desktop.jsx' , '.tsx', '.ts', '.js', 'jsx' ],
    
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [
          /renderer\/src/,
        ],
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
           presets: [
            "@babel/preset-env",
            '@babel/react'
          ],
          plugins: [
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-proposal-class-properties"
          ]
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      }
    ]
  }
};