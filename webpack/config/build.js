process.env.NODE_ENV = 'production'

var ora = require('ora');
var rm = require('rimraf');
var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var merge = require('webpack-merge');
var config = require('./webpack.base.conf');
var webpackConfig = require('./webpack.config.conf');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var entry = require('./webpack.entry.conf');
var webpackDevServer = require('webpack-dev-server');

webpackConfig = merge(webpackConfig, {
   entry: entry.entries,
   plugins: [
      new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
      }),
      new OptimizeCSSPlugin()
   ]
})

var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
  })
})