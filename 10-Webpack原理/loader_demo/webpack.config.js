
const path = require('path');
module.exports = { 
  // 项目入口
  entry: {
    bundle: process.cwd()+"/src/index.js",
    text:process.cwd()+"/src/hello.txt"
  },
  // 项目出口
  output: {
    path: process.cwd() + '/dist',
    filename: '[name].js', 
  }, 
  module:{
    rules:[
     {
        test: /\.txt$/,
        use: {
          loader: path.resolve(__dirname, './build/changeLoader.js'),
          options: {
            name: 'Alice'
          }   
        }             
      }]
  }
}