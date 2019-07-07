  var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
 module.exports = {
     entry: {
         main: process.cwd()+'/code/main.js',
         main1: process.cwd()+'/code/main1.js',         
         vue:["vue"],        
     },
     output: {
         path: process.cwd() + '/dist',
         filename: '[name].js',
     },
     devServer:{
      port:9002,
      overlay:true, //  报错的时候会出现黑色的浮层提示。
      hot:true,
      hotOnly: true, // 禁止js的reload。 
      proxy: {
        "/": {
          target: 'https://m.ppsport.com',  // 请求只写 /msite/match/getLiveMatchList.htm
          changeOrigin:true, 
          pathRewrite: {
            "^/msite":'/msite/match/getLiveMatchList.htm',  // 把请求中的msite 替换为后面的路径
          }
        }
      }    
    },  
     plugins: [
         new CommonsChunkPlugin({
             name: ["common","vue","load"],
             minChunks:2
         })
     ]
 };
