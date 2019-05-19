## 前言
本文会讲解webpack的基本使用方法，重点介绍使用CommonChunkPlugin 来提取代码中的公共模块。
 注意 <font size=4>只会提取多入口文件中的公共模块，不会提取单入口模块中的公共模块。</font>    webpack4中已经没有了CommonChunkPlugin，最新版本中想要处理chunk，需要使用SplitChunksPlugin。
我们先来看一下基本的配置：
## 基本配置  

```
{
  name: string, // or
  names: string[],
  // 这是 common chunk 的名称。已经存在的 chunk 可以通过传入一个已存在的 chunk 名称而被选择。
  // 如果一个字符串数组被传入，这相当于插件针对每个 chunk 名被多次调用
  // 如果该选项被忽略，同时 `options.async` 或者 `options.children` 被设置，所有的 chunk 都会被使用，
  // 否则 `options.filename` 会用于作为 chunk 名。
  // When using `options.async` to create common chunks from other async chunks you must specify an entry-point
  // chunk name here instead of omitting the `option.name`.

  filename: string,
  // common chunk 的文件名模板。可以包含与 `output.filename` 相同的占位符。
  // 如果被忽略，原本的文件名不会被修改(通常是 `output.filename` 或者 `output.chunkFilename`)。
  // This option is not permitted if you're using `options.async` as well, see below for more details.

  minChunks: number|Infinity|function(module, count) -> boolean,
  // 在传入  公共chunk(commons chunk) 之前所需要包含的最少数量的 chunks 。
  // 数量必须大于等于2，或者少于等于 chunks的数量
  // 传入 `Infinity` 会马上生成 公共chunk，但里面没有模块。
  // 你可以传入一个 `function` ，以添加定制的逻辑（默认是 chunk 的数量）

  chunks: string[],
  // 通过 chunk name 去选择 chunks 的来源。chunk 必须是  公共chunk 的子模块。
  // 如果被忽略，所有的，所有的 入口chunk (entry chunk) 都会被选择。

  children: boolean,
  // 如果设置为 `true`，所有公共 chunk 的子模块都会被选择

  deepChildren: boolean,
  // 如果设置为 `true`，所有公共 chunk 的后代模块都会被选择

  async: boolean|string,
  // 如果设置为 `true`，一个异步的  公共chunk 会作为 `options.name` 的子模块，和 `options.chunks` 的兄弟模块被创建。
  // 它会与 `options.chunks` 并行被加载。
  // Instead of using `option.filename`, it is possible to change the name of the output file by providing
  // the desired string here instead of `true`.

  minSize: number,
  // 在 公共chunk 被创建立之前，所有 公共模块 (common module) 的最少大小。
}
```
## 重要参数详解
其中name的意思是 提取出的chunk文件的名字。minChunks 的意思是公共的模块必须是被几个模块引用的 ，低于这个数字的不会被提起出来，默认是2.  
async 是创建异步加载的common-chunk，其包含 require.ensure 动态产生的 chunk 中的公共模块。这样，当访问特定路由的时候，会动态的加载这个 common chunk，以及特定路由包含的业务代码。

```
new webpack.optimize.CommonsChunkPlugin({
  name: "app",
  // or
  names: ["app", "subPageA"]
  // the name or list of names must match the name or names
  // of the entry points that create the async chunks
  children: true,
  // (use all children of the chunk)
  async: true,
  // (create an async commons chunk)
  minChunks: 3,
  // (3 children must share the module before it's separated)
})
```
chunks 参数来选择来源的 chunk。这些 chunk 必须是 common-chunk 的子级 chunk。如果没有指定，那么默认选中所有的入口 chunk。换句话说，chunks 就是用于指定从那些 chunks 来抽取公共的模块，而 chunks 的名称一般都是通过 entry 来指定的。

```
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
    entry: {
        main: process.cwd()+'/main.js',
        main1: process.cwd()+'/main1.js',
    },
    output: {
        path: process.cwd()  + '/dest/example6',
        filename: '[name].js'
    },
    plugins: [
        new CommonsChunkPlugin({
            name: "vonder",
            minChunks:2,
            chunks:["main","main1"]
        })
    ]
};
```
上面的配置就是指定把 main 和main1中的公共模块提取到名字是vonder 的chunk中。  
minChunks也可以是一个函数，CommonsChunkPlugin 将会调用这个函数并传入 module 和 count 参数。其中module参数的常用属性如下：

```
module.context：表示存储文件的路径，比如 '/my_project/node_modules/example-dependency'

module.resource：表示被处理的文件名称，比如 '/my_project/node_modules/example-dependency/index.js'
```
而 count 参数表示指定的模块出现在多少个 chunk 中。

```
new webpack.optimize.CommonsChunkPlugin({
  name: "my-single-lib-chunk",
  filename: "my-single-lib-chunk.js",
  minChunks: function(module, count) {
    //如果一个模块的路径中存在 somelib 部分，而且这个模块出现在 3 个独立的 chunk 或者 entry 中，那么它就会被抽取到一个独立的 chunk 中，而且这个 chunk 的文件名称为 "my-single-lib-chunk.js"，而这个 chunk 本身的名称为 "my-single-lib-chunk"
    return module.resource && (/somelib/).test(module.resource) && count === 3;
  }
});
```
官网的例子详细的展示了如何将 node_modules 下引用的模块抽取到一个独立的 chunk 中。

```
new webpack.optimize.CommonsChunkPlugin({
  name: "vendor",
  minChunks: function (module) {
    // this assumes your vendor imports exist in the node_modules directory
    return module.context && module.context.indexOf("node_modules") !== -1;
  }
})
```
[demo代码](https://github.com/kobefaith/fullStackWay/tree/master/09-Webpack%E5%9F%BA%E7%A1%80/commonsChunkPlugin_demo)
## 总结
本文通过实例的形式讲解了CommonsChunkPlugin 插件的使用。后续的文章会讲解插件的实现原理，欢迎关注。
