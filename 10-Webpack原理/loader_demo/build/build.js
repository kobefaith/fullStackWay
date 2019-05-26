
const webpack = require('webpack')
const webpackConfig = require('../webpack.config.js')
const compiler = webpack(webpackConfig, (err, stats) => {

}) 
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


