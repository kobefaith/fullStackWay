## 前言  
打包是前端工程化中的一个重要内容，webpack目前是前端最流行的打包工具。  
本文会从基本概念，基本使用，原理等角度来详细深入的介绍webpack。
## 核心概念  
### 入口文件
webpack打包会先从一个或多个起点文件开始，这些起点文件就是入口文件，用entry配置参数来制定。webpack会从这些入口文件开始分析整个代码的依赖关系，生成整个打包代码。  
典型的entry如下：  

```
    entry: {
        main: process.cwd()+'/main.js',
        page: process.cwd()+'/page.js',       
        common1:["vue"]
    }
```
### 输出 
资源打包完成后需要输出到指定路径的文件，这就需要output参数来指定。
典型的output如下：  

```
    entry: {
        main: process.cwd()+'/main.js',
        page: process.cwd()+'/page.js',       
        common1:["vue"]
    },
    output: {
        path: path.resolve(__dirname, "public/assets"),
        filename: '[name].js'
    },
```
上面的文件名称指定为'[name].js'，其中[name]和 entry 中的 key 保持一致。其中 filename 的配置还是比较多的，不仅可以使用 name，还可以使用 id、hash、chunkhash 等。  

```
[name]：这个模块的名称，就是 entry 中指定的 key
[id]：这个模块的 id，由 Webpack 来分配.
[hash]：每次 Webpack 完成一个打包都会生成这个 hash
[chunkhash]：Webpack 每生成一个文件就叫一个 chunk，这个 chunk 本身的 hash
```
output参数配置中有一个重要的概念是publichPath。这是一个虚拟的路径。  
打包好的 bundle 在被请求的时候，其路径是相对于你配置的 publicPath 来说的。因为 publicPath 相当于虚拟路径，其映射于你指定的 output.path。假如你指定的 publicPath 为 "/assets/"，而且 output.path 为"build"，那么相当于虚拟路径 "/assets/" 对应于 "build"（前者和后者指向的是同一个位置），而如果 build 下有一个 "index.css"，那么通过虚拟路径访问就是 /assets/index.css。比如有一个如下的配置：

```
module.exports = {
  entry: {
    app: 'index.js'
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    //此时相当于 /assets/ 路径对应于 build 目录，是一个映射的关系
    filename: "bundle.js"
  }
}
```
一般情况下publicPath 是cdn的路径名称。如果我们要访问编译后的资源可以通过 localhost:8080/assets/bundle.js 来访问。在index.html中访问bundle.js的话是这样的：

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <script src="assets/bundle.js"></script>
</body>
</html>
```
output中另一个重要的概念是libraryTarget 和library。  

```
library：在 output 中配置，可以指定库的名称
libraryTarget：指定模块输出类型，可以是 commonjs、AMD、script 形式、UMD 模式
```
libraryTarget 配置如何暴露 library。可以使用下面的选项中的任意一个：
暴露为一个变量：  

```
output: {
    path:process.cwd()+'/dest/',
    filename: '[name].js',
    // export itself to a global var
    libraryTarget: "var",
    // name of the global var: "Player"
    library: "Player"
  },
```
通过对象上赋值暴露：  
这中配置将入口起点的返回值（例如，入口起点的任何导出值）赋值给一个特定对象的属性（此名称由 output.library 定义）下。
libraryTarget: "this" - 入口起点的返回值将分配给 this 的一个属性（此名称由 output.library 定义）下，this 的含义取决于你：

```
this["MyLibrary"] = _entry_return_;

// 在一个单独的 script……
this.MyLibrary.doSomething();
MyLibrary.doSomething(); // 如果 this 是 window
```  
libraryTarget: "window" - 入口起点的返回值将使用 output.library 中定义的值，分配给 window 对象的这个属性下。

```
window["MyLibrary"] = _entry_return_;

window.MyLibrary.doSomething();
```
libraryTarget: "commonjs" - 入口起点的返回值将使用 output.library 中定义的值，分配给 exports 对象。这个名称也意味着，模块用于 CommonJS 环境：

```
exports["MyLibrary"] = _entry_return_;

require("MyLibrary").doSomething();
```
libraryTarget: "commonjs2" - 入口起点的返回值将分配给 module.exports 对象。这个名称也意味着模块用于 CommonJS 环境：

```
module.exports = _entry_return_;

require("MyLibrary").doSomething();
```
libraryTarget: "amd" - 将你的 library 暴露为 AMD 模块。
libraryTarget: "umd" - 将你的 library 暴露为所有的模块定义下都可运行的方式。它将在 CommonJS, AMD 环境下运行，或将模块导出到 global 下的变量。

```
output: {
  library: "MyLibrary",
  libraryTarget: "umd"
}
```
最终输出如下：  

```
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define([], factory);
  else if(typeof exports === 'object')
    exports["MyLibrary"] = factory();
  else
    root["MyLibrary"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
  return _entry_return_; // 此模块返回值，是入口 chunk 返回的值
});
```
从 webpack 3.1.0 开始，你可以将 library 指定为一个对象，用于给每个 target 起不同的名称：

```
output: {
  library: {
    root: "MyLibrary",
    amd: "my-library",
    commonjs: "my-common-library"
  },
  libraryTarget: "umd"
}
```
### loader
Webpack 将所有的文件类型都当做一个模块，如 css、html、scss、jpg 等，但是 Webpack 本身只能识别 JavaScript 文件。因此，需要特定的 loader 将文件转化为 JavaScript 模块。

```
const path = require('path');
const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
    ]
  }
};

module.exports = config;
```
以上是指定加载js文件的时候用babel-loader 处理，加载图片的时候用url-loader 处理。
###  plugin
plugin 用于在编译和打包过程中对所有的模块执行特定的操作。比如：CommonsChunkPlugin 有助于提取这些依赖到共享的 bundle 中，来避免重复打包。使用多个插件的实例如下：

```
var webpack = require('webpack');
// 导入非 webpack 自带默认插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

// 在配置中添加插件
plugins: [
  // 构建优化插件
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor-[hash].min.js',
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: false,
    }
  }),
  new ExtractTextPlugin({
    filename: 'build.min.css',
    allChunks: true,
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  // 编译时(compile time)插件
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  }),
  // webpack-dev-server 强化插件
  new DashboardPlugin(),
  new webpack.HotModuleReplacementPlugin(),
]
```
## 总结
本文主要介绍了 Webpack 中四大核心概念，即入口文件、输出文件、Loader、Plugin 等，并给出了实际配置的代码示例。看完本篇相信你已经对webpack有了基本的了解，下一步我们会进入基本使用的环节。



