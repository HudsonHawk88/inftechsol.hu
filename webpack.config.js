const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ["@babel/polyfill", "./src/app/index.js"],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  devServer: {
    inline: true,
    historyApiFallback: true,
    host: '192.168.11.67',
    port: 3000,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://192.168.11.67:3001',
        pathRewrite: {'^/api' : ''}
      }
    }
  },
  resolve: {
    alias: {
        "crypto": false
    }
  },
  module: {
    rules: [
      {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', "@babel/preset-react"]
        }
      }
    },
    {
        test: /\.css$/,
        loader: 'css-loader'
    },
    {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
    }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};