var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var output = require('./webpack.base.conf');


module.exports = {
    module:{
      rules:[
        {
            test: /\.scss$/,
            use:  ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader:'css-loader'
                    },
                    {
                        loader:'sass-loader'
                    }
                ]
            })
        },
        {
            test: /\.(png|jpg)$/,
            use: 'url-loader?limit=1&name=images/[name].[ext]'
        }
      ]
    },
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        alias: {
            views: path.resolve(__dirname,"src/views")
        },
        extensions: ['.js', '.css', '.scss', '.png', '.jpg']
    },
    output:{
        path: output.build.assetsRoot,
        publicPath: process.env.NODE_ENV  === 'production'? output.build.assetsPublicPath : output.dev.assetsPublicPath,
        filename: '[name].css'
    },
    plugins:  [
      new ExtractTextPlugin("[name].css"),
      new FriendlyErrorsPlugin()
    ]
}