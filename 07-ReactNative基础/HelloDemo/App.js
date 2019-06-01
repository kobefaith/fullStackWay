import React from 'react';
import { FlatList, ActivityIndicator, Text, View  ,ScrollView} from 'react-native';

export default class FetchExample extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }
  async componentDidMount() {   
   let response = await fetch('https://facebook.github.io/react-native/movies.json');
   let responseJson = await response.json();
   this.setState({
      isLoading: false,
      dataSource: responseJson.movies,
    }, function(){

     });      
  }
  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={(item, index) => item.id}
        />        
      </View>
    );
  }
}