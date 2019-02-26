import React, { Component } from 'react';

import { FlatList,View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
// import styles from './styles';
import api from '../services/api'
import Tweet from '../components/Tweet';
import socket from 'socket.io-client';
export default class Timeline extends Component {
  static navigationOptions = ({navigation}) =>({
    title:'Tweets',
    headerRight:(
      <TouchableOpacity onPress={()=>{navigation.navigate('New')}}>
          <Icon style={{marginRight:20}} name="add-circle-outline" size={24} color="#4bb0ee"/>
      </TouchableOpacity>
    )
  })
  state = {
    tweets :[]
  }
  async componentDidMount(){
    console.log(api)
    const response = await api.get('tweets');
    console.log(response)
    this.setState({
      tweets:response.data
    });
    this.subscribeToEvents()
  }

  subscribeToEvents = async ()=>{
    socket.io.on('tweet',data=>{
      this.setState({
        tweets:[data,...tweets]
      })
    })
  }
  render() {
    return (
      <View style={styles.container}>
          <FlatList
            data={this.state.tweets}
            keyExtractor={tweet => tweet._id}
            renderItem={({item})=><Tweet tweet={item}/>}
          />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});
