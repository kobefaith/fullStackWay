<template>
  <div class="hello">
   <!--  {{msg}}
    {{datafromfather}}
    <input v-model="childmsg" v-on:keyup.enter="sendmessage"/> -->
   <!-- <el-table
      :data="myArray"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table> -->

    
         <!-- <el-collapse-item v-for="e in list" :title="e.title" :name="e.name" :key="e.name">
             <div>{{e.description}}</div>
          </el-collapse-item> -->
      
      <el-table
      :data="myArray"
      style="width: 100%">    
       <draggable element="el-table-column" :list="myArray" :component-data="getComponentData()">
        
      <el-table-column
        prop="id"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>     
     
     </draggable>
    </el-table>
    
    
   <!--  <table border="1">      
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
        </tr>
      </thead>  
        <draggable v-model="myArray" :options="{group:'people'}">    
        <tr v-for="item in myArray" :key="item.id"> 
            <td>{{item.id}}</td> 
            <td>{{item.name}}</td> 
        </tr> 
        </draggable>   
    </table>    
     <table border="1">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
        </tr>
      </thead>   
      <draggable v-model="firArray" :options="{group:'people'}">   
        <tr v-for="item in firArray" :key="item.id"> 
            <td>{{item.id}}</td> 
            <td>{{item.name}}</td> 
        </tr>  
      </draggable>    
    </table> -->
    <!-- <div style="display:flex;">
      <div style="flex:1;">
          <draggable v-model="myArray" :options="{group:'people'}"> 
             <div style="border:1px solid red; margin-bottom:2px;" v-for="element in myArray" :key="element.id">{{element.name}}</div>
          </draggable>
      </div>
      <div style="flex:1;">
          <draggable v-model="firArray" :options="{group:'people'}"> 
             <div style="border:1px solid green; margin-bottom:2px;" v-for="element in firArray" :key="element.id">{{element.name}}</div>
          </draggable>
      </div>
    </div>    -->
  </div>
  
</template>

<script>
import draggable from 'vuedraggable'
export default {
   components: {
     draggable,
   },
  
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      childmsg:'',
      myArray:[{
            id:1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            id:2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            id:3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id:4,
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
       firArray:[{
         id:1,
         name:'wwwww',
      },
      {
         id:2,
         name:'eeeee',
      },
      {
         id:3,
         name:'rrrrrr',
      },
      {
         id:4,
         name:'tttttt',
      },
      {
         id:5,
         name:'yyyyyyyy',
      },
      {
         id:6,
         name:'uuuuuuu',
      },
      {
         id:7,
         name:'ffffffff',
      }],
    }
  },
  props:['datafromfather'],
  methods:{
    handleChange() {
      console.log('changed');
    },
    inputChanged(value) {
      this.activeNames = value;
    },
    getComponentData() {
      return {
        on: {
          change: this.handleChange,
          input: this.inputChanged
        },
        props: {
          value: this.activeNames
        }
      };
    },
     sendmessage(){

        this.$emit('child-message',this.childmsg)
        this.childmsg = ''
     }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
