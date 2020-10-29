const dotenv = require("dotenv");
dotenv.config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ["@babel/polyfill", "./src/frontend/index.js"],
  output: {
    path: path.resolve('./'),
    filename: './public/bundle.js'
  },
  devServer: {
    inline: true,
    historyApiFallback: true,
    host: '192.168.11.67',
    port: 3000,
    hot: true,
    proxy: {
      '/api': {
        target: 'https://inftechsol.hu',
        secure: false
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