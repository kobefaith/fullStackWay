
const webpack = require('webpack')
const webpackConfig = require('../webpack.config.js')

// default port where dev server listens for incoming traffic

const compiler = webpack(webpackConfig, (err, stats) => {
 /*  console.log('compilation:   ',stats.compilation.hooks)  */
}) 
//console.log('compiler:', compiler)


compiler.run((err, stats) => { 
  if(stats.hasErrors()){
      console.log(stats.compilation.errors,true);
  }
  const warnings =stats.warnings && stats.warnings.length==0;
  if(stats.hasWarnings()){
      console.log(stats.compilation.warnings);
  }
  console.log("Compilation finished!\n");
    
}) 


