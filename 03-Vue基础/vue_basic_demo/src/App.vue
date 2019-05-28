<template>
  <div id="app">  
    {{message}}   
    <div id="app-3">
       <p v-if="seen">现在你看到我了</p>
    </div>  
    <div id="app-4">
      <ol>
        <li v-for="todo in todos" v-bind:key="todo.id">
          {{ todo.text }}
        </li>
      </ol>
    </div>  
    <div id="app-5">
       <p>{{ message }}</p>
       <button v-on:click="reverseMessage">逆转消息</button>
    </div>
    <div id="app-6">
      <p>{{ message }}</p>
      <input v-model="message">
    </div>
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
  </div>
  
</template>

<script>

import Hello from './components/Hello';

export default {  
  data() {
     return{
        message:"this is an vue demo",    
        seen: true ,
         todos: [
          { id:1,text: '学习 JavaScript' },
          { id:2,text: '学习 Vue' },
          { id:3,text: '整个牛项目' }
        ],
        groceryList: [
          { id: 0, text: '蔬菜' },
          { id: 1, text: '奶酪' },
          { id: 2, text: '随便其它什么人吃的东西' }
        ]
     }
  },
  components:{Hello},
  methods:{
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
    
  }, 
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
  color: #2c3e50;
  margin-top: 60px;
}
</style>
