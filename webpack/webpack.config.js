
var webpack = require('webpack');
var merge = require('webpack-merge');
var webpackConfig = require('./config/webpack.config.conf');
var entry = require('./config/webpack.entry.conf');

webpackConfig = merge(webpackConfig, {
   entry: entry.entries,
   // plugins: [
   //    new webpack.optimize.UglifyJsPlugin({
   //        compress: {
   //          warnings: false
   //        }
   //    }),
   //    new OptimizeCSSPlugin()
   // ]
})

module.exports = webpackConfig;



