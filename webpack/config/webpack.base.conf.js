var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    build: {
        env: {NODE_ENV: '"production"'},
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/'
    },
    dev: {
        env: { NODE_ENV: '"development"'},
        entry: { index: './src/views/index/index.scss' },
        plugins: [
           new HtmlWebpackPlugin({
              filename: 'index.html',
              template: './src/views/index/index.html',
              inject: true
            })
        ],
        port: 8080,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/'
    }
}