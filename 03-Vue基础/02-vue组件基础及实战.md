组件化是现代前端从jQuery进入到三大框架阶段的一个重要的标志。有了组件就可以更好的分工合作，便于并行开发更大规模的项目。代码的复用性也大大提高。   
vue为组件化开发提供了很好的基础设施，组件中状态来保存数据，组件之间有属性来传递数据，组件自身有生命周期，组件之间通信也有相应的方法。下面我们一起来学习一下vue的组件知识。  
## 组件基础

下面是一个组件的简单例子：  

```
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```
这是一个全局注册的组件，使用Vue.component来定义的都是全局注册的组件。与之对应的是局部注册的组件，后面的注册部分我们会详细说明。上面组件的名字是 button-counter。组件的命名有两种方式：kebab-case（中划线连接）和 PascalCase（首字母大写） ，其中第二种方式定义的组件在引用的时候可以使用两种方式。第一种方式定义的组件只能使用第一种方式引用。  
组件的使用：

```
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```
上面我们使用了三次这个组件，每个组件中的数据都是相互隔离的，第一个组件中按钮点击后只有第一个组件的count值会改变，不会影响后面两个组件的count值。  
有时候我们需要给自组件传递一些数据，这时候就需要属性props：  

```
Vue.component('title-show', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```
上面在title-show组件中定义了一个 title属性，给title属性传递值的方法是这样的：  

```
<title-show title="vue属性demo"></title-show>
```
有一个需要注意的问题是，vue的组件的template中只能有一个根元素，也就是说所有的html都要包裹在一个根元素之内，不能有两个根元素。
## 组件注册 
有全局注册和局部注册两种注册方式：  
Vue.component创建的是全局注册组件，在vue实例的components中注册的是局部注册组件： 

```
new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
```
## 组件的属性






