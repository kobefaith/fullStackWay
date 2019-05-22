##前言
Webpack 的 Compiler 模块是 Webpack 主要引擎，通过它可以创建一个 Compilation 实例，而且所有通过 cli 或者 Webpack 的 API 或者 Webpack 的配置文件传入的配置都会作为参数来构建一个 Compilation 实例。可以通过 webpack.compiler 来访问它。Webpack 通过实例化一个 Compiler 对象，然后调用它的 run 方法来开始一次完整的编译过程。
## 核心概念
Compiler 对象： Compiler 对象代表了 Webpack 完整的可配置的环境。该对象在 Webpack 启动的时候会被创建，同时该对象也会被传入一些可控的配置，如 Options、Loaders、Plugins。当插件被实例化的时候，会收到一个 Compiler 对象，通过这个对象可以访问 Webpack 的内部环境。  
Compilation 对象： Compilation 对象在每次文件变化的时候都会被创建，因此会重新产生新的打包资源。该对象表示本次打包的模块、编译的资源、文件改变和监听的依赖文件的状态。而且该对象也会提供很多的回调点，我们的插件可以使用它来完成特定的功能，而提供的钩子函数在前面的章节已经讲过了，此处不再赘述。
## 总结