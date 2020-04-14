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
    new HtmlWebpackPlugin({
      template: './renderer/src/index.html'
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: [
          /\.tsx$/,
          /\.ts$/
        ],
        include: [
          /renderer\/src/,
          /node_modules\/@weconnect\/appkit/
        ],
        loader: 'ts-loader',
        options: { allowTsInNodeModules: true }

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