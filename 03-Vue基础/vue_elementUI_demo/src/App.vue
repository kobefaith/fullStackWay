<template>
  <div id="app">
   <!--  <h1 v-text = "title"></h1> -->
   <!--  <input v-model="newItem" v-on:keyup.enter="addNew"/>
    <ul>
    <li v-for="item in items" v-bind:class="{finished:item.isFinshed}" @click="clickHandle(item)">
      {{item.label}}
    </li>
    </ul>
    <Hello datafromfather =" this is the message from father" v-on:child-message ='getmessage'></Hello>
    <div> the message from child : {{childmsg}}</div> -->
    <Hello/>
  </div>
</template>

<script>
import Store from './store'
import Hello from './components/Hello'

export default {
  
  data() {
     return{
        title:"this is an todo list",
        items:Store.fetch(),
        newItem:"",
        childmsg:''
     }
  },
  components:{Hello},
  methods:{
     clickHandle(item){
        item.isFinshed = !item.isFinshed
     },
     addNew(){     
        this.items.push({
           label:this.newItem,
           isFinshed:false
        })
        this.newItem=''
     },
     getmessage(msg){
        this.childmsg = msg
     }
  },
  
  watch:{
     items:{
        handler:function(items){
          Store.save(items)
        },
        deep:true
     }
  }
}
</script>

<style>
.finished{
  text-decoration:line-through
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
