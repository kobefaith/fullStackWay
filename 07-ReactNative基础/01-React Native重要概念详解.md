## 前言
本文主要讲解React Native中的重要概念，比如：属性、状态、样式、宽度和高度、flexbox布局等。这些概念与React中的有相似之处，也有一些RN独有的特点。掌握这些重要概念，对开发React Native大有帮助。
## Props（属性)
RN中属性的概念与React中的类似，都是给组件传递的参数，可以用于父子组件中间数据的传递，对自组件进行设置等。  
我们看一下官网中给出的例子：  

```
import React, { Component } from 'react';
import { Image } from 'react-native';

export default class Bananas extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <Image source={pic} style={{width: 193, height: 110}} />
    );
  }
} 
```
其中，Image组件中的source就是一个属性，通过这个属性我们可以指定图片的地址。  
## state 
state是组件的内部状态，跟props不同的是：props是从外部传入的，state是组件内部的。 一般在constructor 中初始化state，在需要修改时调用setState方法来修改state。  
与react 中一样，RN中的state 也有一些需要特别注意的地方：
 
 ```
 一切界面变化都是状态state变化
state的修改必须通过setState()方法
this.state.likes = 100; // 这样的直接赋值修改无效！
setState 是一个 merge 合并操作，只修改指定属性，不影响其他属性
setState 是异步操作，修改不会马上生效
 ```
 
 ```
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { currentTime:0 };

    // 每1000毫秒对showText状态做一次取反操作
    setInterval(() => {
      this.setState(previousState => {
        return { currentTime: previousState.currentTime+1 };
      });
    }, 1000);
  }

  render() {
    // 根据当前showText的值决定是否显示text内容
    if (!this.state.currentTime) {
      return null;
    }

    return (
      <Text>{this.state.currentTime}秒</Text>
    );
  }
}

export default class TimerApp extends Component {
  render() {
    return (
      <View>
        <Timer/>        
      </View>
    );
  }
}
```

