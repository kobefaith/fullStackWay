##前言
Webpack 的 Compiler 模块是 Webpack 主要引擎，通过它可以创建一个 Compilation 实例，而且所有通过 cli 或者 Webpack 的 API 或者 Webpack 的配置文件传入的配置都会作为参数来构建一个 Compilation 实例。可以通过 webpack.compiler 来访问它。Webpack 通过实例化一个 Compiler 对象，然后调用它的 run 方法来开始一次完整的编译过程。
## 总结