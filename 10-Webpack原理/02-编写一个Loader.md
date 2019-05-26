## 前言
本文主要讲解如何编写一个Webpack 的loader。
## loader基础知识
loader是一个导出为函数的node模块，webpack在转换资源的时候会调用这个函数。  
官网给出的编写loader的准则：  

```
简单易用。
使用链式传递。
模块化的输出。
确保无状态。
使用 loader utilities。
记录 loader 的依赖。
解析模块依赖关系。
提取通用代码。
避免绝对路径。
使用 peer dependencies。
```
loader的有同步和异步之分： 
上面提到loader导出为一个函数，这个函数传入的第一个参数是资源文件(resource file)的内容。compiler 需要得到最后一个 loader 产生的处理结果。这个处理结果应该是 String 或者 Buffer（被转换为一个 string），代表了模块的 JavaScript 源码。   
同步loader可以同步返回处理后的content内容：

```
module.exports = function(content, map, meta) {
  return someSyncOperation(content);
};
```
同步loader 也可以用callback的方式：  

```
module.exports = function(content, map, meta) {
  this.callback(null, someSyncOperation(content), map, meta);
  return; // 当调用 callback() 时总是返回 undefined
};
```
callback方式允许传入多个参数，直接返回函数只能传递content一个参数。  
异步loader使用 this.async 来获取 callback 函数：

```
module.exports = function(content, map, meta) {
  var callback = this.async();
  someAsyncOperation(content, function(err, result) {
    if (err) return callback(err);
    callback(null, result, map, meta);
  });
};
```
默认情况下，资源文件会被转化为 UTF-8 字符串，然后传给 loader。通过设置 raw，loader 可以接收原始的 Buffer。每一个 loader 都可以用 String 或者 Buffer 的形式传递它的处理结果。Complier 将会把它们在 loader 之间相互转换。

```
module.exports = function(content) {
    assert(content instanceof Buffer);
    return someSyncOperation(content);
    // 返回值也可以是一个 `Buffer`
    // 即使不是 raw loader 也没问题
};
module.exports.raw = true;
```
Loader上下文：  
this.version ： 版本号。  
this.context：loader模块所在的目录。  
this.request：被解析出来的 request 字符串。  
this.query：用来获取option，已经废弃。现在用loader-utils 中的 getOptions 方法来提取给定 loader 的 option。  
this.callback：一个可以同步或者异步调用的可以返回多个结果的函数。    
this.async： 告诉 loader-runner 这个 loader 将会异步地回调。返回 this.callback。  
this.cacheable：设置是否可缓存标志的函数。默认情况下，loader 的处理结果会被标记为可缓存。调用这个方法然后传入 false，可以关闭 loader 的缓存。一个可缓存的 loader 在输入和相关依赖没有变化时，必须返回相同的结果。一般的使用方式：
 
```
this.cacheable && this.cacheable();
```
this.loaders:所有 loader 组成的数组。  
this.loaderIndex:当前 loader 在 loader 数组中的索引。  
this.resource:request 中的资源部分，包括 query 参数。  
this.resourcePath:资源文件的路径。  
this.resourceQuery:资源的 query 参数。  
this.target:编译的目标。从配置选项中传递过来的。  
this.emitWarning:发出警告。  
this.emitError：抛出错误。    
this.emitFile：产生一个文件。这是 webpack 特有的。  
this.fs：用于访问 compilation 的 inputFileSystem 属性。  
## loader Demo 
下面我们写一个简单的替换文本内容的加载txt格式文件的loader.  
我的loader 就叫checkLoader,代码如下：

```

const loaderUtils =  require('loader-utils');

module.exports = function loader(source) {
  const options = loaderUtils.getLoaderConfig(this);
  source = source.replace(/\[name\]/g, options.name);
  console.log('options:   ', options)
  console.log('source:   ',source)
  return `${ JSON.stringify(source) }`;
};
```

webpack.config.js如下：
```
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
          loader: path.resolve(__dirname, './build/checkLoader.js'),
          options: {
            name: 'Alice'
          }   
        }             
      }]
  }
}
```
待处理的文件 hello.txt如下： 

```
Hey [name]!
```
让我们看一下允许后的结果：

```
> webpackxx@1.0.0 build /Users/kobe/gitProj/fullStackWay/10-Webpack原理/loader_demo
> node  ./build/build.js

options:    { name: 'Alice' }
source:    Hey Alice!
options:    { name: 'Alice' }
source:    Hey Alice!
Compilation finished!

```
可以看到 在loader插件中打出的 options 和source 分别是loader的配置和待处理文件的内容。  
我们再看一下打包后的文件,限于篇幅我只贴出一部分：  

```
/***/ 3:
/***/ (function(module, exports) {

"Hey Alice!"

/***/ })

```
我们看到 name已经被替换为Alice，说明loader运行成功。本demo使用的webpack是3.8.1,不同版本配置略有差异，demo地址：https://github.com/kobefaith/fullStackWay/tree/master/10-Webpack原理/loader_demo

## 总结
本文主要讲了 webpack loader的基础知识和开发方法，并做了一个简单的demo。









