var webpack = require('webpack')
var webpack = require('webpack')
var webpack = require('webpack')
var webpack = require('webpack')
var webpack = require('webpack')
var webpack = require('webpack')
var webpack = require('webpack')
var webpack = require('webpack')
var webpack = require('webpack')
var path = require('path')
module.exports = function(release) {
  var reactCompatRE = /.+?\/node_modules\/react-draggable\/.+$/
  var noBabelRE = /.+?\/node_modules\/flummox\/.+$/
  return {
    entry: './src/entry.js'
   ,output: {
      path: '.'
     ,filename: 'bundle.js'
    }
   ,plugins: release ? [
      new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'})
     ,new webpack.optimize.DedupePlugin()
     ,new webpack.optimize.UglifyJsPlugin()
     ,new webpack.optimize.OccurenceOrderPlugin()
     ,new webpack.optimize.AggressiveMergingPlugin()
   ] : []
   ,devtool: release ? undefined : "inline-source-map"
   ,module: { 
      loaders: [ 
        { test: /\.less.*/, loader: 'style!css!less' }
       ,{ test: /\.jsx?$/,  loader: 'babel-loader?optional=runtime&cacheDirectory&optional=reactCompat&stage=0'}
       ,{ test: /\.woff.*/, loader: 'url-loader?mimetype=application/x-font-woff' }
       ,{ test: /\.eot.*/,  loader: 'url-loader?mimetype=application/x-font-eot' }
       ,{ test: /\.ttf.*/,  loader: 'url-loader?mimetype=application/x-font-ttf' }
       ,{ test: /\.png.*/,  loader: 'url-loader?mimetype=image/png' }
       ,{ test: /\.svg.*/,  loader: 'url-loader?mimetype=image/svg' }
      ]
    }
    // A workaround for webpack + npm link
    ,resolve: { fallback: path.join(__dirname, "node_modules") }
    ,resolveLoader: { fallback: path.join(__dirname, "node_modules") }
  }
}
