  var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
 module.exports = {
     entry: {
         main: process.cwd()+'/code/main.js',
         main1: process.cwd()+'/code/main1.js',         
         vue:["vue"]
     },
     output: {
         path: process.cwd() + '/dist',
         filename: '[name].js'
     },
     plugins: [
         new CommonsChunkPlugin({
             name: ["common","vue","load"],
             minChunks:2
         })
     ]
 };

