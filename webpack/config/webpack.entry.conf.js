var glob = require('glob');
var path = require("path");
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function getfiles(){
    var obj = {};
    var files = glob.sync('src/views/**/*.html');
    files.forEach(function(v){
       var nodeStart = v.lastIndexOf('/');
       var nodeEnd = v.lastIndexOf('.');
       var key = v.substring(nodeStart+1, nodeEnd);
       var value = './' + v;
       obj[key] = value;
    })
    return obj;
}

var htmls = getfiles();


var entries = {};
var HtmlPlugin = [];
for (var key in htmls) {
    var tempkey = '/'+ key + '/' + key;
    entries[key] = htmls[key].replace('.html','.scss');
    HtmlPlugin.push(new HtmlWebpackPlugin({
      filename: key+'.html',
      template: htmls[key],
      inject: true
    }))
}

exports.entries = entries;