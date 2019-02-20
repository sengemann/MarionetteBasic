'use strict';

const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');

const webpackCommon = {
  entry: {
    app: ['./app/initialize']
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }, {
        test: /\.jst$/,
        use: {
          loader: 'underscore-template-loader'
        }
      }, {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader'},
          { loader: 'less-loader', options: {
            sourceMaps: true
          }
        }]
      }, {
        test: /\.css$/,
        use: {
          loader: 'css-loader'
        }
      }
    ]
  },
  output: {
    filename: 'app.js',
    path: path.join(__dirname, './dist'),
    publicPath: '/'
  },
  plugins: [
    new CopyPlugin([
      { from: './app/assets/index.html', to: './index.html' },
      { from: './app/assets/favicon.ico', to: './favicon.ico' }
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'underscore'
    })
  ],
  resolve: {
    modules: [
      path.join(__dirname, './node_modules'),
      path.join(__dirname, './app')
    ]
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, './node_modules')
    ]
  }
};

switch (process.env.npm_lifecycle_event) {
  case 'start':
  case 'dev':
    module.exports = merge(webpackCommon, {
      mode: 'development',
      devtool: '#inline-source-map',
      devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
      }
    });
    break;
  default:
    module.exports = merge(webpackCommon, {
      performance: {
        hints: false
      },
      mode: 'development',
      devtool: 'source-map'
    });
    break;
}
