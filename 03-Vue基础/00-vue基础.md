## 前言
本文主要讲解vue框架的基础知识，主要包括框架的介绍，环境的搭建，以及基本概念的示例。
## vue框架介绍
vue是华人程序员尤雨溪开发的前端框架。  
官方的说法是：Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。   
简单来说vue是一个综合了angular 和react的更简单更易上手的前端框架。  
与其他前端框架的对比：https://cn.vuejs.org/v2/guide/comparison.html  
## vue开发环境搭建
有两种方式使用vue：  
一种是直接\<script\>标签引入：

```
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```
另一种方式是使用npm：  

```
npm install vue
```
现代前端已经飞速发展，工程化是前端进步的重要标志之一。工程化的目的是为了提供开发效率，提供更好的体验，比如webpack就是为了更好的开发和打包代码。我们知道搭建一整套的前端脚手架对于初学者来说是有一定难度的，vue官方为了提供更好的开发体验，提供了一套官方脚手架：vue cli。  
安装vue cli：

```
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```
创建项目：  

```
vue create my-project
```
## vue基本概念
vue采用模版的语法来渲染页面：
  
```
<div id="app">
  {{ message }}
</div>

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```
切换元素渲染：  

```
<div id="app-3">
  <p v-if="seen">现在你看到我了</p>
</div>
```
```
const app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})
```
列表渲染：

```
<div id="app-4">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
```
```
const app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: '学习 JavaScript' },
      { text: '学习 Vue' },
      { text: '整个牛项目' }
    ]
  }
})
```
监听点击事件：  

```
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">逆转消息</button>
</div>
```
```
const app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
```
处理用户输入：

```
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```
```
const app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})
```
组件定义：  

```
Vue.component('todo-item', {
  template: '<li>这是个待办项</li>'
})
```
组件使用：  

```
<ol>
  <!-- 创建一个 todo-item 组件的实例 -->
  <todo-item></todo-item>
</ol>
```
组件传递属性：

```
<div id="app-7">
  <ol>
    <!--
      现在我们为每个 todo-item 提供 todo 对象
      todo 对象是变量，即其内容可以是动态的。
      我们也需要为每个组件提供一个“key”，稍后再
      作详细解释。
    -->
    <todo-item
      v-for="item in groceryList"
      v-bind:todo="item"
      v-bind:key="item.id"
    ></todo-item>
  </ol>
</div>

Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

const app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: '蔬菜' },
      { id: 1, text: '奶酪' },
      { id: 2, text: '随便其它什么人吃的东西' }
    ]
  }
})
```
demo 代码地址：https://github.com/kobefaith/fullStackWay/tree/master/03-Vue基础/vue_basic_demo 
##  总结：
本文主要讲解了vue框架的基本概念和基本使用方法，后面的文章会详细讲解vue的更多高级用法，欢迎关注。
