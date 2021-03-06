## 前言
本文主要讲解webpack dev server的使用实例。
##基本概念
ContentBase：指定请求的资源路径。也就是告诉服务器从哪里提供内容。默认是运行webpack-dev-server的路径。  
热加载：为 webpack-dev-server 开启 HMR 模式只需要在命令行中添加--hot，它会将 HotModuleReplacementPlugin 这个插件添加到 webpack 的配置中去。   
webpack的reload和热更新不一样，热更新不刷新浏览器，reload刷新浏览器，会导致页面状态改变。
js文件默认使用reload，html，css默认是热更新。如果要使js文件也是用热更新，那么需要这样配置：  
   
```
devServer:{
  port:9002,
  overlay:true, //  报错的时候会出现黑色的浮层提示。
  hot:true,
  hotOnly:true, // 禁止js的reload。 

}
```
js文件中需要加上如下的代码，才能在关闭reload的情况下使用热更新：

```
module.hot.accept();
```
热更新的原理：webpack通过node的fs.watch来监听文件变化，通过websocket来通知express，然后express来通过http长链接通知客户端。客户端收到通知后发送ajax请求来获取新的模块。  
proxy代理：webpack-dev-server 使用 http-proxy-middleware 去把请求代理到一个外部的服务器。前端开发模式的时候如果遇到跨域的请求，可以用proxy的配置来解决。  

```
{
  devServer: {
    proxy: {
      '/api': {
        target: 'https://m.ppsport.com', // 请求只写 /msite/match/getLiveMatchList.htm
          changeOrigin:true, 
          pathRewrite: {
            "^/msite":'/msite/match/getLiveMatchList.htm',// 把请求中的msite 替换为后面的路径
          }
      }
    }
  }
}
```
这样在dev模式下请求/api开头的接口都会被转发到 http://backendserver.com的域名，从而实现跨域请求数据。
historyApiFallback：当使用 HTML 5 的 history API 的时候，当 404 出现的时候可能希望使用 index.html 来作为请求的资源，这时候可以使用这个配置 :historyApiFallback:true。  
也可以通过rewrites选项来进一步的控制：

```
historyApiFallback: {
  rewrites: [
    { from: /^\/$/, to: '/views/landing.html' },
    { from: /^\/subpage/, to: '/views/subpage.html' },
    { from: /./, to: '/views/404.html' }
  ]
}
```
开启gzip压缩：

```
devServer: {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
  port: 9000
}
```
lazy:当启用 lazy 时，dev-server 只有在请求时才编译包(bundle)。这意味着 webpack 不会监视任何文件改动。我们称之为“惰性模式”。  
在nodejs中使用webpack-dev-server 的方法：  

```
'use strict';

const Webpack = require('webpack');
const WebpackDevServer = require('../../../lib/Server');
const webpackConfig = require('./webpack.config');

const compiler = Webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  open: true,
  stats: {
    colors: true,
  },
});
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(8080, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:8080');
});
```
##使用方法
安装 webpack-dev-server

```
npm install webpack-dev-server -g
```
如果想用 npm start 来启动dev server的话，需要配置script。

```
"scripts": {
    "build": "webpack",
    "start": "webpack-dev-server --inline --hot --port 3000 --content-base public",    
  },
```
其中 --hot是开启热更新模式，在代码变化的时候重新打包，并刷新浏览器中的页面。实现的原理是使用websocket 来实现页面和dev server的通信，然后在代码发生变化的时候，通过websocket来通知页面重新加载。  
为了更好的可定制化，一般是用express来自己搭建dev server：

```
const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');
const app = express();
Object.keys(webpackConfig.entry).forEach(name => {
  webpackConfig.entry[ name ] = [ 'webpack-hot-middleware/client?noInfo=true&reload=true' ].concat(webpackConfig.enrty[ name ]);
});
const compiler = webpack(webpackConfig)


app.use(devMiddleware(
  compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
   })
); 
app.use(hotMiddleware(
  compiler, {
    overlayStyles:true,
  })
);
app.listen(7000);
```


## 总结
本文讲解了webpack-dev-server 中一些核心的概念和主要配置选项，如 contentBase、publicPath、proxy 代理、historyApiFallback、lazyLoad 等。另外介绍了基本的使用方法和热更新的原理。

