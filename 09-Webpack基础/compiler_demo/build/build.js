
const webpack = require('webpack')
const webpackConfig = require('../webpack.config.js')

// default port where dev server listens for incoming traffic

const compiler = webpack(webpackConfig, (err, stats) => {
  console.log('compilation:   ',stats.compilation.hooks) 
}) 
//console.log('compiler:', compiler)


/* compiler.run((err, stats) => {
  
}) */


