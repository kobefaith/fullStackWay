## vuex介绍
在现代前端开发中，组件之间的通信是一个很重要的知识，父子组件之间如何传递数据，兄弟组件之间如何传递数据以及如何跨层级进行传递数据都是很关键的问题。无论react还是vue，为了解决这些问题都提供了一些解决方案，其中vuex就是在vue中解决这些问题的一个优秀方案。  
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
## vuex核心概念
每一个 Vuex 应用的核心就是 store（仓库）。store从某种角度看就是一个全局对象。Vuex 和单纯的全局对象有以下两点不同： 
Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。  
你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。
![avatar](./img/vuex.jpeg) 
创建store的方法：  

```
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```
### State  
state就是vuex存储的变量的集合。我们可以通过state来获取存储在vuex中的变量。

```
console.log(store.state.count)
// 一般情况下会通过计算属性来返回
computed: {
    count () {
      return store.state.count
    }
}
```

### Getter
getter就是store的计算属性。  可以用来定义一些需要计算的

```
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```
访问getter ： 

```
store.getters.doneTodos
```
mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

```
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

### Mutation
更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。  

```
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```
提交mutation的方法是使用commit：

```
store.commit('increment')
```
带有参数的mutation：

```
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}

store.commit('increment', {
  amount: 10
})
// 对象风格的提交
store.commit({
  type: 'increment',
  amount: 10
})

```
mutation只能是同步的方法，不能包含异步的逻辑。要想使用异步的逻辑，比如发请求获取数据后设置state，那么就要使用action。

### Action
Action 类似于 mutation，不同在于：  
Action 提交的是 mutation，而不是直接变更状态。  
Action 可以包含任意异步操作。  

```
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment ({ commit }) {
      commit('increment')
    }
  }
})
```
分发action：

```
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```
### Module

## vuex使用demo
```
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    increment({commit}) {
      setTimeout(()=>{
        // state.count++ // 不要对state进行更改操作，应该通过commit交给mutations去处理
        commit('increment')
      }, 3000)
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

```
