const path = require("path");
const target = process.env.NODE_ENV === 'development' ? 'web' : 'browserslist';

console.log(target, process.env.NODE_ENV)

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: "bundle.js",
    publicPath: "/"
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    watchContentBase: true,
    hot: true,
    host: "192.168.11.64",
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'https://192.168.11.64:3001',
        pathRewrite: { '^/api': ''},
        secure: false
      }
    },
    
  },
  target: target,
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
              sassOptions: {
                outputStyle: 'compressed'
              }
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|otf)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
        }
      }
      // { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader" },
      // { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader" }
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
      //   type: 'asset/resource',
      // },
    ],
  }
};
