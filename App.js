// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// import React, {Component} from 'react';
// import {Platform, Image, StyleSheet, Text, View} from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     let pic={
//       uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
//     }
//     return (
//       <View style={styles.container}>
//         <Text>Hello {this.props.name}!</Text>
//         <Image source={pic} style={{width: 193, height: 110}} />
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>s get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

import React, { Component } from 'react';
import { Text, View ,StyleSheet, TextInput,Button,Alert, ScrollView, FlatList , SectionList,ActivityIndicator} from 'react-native';



export default class LotsOfGreetings extends Component {
  render() {
    let color = "yellow";

    return (
      <View style={{flex: 1}}>
        <Main  />
        <View style={{flex: 1, backgroundColor: 'white'}} />
      </View>
    );
  }
}

class Main extends Component{
  constructor(props) {
    super(props);
    this.state = { color: "skyblue" };
  }

  showTopic(value){
    if(value=="yellow"){
        this.setState({color:'yellow'});
    }

    if(value == "skyblue"){
      this.setState({color:'skyblue'});
    }

    if(value == "steelblue"){
      this.setState({color:'steelblue'});
    }

    //Alert.alert("你点击了按钮！");
  }

  render() {
    return (
      // 尝试把`flexDirection`改为`column`看看
      <View style={{flex: 9, backgroundColor: 'steelblue'}}>
        <View style={{top:'10%',flex: 1, flexDirection: 'row'}}>
          <View style={{width: 70, height: 50,backgroundColor:'skyblue'}}>
            <Button onPress={() => { this.showTopic("skyblue") }} title="点我！" color='white'/>
          </View>
          <View style={{width: 70, height: 50, backgroundColor: 'steelblue'}}>
            <Button onPress={() => { this.showTopic("steelblue") }} title="点我！" color='white'/>
          </View>
        </View>
        <View style={{flex:8, backgroundColor:this.state.color}}>
          <ScrollView>
          <FetchExample/>
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
            <Content name="Hanson"/>
            <Content name="Haha, it works"/>
            <PizzaTranslator />
            <Content name="Hanson"/>
            <Content name="Haha, it works"/>
            <PizzaTranslator />
            <Content name="Hanson"/>
            <Content name="Haha, it works"/>
            <PizzaTranslator />
          </ScrollView>

        </View>
      </View>
    );
  }
}

class Greeting extends Component {
  render() {
    return (
      <View style={styles.blink}>
        <Text>Hello {this.props.name}!</Text>
      </View>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <View style={styles.blink}>
        <Text>Hello {this.props.name}!</Text>
      </View>
    );
  }
}

class BlinkText extends Component {
  constructor(props) {
    super(props);
    this.state = { showText: true };

    // 每1000毫秒对showText状态做一次取反操作
    setInterval(() => {
      this.setState(previousState => {
        return { showText: !previousState.showText };
      });
    }, 1000);
  }
  render() {
    // 根据当前showText的值决定是否显示text内容
    let display = this.state.showText ? this.props.value : ' ';
    return (
      <View style={styles.blink}>
        <Text>{display}</Text>
      </View>
      
    );
  }
}

class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        </Text>
      </View>
    );
  }
}


class FetchExample extends Component {
  
    constructor(props){
      super(props);
      this.state ={ isLoading: true}
    }
  
    componentDidMount(){
      return fetch('https://facebook.github.io/react-native/movies.json')
        .then((response) => response.json())
        .then((responseJson) => {
  
          this.setState({
            isLoading: false,
            dataSource: responseJson.movies,
          }, function(){
  
          });
  
        })
        .catch((error) =>{
          console.error(error);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  blink:{
    alignItems: 'flex-start',
    top:"2%",
    left:'5%'
  },
  content:{
    width:'100%',
    height:'100%',
    top:'10%',
    backgroundColor:'blue'
  },
  contentBackground:{
    backgroundColor:'yellow'
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
});
