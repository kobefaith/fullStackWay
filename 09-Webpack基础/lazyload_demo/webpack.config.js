
const HTMLWebpackPlugin = require('html-webpack-plugin');
 module.exports = {
     entry: {
         main: process.cwd()+'/code/main.js',        
     },
     output: {
       path: process.cwd() + '/dist',
       chunkFilename: '[name].bundle.js',
       filename: '[name].js'
     },
     plugins: [
         new HTMLWebpackPlugin({
           title: 'Code Splitting'
         }),         
     ]
 };

