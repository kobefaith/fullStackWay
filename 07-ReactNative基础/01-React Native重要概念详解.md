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
我们来做一个显示时间的demo，每隔一秒钟就让显示时间加一，做法就是每隔一秒调用setState来修改组件的state，然后触发重新渲染，显示加一后的时间。

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

## 样式
RN中的样式与css中的略有不同，需要使用驼峰命名，比如将background-color改为backgroundColor。style的定义需要使用StyleSheet.create 来实现。

```
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

export default class LotsOfStyles extends Component {
  render() {
    return (
      <View>
        <Text style={styles.red}>just red</Text>
        <Text style={styles.bigBlue}>just bigBlue</Text>
        <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
        <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    marginTop: 30,
    marginLeft:20
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
``` 

## 宽度与高度
最简单的给组件设定尺寸的方式就是在样式中指定固定的width和height。React Native 中的尺寸都是无单位的，表示的是与设备像素密度无关的逻辑像素点。

```
import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';

export default class FixedDimensionsBasics extends Component {
  render() {
    return (
      <View>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}} />
        <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
}
```
在组件样式中使用flex可以使其在可利用的空间中动态地扩张或收缩。一般而言我们会使用flex:1来指定某个组件扩张以撑满所有剩余的空间。如果有多个并列的子组件使用了flex:1，则这些子组件会平分父容器中剩余的空间。如果这些并列的子组件的flex值不一样，则谁的值更大，谁占据剩余空间的比例就更大（即占据剩余空间的比等于并列组件间flex值的比）。

```
import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';

export default class FlexDimensionsBasics extends Component {
  render() {
    return (
      // 试试去掉父View中的`flex: 1`。
      // 则父View不再具有尺寸，因此子组件也无法再撑开。
      // 然后再用`height: 300`来代替父View的`flex: 1`试试看？
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'powderblue'}} />
        <View style={{flex: 2, backgroundColor: 'skyblue'}} />
        <View style={{flex: 3, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
}
```
## FlexBox布局





