##前言
Webpack 的 Compiler 模块是 Webpack 主要引擎，本文主要讲解Compiler对象 和Compilation示例的概念，相关钩子函数等。 
## 核心概念
Tapable：  
tapable 这个小型 library 是 webpack 的一个核心工具，但也可用于其他地方，以提供类似的插件接口。webpack 中许多对象扩展自 Tapable 类。这个类暴露 tap, tapAsync 和 tapPromise 方法，可以使用这些方法，注入自定义的构建步骤，这些步骤将在整个编译过程中不同时机触发。  
Compiler：  
Compiler可以创建一个 Compilation 实例，而且所有通过 cli 或者 Webpack 的 API 或者 Webpack 的配置文件传入的配置都会作为参数来构建一个 Compilation 实例。可以通过 webpack.compiler 来访问它。Webpack 通过实例化一个 Compiler 对象，然后调用它的 run 方法来开始一次完整的编译过程。    
Compiler 对象代表了 Webpack 完整的可配置的环境。该对象在 Webpack 启动的时候会被创建，同时该对象也会被传入一些可控的配置，如 Options、Loaders、Plugins。当插件被实例化的时候，会收到一个 Compiler 对象，通过这个对象可以访问 Webpack 的内部环境。  
Compilation 对象：   
Compilation 对象在每次文件变化的时候都会被创建，因此会重新产生新的打包资源。该对象表示本次打包的模块、编译的资源、文件改变和监听的依赖文件的状态。而且该对象也会提供很多的回调点，我们的插件可以使用它来完成特定的功能，而提供的钩子函数在前面的章节已经讲过了，此处不再赘述。  
Compilation 模块会被 Compiler 用来创建新的编译（或新的构建）。compilation 实例能够访问所有的模块和它们的依赖（大部分是循环依赖）。它会对应用程序的依赖图中所有模块进行字面上的编译(literal compilation)。在编译阶段，模块会被加载(loaded)、封存(sealed)、优化(optimized)、分块(chunked)、哈希(hashed)和重新创建(restored)。
## 钩子函数介绍
webpack 提供了在node环境下运行的api，利用这些api，我们可以很方便的查看上面提到的compiler对象和Compilation对象。  
我们先写一个build.js

```
const webpack = require('webpack')
const webpackConfig = require('../webpack.config.js')

// default port where dev server listens for incoming traffic

const compiler = webpack(webpackConfig, (err, stats) => {
  //console.log('stats:   ',stats)
}) 
console.log('compiler:',compiler)
compiler.run((err, stats) => {
  
})

```
然后在package.json中写入script：

```
"scripts": {
    "build": "node  ./build/build.js",   
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
然后运行 npm run build.
可以看到整个的 compiler对象,限于篇幅，只展示部分： 

```
compiler: Compiler {
  _pluginCompat:
   SyncBailHook {
     _args: [ 'options' ],
     taps: [ [Object], [Object], [Object] ],
     interceptors: [],
     call: [Function: lazyCompileHook],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: undefined },
  hooks:
   { shouldEmit:
      SyncBailHook {
        _args: [Array],
        taps: [Array],
        interceptors: [],
        call: [Function: lazyCompileHook],
        promise: [Function: lazyCompileHook],
        callAsync: [Function: lazyCompileHook],
        _x: undefined },
     done:
      AsyncSeriesHook {
        _args: [Array],
        taps: [],
        interceptors: [],
        call: undefined,
        promise: [Function: lazyCompileHook],
        callAsync: [Function: lazyCompileHook],
        _x: undefined },
     additionalPass:
      AsyncSeriesHook {
        _args: [],
        taps: [],
        interceptors: [],
        call: undefined,
        promise: [Function: lazyCompileHook],
        callAsync: [Function: lazyCompileHook],
        _x: undefined },
     beforeRun:
      AsyncSeriesHook {
        _args: [Array],
        taps: [Array],
        interceptors: [],
        call: undefined,
        promise: [Function: lazyCompileHook],
        callAsync: [Function: anonymous],
        _x: [Array] },
     run:
      AsyncSeriesHook {
        _args: [Array],
        taps: [],
        interceptors: [],
        call: undefined,
        promise: [Function: lazyCompileHook],
        callAsync: [Function: anonymous],
        _x: [] },
     emit:
      AsyncSeriesHook {
        _args: [Array],
        taps: [],
        interceptors: [],
        call: undefined,
        promise: [Function: lazyCompileHook],
        callAsync: [Function: lazyCompileHook],
        _x: undefined },
     afterEmit:
      AsyncSeriesHook {
        _args: [Array],
        taps: [Array],
        interceptors: [],
        call: undefined,
        promise: [Function: lazyCompileHook],
        callAsync: [Function: lazyCompileHook],
        _x: undefined },
     thisCompilation:
      SyncHook {
        _args: [Array],
        taps: [Array],
        interceptors: [],
        call: [Function: anonymous],
        promise: [Function: lazyCompileHook],
        callAsync: [Function: lazyCompileHook],
        _x: [Array] },
     compilation:
      SyncHook {
        _args: [Array],
        taps: [Array],
        interceptors: [],
        call: [Function: anonymous],
        promise: [Function: lazyCompileHook],
        callAsync: [Function: lazyCompileHook],
        _x: [Array] },
     normalModuleFactory:
      SyncHook {
        _args: [Array],
        taps: [Array],
        interceptors: [],
        call: [Function: anonymous],
        promise: [Function: lazyCompileHook],
        callAsync: [Function: lazyCompileHook],
        _x: [Array] },
     contextModuleFactory:
      SyncHook {
        _args: [Array],
        taps: [],
        interceptors: [],
        call: [Function: anonymous],
        promise: [Function: lazyCompileHook],
        callAsync: [Function: lazyCompileHook],
        _x: [] },
     beforeCompile:
      AsyncSeriesHook {
        _args: [Array],
        taps: [],
        interceptors: [],
        call: undefined,
        promise: [Function: lazyCompileHook],
        callAsync: [Function: anonymous],
        _x: [] },
     compile:
      SyncHook {
        _args: [Array],
        taps: [],
        interceptors: [],
        call: [Function: anonymous],
        promise: [Function: lazyCompileHook],
        callAsync: [Function: lazyCompileHook],
        _x: [] },
     make:
      AsyncParallelHook {
        _args: [Array],
        taps: [Array],
        interceptors: [],
        call: undefined,
        promise: [Function: lazyCompileHook],
        callAsync: [Function: anonymous],
        _x: [Array] },
     afterCompile:
      AsyncSeriesHook {
        _args: [Array],
        taps: [],
        interceptors: [],
        call: undefined,
        promise: [Function: lazyCompileHook],
        callAsync: [Function: lazyCompileHook],
        _x: undefined },
     watchRun:
      AsyncSeriesHook {
        _args: [Array],
        taps: [],
        interceptors: [],
        call: undefined,
        promise: [Function: lazyCompileHook],
        callAsync: [Function: lazyCompileHook],
        _x: undefined },
     failed:
      SyncHook {
        _args: [Array],
        taps: [],
        interceptors: [],
        call: [Function: lazyCompileHook],
        promise: [Function: lazyCompileHook],
        callAsync: [Function: lazyCompileHook],
        _x: undefined },
     invalid:
      SyncHook {
        _args: [Array],
        taps: [],
        interceptors: [],
        call: [Function: lazyCompileHook],
        promise: [Function: lazyCompileHook],
        callAsync: [Function: lazyCompileHook],
        _x: undefined },
     watchClose:
      SyncHook {
        _args: [],
        taps: [],
        interceptors: [],
        call: [Function: lazyCompileHook],
        promise: [Function: lazyCompileHook],
        callAsync: [Function: lazyCompileHook],
        _x: undefined },
     environment:
      SyncHook {
        _args: [],
        taps: [],
        interceptors: [],
        call: [Function: anonymous],
        promise: [Function: lazyCompileHook],
        callAsync: [Function: lazyCompileHook],
        _x: [] },
     afterEnvironment:
      SyncHook {
        _args: [],
        taps: [],
        interceptors: [],
        call: [Function: anonymous],
        promise: [Function: lazyCompileHook],
        callAsync: [Function: lazyCompileHook],
        _x: [] },
     afterPlugins:
      SyncHook {
        _args: [Array],
        taps: [],
        interceptors: [],
        call: [Function: anonymous],
        promise: [Function: lazyCompileHook],
        callAsync: [Function: lazyCompileHook],
        _x: [] },
     afterResolvers:
      SyncHook {
        _args: [Array],
        taps: [Array],
        interceptors: [],
        call: [Function: anonymous],
        promise: [Function: lazyCompileHook],
        callAsync: [Function: lazyCompileHook],
        _x: [Array] },
     entryOption:
      SyncBailHook {
        _args: [Array],
        taps: [Array],
        interceptors: [],
        call: [Function: anonymous],
        promise: [Function: lazyCompileHook],
        callAsync: [Function: lazyCompileHook],
        _x: [Array] } },
  name: undefined,
  parentCompilation: undefined,
  outputPath: '/Users/kobe/gitProj/fullStackWay/09-Webpack基础/compiler_demo/dist',
    }

```
  
我们可以看到hooks 部分的内容。  
我们查看Compilation 的hooks部分的内容：

```
const webpack = require('webpack')
const webpackConfig = require('../webpack.config.js')

// default port where dev server listens for incoming traffic

const compiler = webpack(webpackConfig, (err, stats) => {
  console.log('compilation:   ',stats.compilation.hooks) 
}) 
```
输出如下：  

```
compilation:    { buildModule:
   SyncHook {
     _args: [ 'module' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  rebuildModule:
   SyncHook {
     _args: [ 'module' ],
     taps: [ [Object] ],
     interceptors: [],
     call: [Function: lazyCompileHook],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: undefined },
  failedModule:
   SyncHook {
     _args: [ 'module', 'error' ],
     taps: [],
     interceptors: [],
     call: [Function: lazyCompileHook],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: undefined },
  succeedModule:
   SyncHook {
     _args: [ 'module' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  addEntry:
   SyncHook {
     _args: [ 'entry', 'name' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  failedEntry:
   SyncHook {
     _args: [ 'entry', 'name', 'error' ],
     taps: [],
     interceptors: [],
     call: [Function: lazyCompileHook],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: undefined },
  succeedEntry:
   SyncHook {
     _args: [ 'entry', 'name', 'module' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  dependencyReference:
   SyncWaterfallHook {
     _args: [ 'dependencyReference', 'dependency', 'module' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  finishModules:
   AsyncSeriesHook {
     _args: [ 'modules' ],
     taps: [ [Object], [Object] ],
     interceptors: [],
     call: undefined,
     promise: [Function: lazyCompileHook],
     callAsync: [Function: anonymous],
     _x: [ [Function], [Function] ] },
  finishRebuildingModule:
   SyncHook {
     _args: [ 'module' ],
     taps: [ [Object] ],
     interceptors: [],
     call: [Function: lazyCompileHook],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: undefined },
  unseal:
   SyncHook {
     _args: [],
     taps: [ [Object] ],
     interceptors: [],
     call: [Function: lazyCompileHook],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: undefined },
  seal:
   SyncHook {
     _args: [],
     taps: [ [Object] ],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [ [Function] ] },
  beforeChunks:
   SyncHook {
     _args: [],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  afterChunks:
   SyncHook {
     _args: [ 'chunks' ],
     taps: [ [Object] ],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [ [Function] ] },
  optimizeDependenciesBasic:
   SyncBailHook {
     _args: [ 'modules' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  optimizeDependencies:
   SyncBailHook {
     _args: [ 'modules' ],
     taps: [ [Object], [Object] ],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [ [Function], [Function] ] },
  optimizeDependenciesAdvanced:
   SyncBailHook {
     _args: [ 'modules' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  afterOptimizeDependencies:
   SyncHook {
     _args: [ 'modules' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  optimize:
   SyncHook {
     _args: [],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  optimizeModulesBasic:
   SyncBailHook {
     _args: [ 'modules' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  optimizeModules:
   SyncBailHook {
     _args: [ 'modules' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  optimizeModulesAdvanced:
   SyncBailHook {
     _args: [ 'modules' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  afterOptimizeModules:
   SyncHook {
     _args: [ 'modules' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  optimizeChunksBasic:
   SyncBailHook {
     _args: [ 'chunks', 'chunkGroups' ],
     taps: [ [Object], [Object], [Object], [Object] ],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x:
      [ [Function: handler],
        [Function: handler],
        [Function: handler],
        [Function] ] },
  optimizeChunks:
   SyncBailHook {
     _args: [ 'chunks', 'chunkGroups' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  optimizeChunksAdvanced:
   SyncBailHook {
     _args: [ 'chunks', 'chunkGroups' ],
     taps: [ [Object], [Object] ],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [ [Function], [Function: handler] ] },
  afterOptimizeChunks:
   SyncHook {
     _args: [ 'chunks', 'chunkGroups' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  optimizeTree:
   AsyncSeriesHook {
     _args: [ 'chunks', 'modules' ],
     taps: [],
     interceptors: [],
     call: undefined,
     promise: [Function: lazyCompileHook],
     callAsync: [Function: anonymous],
     _x: [] },
  afterOptimizeTree:
   SyncHook {
     _args: [ 'chunks', 'modules' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  optimizeChunkModulesBasic:
   SyncBailHook {
     _args: [ 'chunks', 'modules' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  optimizeChunkModules:
   SyncBailHook {
     _args: [ 'chunks', 'modules' ],
     taps: [ [Object] ],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [ [Function] ] },
  optimizeChunkModulesAdvanced:
   SyncBailHook {
     _args: [ 'chunks', 'modules' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  afterOptimizeChunkModules:
   SyncHook {
     _args: [ 'chunks', 'modules' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  shouldRecord:
   SyncBailHook {
     _args: [],
     taps: [ [Object] ],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [ [Function] ] },
  reviveModules:
   SyncHook {
     _args: [ 'modules', 'records' ],
     taps: [ [Object] ],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [ [Function] ] },
  optimizeModuleOrder:
   SyncHook {
     _args: [ 'modules' ],
     taps: [ [Object] ],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [ [Function] ] },
  advancedOptimizeModuleOrder:
   SyncHook {
     _args: [ 'modules' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  beforeModuleIds:
   SyncHook {
     _args: [ 'modules' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  moduleIds:
   SyncHook {
     _args: [ 'modules' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  optimizeModuleIds:
   SyncHook {
     _args: [ 'modules' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  afterOptimizeModuleIds:
   SyncHook {
     _args: [ 'modules' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  reviveChunks:
   SyncHook {
     _args: [ 'chunks', 'records' ],
     taps: [ [Object] ],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [ [Function] ] },
  optimizeChunkOrder:
   SyncHook {
     _args: [ 'chunks' ],
     taps: [ [Object] ],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [ [Function] ] },
  beforeChunkIds:
   SyncHook {
     _args: [ 'chunks' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  optimizeChunkIds:
   SyncHook {
     _args: [ 'chunks' ],
     taps: [ [Object] ],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [ [Function] ] },
  afterOptimizeChunkIds:
   SyncHook {
     _args: [ 'chunks' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  recordModules:
   SyncHook {
     _args: [ 'modules', 'records' ],
     taps: [ [Object] ],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [ [Function] ] },
  recordChunks:
   SyncHook {
     _args: [ 'chunks', 'records' ],
     taps: [ [Object] ],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [ [Function] ] },
  beforeHash:
   SyncHook {
     _args: [],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  contentHash:
   SyncHook {
     _args: [ 'chunk' ],
     taps: [ [Object] ],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [ [Function] ] },
  afterHash:
   SyncHook {
     _args: [],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  recordHash:
   SyncHook {
     _args: [ 'records' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  record:
   SyncHook {
     _args: [ 'compilation', 'records' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  beforeModuleAssets:
   SyncHook {
     _args: [],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  shouldGenerateChunkAssets:
   SyncBailHook {
     _args: [],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  beforeChunkAssets:
   SyncHook {
     _args: [],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  additionalChunkAssets:
   SyncHook {
     _args: [ 'chunks' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  additionalAssets:
   AsyncSeriesHook {
     _args: [],
     taps: [],
     interceptors: [],
     call: undefined,
     promise: [Function: lazyCompileHook],
     callAsync: [Function: anonymous],
     _x: [] },
  optimizeChunkAssets:
   AsyncSeriesHook {
     _args: [ 'chunks' ],
     taps: [ [Object] ],
     interceptors: [],
     call: undefined,
     promise: [Function: lazyCompileHook],
     callAsync: [Function: anonymous],
     _x: [ [Function: bound optimizeFn] ] },
  afterOptimizeChunkAssets:
   SyncHook {
     _args: [ 'chunks' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  optimizeAssets:
   AsyncSeriesHook {
     _args: [ 'assets' ],
     taps: [],
     interceptors: [],
     call: undefined,
     promise: [Function: lazyCompileHook],
     callAsync: [Function: anonymous],
     _x: [] },
  afterOptimizeAssets:
   SyncHook {
     _args: [ 'assets' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  needAdditionalSeal:
   SyncBailHook {
     _args: [],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  afterSeal:
   AsyncSeriesHook {
     _args: [],
     taps: [],
     interceptors: [],
     call: undefined,
     promise: [Function: lazyCompileHook],
     callAsync: [Function: anonymous],
     _x: [] },
  chunkHash:
   SyncHook {
     _args: [ 'chunk', 'chunkHash' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  moduleAsset:
   SyncHook {
     _args: [ 'module', 'filename' ],
     taps: [],
     interceptors: [],
     call: [Function: lazyCompileHook],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: undefined },
  chunkAsset:
   SyncHook {
     _args: [ 'chunk', 'filename' ],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  assetPath:
   SyncWaterfallHook {
     _args: [ 'filename', 'data' ],
     taps: [],
     interceptors: [],
     call: [Function: lazyCompileHook],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: undefined },
  needAdditionalPass:
   SyncBailHook {
     _args: [],
     taps: [],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [] },
  childCompiler:
   SyncHook {
     _args: [ 'childCompiler', 'compilerName', 'compilerIndex' ],
     taps: [],
     interceptors: [],
     call: [Function: lazyCompileHook],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: undefined },
  normalModuleLoader:
   SyncHook {
     _args: [ 'loaderContext', 'module' ],
     taps: [ [Object], [Object] ],
     interceptors: [],
     call: [Function: anonymous],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: [ [Function], [Function] ] },
  optimizeExtractedChunksBasic:
   SyncBailHook {
     _args: [ 'chunks' ],
     taps: [ [Object], [Object], [Object] ],
     interceptors: [],
     call: [Function: lazyCompileHook],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: undefined },
  optimizeExtractedChunks:
   SyncBailHook {
     _args: [ 'chunks' ],
     taps: [],
     interceptors: [],
     call: [Function: lazyCompileHook],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: undefined },
  optimizeExtractedChunksAdvanced:
   SyncBailHook {
     _args: [ 'chunks' ],
     taps: [ [Object] ],
     interceptors: [],
     call: [Function: lazyCompileHook],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: undefined },
  afterOptimizeExtractedChunks:
   SyncHook {
     _args: [ 'chunks' ],
     taps: [],
     interceptors: [],
     call: [Function: lazyCompileHook],
     promise: [Function: lazyCompileHook],
     callAsync: [Function: lazyCompileHook],
     _x: undefined } }
```
demo代码：https://github.com/kobefaith/fullStackWay/tree/master/10-Webpack原理/compiler_demo
##  总结

本文讲解了compiler 和compilation对象的概念和钩子函数，这些内容对webpack插件开发是很有用的，在后续的内容中我们将继续讲解这些钩子函数在插件开发中的应用，欢迎关注。