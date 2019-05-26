const HelloWorldPlugin = require('./build/helloPlugin');

module.exports = { 
  // 项目入口
  entry: {
    bundle: process.cwd()+"/src/index.js",   
  },
  // 项目出口
  output: {
    path: process.cwd() + '/dist',
    filename: '[name].js',
   /*  path:__dirname + '/dist' */
  },
  plugins: [
    new HelloWorldPlugin({options: true})
  ], 
}