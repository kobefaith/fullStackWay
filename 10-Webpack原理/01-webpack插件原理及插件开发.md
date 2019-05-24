##	前言
插件是 webpack 生态系统的重要组成部分，为社区用户提供了一种强大方式来直接触及 webpack 的编译过程的能力。插件能深入到编译过程的每一步，通过访问compiler对象来对编译过程进行干预。本文主要讲解webpack插件的原理和开发方式。
## webpack插件的基本概念

一个 Webpack 的插件其实包含以下几个条件：  
一个 js 命名函数。  
在原型链上存在一个 apply 方法。  
为该插件指定一个 Webpack 的事件钩子函数。  
使用 Webpack 内部的实例对象（Compiler 或者 Compilation）具有的属性或者方法。  
当功能完成以后，需要执行 Webpack 的回调函数。  
比如下面的函数就具备了上面的条件，所以它是可以作为一个 Webpack 插件的：  

```
function MyExampleWebpackPlugin() {
};
MyExampleWebpackPlugin.prototype.apply = function(compiler) {
  //我们主要关注 compilation 阶段，即 webpack 打包阶段
  compiler.plugin('compilation', function(compilation , callback) {
    console.log("This is an example plugin!!!");
    //当该插件功能完成以后一定要注意回调 callback 函数
    callback();
  });
};
```
Compiler 对象： Compiler 对象代表了 Webpack 完整的可配置的环境。该对象在 Webpack 启动的时候会被创建，同时该对象也会被传入一些可控的配置，如 Options、Loaders、Plugins。当插件被实例化的时候，会收到一个 Compiler 对象，通过这个对象可以访问 Webpack 的内部环境。  
Compilation 对象： Compilation 对象在每次文件变化的时候都会被创建，因此会重新产生新的打包资源。该对象表示本次打包的模块、编译的资源、文件改变和监听的依赖文件的状态。而且该对象也会提供很多的回调点，我们的插件可以使用它来完成特定的功能，而提供的钩子函数在前面的章节已经讲过了，此处不再赘述。  
webpack插件需要在原型链上有一个apply函数，在插件安装的时候，这个apply函数会被调用。apply方法中会接收webpack中的compiler对象。插件中可以使用这个compiler对象来干预webpack的编译过程。 

## 插件的示例
我们写一个helloPlugin.js:

```
function HelloWorldPlugin(options) {
}
HelloWorldPlugin.prototype.apply = function(compiler) { 
  compiler.plugin('done', function() {
    console.log('Hello World!');
  });
};
module.exports = HelloWorldPlugin;
```
在webpack.config.js中引入这个插件：

```
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
```
执行编译后，可以看到Hello World! 的打印：

```
> webpackxx@1.0.0 build /Users/kobe/gitProj/fullStackWay/10-Webpack原理/compiler_demo
> node  ./build/build.js
Hello World!
```
在插件中使用compilation对象：  

```
function HelloCompilationPlugin(options) {}

HelloCompilationPlugin.prototype.apply = function(compiler) {

  // 设置回调来访问 compilation 对象：
  compiler.plugin("compilation", function(compilation) {

    // 现在，设置回调来访问 compilation 中的步骤：
    compilation.plugin("optimize", function() {
      console.log("Assets are being optimized.");
    });
  });
};

module.exports = HelloCompilationPlugin;
```
异步的插件：  
有一些编译插件中的步骤是异步的，这样就需要额外传入一个 callback 回调函数，并且在插件运行结束时，_必须_调用这个回调函数。

```
function HelloAsyncPlugin(options) {}

HelloAsyncPlugin.prototype.apply = function(compiler) {
  compiler.plugin("emit", function(compilation, callback) {

    // 做一些异步处理……
    setTimeout(function() {
      console.log("Done with async work...");
      callback();
    }, 1000);

  });
};

module.exports = HelloAsyncPlugin;
```
插件的类型：
demo代码的路径：https://github.com/kobefaith/fullStackWay/tree/master/10-Webpack原理/compiler_demo
## 总结
本文讲解了webpack插件的基本原理，同时给了一个插件的demo。如果想继续深入了解webpack的内容，欢迎继续关注本人的github：https://github.com/kobefaith/fullStackWay
