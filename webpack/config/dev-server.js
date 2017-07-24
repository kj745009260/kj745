var config = require('./webpack.base.conf');
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var merge = require('webpack-merge');
var webpackConfig = require('./webpack.config.conf');

webpackConfig = merge(webpackConfig, {
   entry: config.dev.entry,
   plugins: config.dev.plugins
})

var port = process.env.PORT || config.dev.port;
var autoOpenBrowser = !!config.dev.autoOpenBrowser;

var app = express();

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

app.use(devMiddleware)
app.use(hotMiddleware)

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})