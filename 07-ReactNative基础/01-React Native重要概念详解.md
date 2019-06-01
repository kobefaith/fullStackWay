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

RN 中的FlexBox的布局跟css中的使用方式略有不同，效果基本一致，默认值不同：flexDirection的默认值是column而不是row，而flex也只能指定一个数字值。  
在组件的style中指定flexDirection可以决定布局的主轴。子元素是应该沿着水平轴(row)方向排列，还是沿着竖直轴(column)方向排列呢？默认值是竖直轴(column)方向。  

```
import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';

export default class FlexDirectionBasics extends Component {
  render() {
    return (
      // 尝试把`flexDirection`改为`column`看看
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
};
```
## 文本输入与按钮
TextInput 组件用来处理用户的输入数据，Button 组件可以处理用户的点击操作。  
我们看一个demo：这个demo有两个功能：1.显示用户输入的文字。2.用户点击按钮的时候替换原来的问题。  

```
import React, { Component } from 'react';
import { Text, TextInput, View ,Button} from 'react-native';

export default class showText extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  _onPressButton = () => {
    this.setState({text:'文字已经替换'});
  }
  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="请输入："
          onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.text}
        </Text>
        <Button
           onPress={this._onPressButton}
           title="点击修改文字"
         />
      </View>
    );
  }
}
```
上面按钮的样式是固定的，也可以使用Touchable系列组件来定制按钮：  

```
import React, { Component } from 'react';
import { Alert, AppRegistry, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';

export default class Touchables extends Component {
  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  _onLongPressButton() {
    Alert.alert('You long-pressed the button!')
  }


  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableHighlight</Text>
          </View>
        </TouchableHighlight>
        <TouchableOpacity onPress={this._onPressButton}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableOpacity</Text>
          </View>
        </TouchableOpacity>
        <TouchableNativeFeedback
            onPress={this._onPressButton}
            background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableNativeFeedback</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableWithoutFeedback
            onPress={this._onPressButton}
            >
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableHighlight onPress={this._onPressButton} onLongPress={this._onLongPressButton} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Touchable with Long Press</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center'
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
})
```
## 滚动视图与长列表 
ScrollView是一个通用的可滚动的容器，你可以在其中放入多个组件和视图，而且这些组件并不需要是同类型的。ScrollView 不仅可以垂直滚动，还能水平滚动（通过horizontal属性来设置）。、

```
import React, { Component } from 'react';
import { AppRegistry, ScrollView, Image, Text } from 'react-native';

export default class IScrolledDownAndWhatHappenedNextShockedMe extends Component {
  render() {
      return (
        <ScrollView style={{marginTop:20,marginLeft:20,}}>
          <Text style={{fontSize:20}}>scrow view 可以实现图文混排，可以把不同的组件放到一个列表中滚动</Text>
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />          
          <Text style={{fontSize:30}}>这是列表的尾部</Text>
        </ScrollView>
    );
  }
}
```
ScrollView不适合显示大量的数据，因为ScrollView会把所有的数据一次性全部显示，这样会有性能问题。FlatList更适于长列表数据，且元素个数可以增删。和ScrollView不同的是，FlatList并不立即渲染所有元素，而是优先渲染屏幕上可见的元素。  

```
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default class FlatListBasics extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
```
从上面的demo中我们可以看到：FlatList组件必须的两个属性是data和renderItem。data是列表的数据源，而renderItem则从数据源中逐个解析数据，然后返回一个设定好格式的组件来渲染。
如果我们有需要分组显示的数据，比如每隔几条就显示一个标题，那么我们可以使用SectionList 。

```
import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

export default class SectionListBasics extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {title: 'D', data: ['Devin']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
```
## 网络请求
无论是web页面还是手机app 都需要从服务器获取数据，这就需要发送网络请求来实现。RN中提供了fetch API 来实现。当然你也可以使用其他的js网络请求库比如axios。

```
function getMoviesFromApiAsync() {
  return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.movies;
    })
    .catch((error) => {
      console.error(error);
    });
}
```
webSockt 也是支持的：

```
var ws = new WebSocket('ws://host.com/path');

ws.onopen = () => {
  // connection opened
  ws.send('something'); // send a message
};

ws.onmessage = (e) => {
  // a message was received
  console.log(e.data);
};

ws.onerror = (e) => {
  // an error occurred
  console.log(e.message);
};

ws.onclose = (e) => {
  // connection closed
  console.log(e.code, e.reason);
};
```
demo代码地址：https://github.com/kobefaith/fullStackWay/tree/master/07-ReactNative基础/BasciDemo
## 总结
本文主要讲解了ReactNative中的 属性、状态、样式、高度、FlexBox布局等重要的概念，并给出了相应的demo代码。掌握了这些重要的概念，就可以开始React Native开发之旅了。










