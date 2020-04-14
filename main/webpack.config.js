const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './main/src/index.tsx',
  target: 'electron-main',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, '../dist/main/'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};