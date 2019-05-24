const HelloWorldPlugin = require('./build/helloPlugin');
module.exports = { 
  // 项目入口
  entry:"./src/index.js",
  // 项目出口
  output:{
      filename:'bundle.js'
  },
  plugins: [
    new HelloWorldPlugin({options: true})
  ]
}