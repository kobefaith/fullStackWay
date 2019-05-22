##	前言
通过前面的章节内容应该有所了解，一个 Webpack 的插件其实包含以下几个条件：

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