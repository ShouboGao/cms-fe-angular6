const path = require('path'),
    webpack = require('webpack'),
    UglifyJSPlugin = require("uglifyjs-webpack-plugin"),
    config = require('./webpack.base.conf.js');

config.devServer = {
    port: '9100',
    host: 'localhost',
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        secure: false,
        changeOrigin: true,
      }
    }
}

module.exports = config;