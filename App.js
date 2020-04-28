import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput,Dimensions 
, Platform,
ScrollView, 
AsyncStorage} from 'react-native';
import ToDo from "./ToDo";
import {AppLoading} from "expo";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const {height,width} = Dimensions.get("window")
const seed = () => {
  const one = Math.floor((Math.random() * 100) / 3.92);
  const two = Math.floor((Math.random() * 100) / 3.92);
  const three = Math.floor((Math.random() * 100) / 3.92);
  const four = Math.floor((Math.random() * 100) / 3.92);
  const five = Math.floor((Math.random() * 100) / 3.92);
  const six = Math.floor((Math.random() * 100) / 3.92);
  const seven = Math.floor((Math.random() * 100) / 3.92);
  const eight = Math.floor((Math.random() * 100) / 3.92);
  const nine = Math.floor((Math.random() * 100) / 3.92);
  const ten = Math.floor((Math.random() * 100) / 3.92);
  const eleven = Math.floor((Math.random() * 100) / 3.92);
  const twelve = Math.floor((Math.random() * 100) / 3.92);
  const thirteen = Math.floor((Math.random() * 100) / 3.92);
  const fourteen = Math.floor((Math.random() * 100) / 3.92);
  const fifteen = Math.floor((Math.random() * 100) / 3.92);
  const sixteen = Math.floor((Math.random() * 100) / 3.92);
  return [
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
    thirteen,
    fourteen,
    fifteen,
    sixteen
  ];
}
export default class App extends React.Component {
  
  state={
    newToDo:"",
    loadedToDo: false,
    toDos:{}

};
 componentDidMount=()=>{
   this._loadToDo();
 }
  render(){
    const { newToDo ,loadedToDo,toDos} = this.state;
    console.log(toDos);
    if(!loadedToDo) {
      return <AppLoading/>
    }
  return (
    <View style={styles.container}>
     <StatusBar barStyle="light-content" />
     <Text style={styles.title}>Kawaii ★ To Do </Text>
     <View style={styles.card}>
      <TextInput style={styles.input} placeholder={"New To Do"} 
      value={newToDo}
      onChangeText={this._controlNewToDo}
      placeholderTextColor={"#999"}
      returnKeyType={"done"}
      autoCorrect={false}
      onSubmitEditing={this._addToDo}
      underlineColorAndroid={"transparent"}
      />
      <ScrollView contentContainerStyle={
        styles.toDos
      }>
          {Object.values(toDos).sort((a,b)=>
          a.createdAt - b.createdAt).map(toDo =>
          <ToDo 
          key={toDo.id}
          deleteToDo={this._deleteToDo}
          uncompleteToDo = {this._uncompleteToDo}
          completeToDo ={ this._completeToDo}
          updateToDo ={this._updateToDo}
          {...toDo}
          />)}
      </ScrollView>
     </View>
     </View>
    
    );
  }
  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };
  _loadToDo=async()=>{
    try{
     const toDos = await AsyncStorage.getItem("toDos");
     const parsedToDos =JSON.parse(toDos);
     this.setState({ loadedToDo:true,toDos: parsedToDos||{}});
    }catch(err){
      console.log(err);
    }
  
   };
   _addToDo=()=>{
   const {newToDo}=this.state;
   if(newToDo!==""){
    
     this.setState(prevState =>{
      const ID = uuidv4({ random: seed() });
      const newToDoObject ={
        [ID]:{
          id: ID,
          isCompleted: false,
          text:newToDo,
          createdAt: Date.now()
        }
      };
       const newState={
         ...prevState,
         newToDo: "",
         toDos:{
           ...prevState.toDos,
           ...newToDoObject 
          }
       }
       this._saveToDos(newState.toDos);
       return{...newState};
     });
     
    }
   };

  _deleteToDo=(id) => {
    this.setState(prevState=>{
      const toDos= prevState.toDos;
      delete toDos[id];
      const newState={
        ...prevState,
        ...toDos
      }
      this._saveToDos(newState.toDos);
      return{...newState}
    });
  };
  _uncompleteToDo =(id)=>{
    this.setState(prevState=>{
     const newState ={
       ...prevState,
       toDos:{
         ...prevState.toDos,
         [id]:{
           ...prevState.toDos[id],
           isCompleted:false
         }
       }
     };
     this._saveToDos(newState.toDos);
     return {...newState};
    });
  };
  _completeToDo = (id)=>{
    this.setState(prevState=>{
      const newState ={
        ...prevState,
        toDos:{
          ...prevState.toDos,
          [id]:{
            ...prevState.toDos[id],
            isCompleted:true
          }
        }
      };
      this._saveToDos(newState.toDos);
      return {...newState};
     });
  };
  _updateToDo = (id,text)=>{
    this.setState(prevState=>{
      const newState ={
        ...prevState,
        toDos:{
          ...prevState.toDos,
          [id]:{
            ...prevState.toDos[id],
            text: text
          }
        }
      };
      this._saveToDos(newState.toDos);
      return {...newState};
     });
  };
  _saveToDos =(newToDos)=>{
    const saveToDos = AsyncStorage.setItem("toDos",JSON.stringify(newToDos));
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6E6E6E',
    alignItems: 'center'
  
  },
  title: {
 color:"white",
 fontSize: 30, marginTop: 50,
 fontWeight: "200",marginBottom:30
  },
  card:{
    backgroundColor:"white",
    flex:1,
    width: width -25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios:{
      
      shadowOpacity:0.5,
      shadowRadius: 5,
      shadowOffset:{
        height:-1,
        width:0
       }
       },
      android:{elevation:5}
   })
  },
  input:{
    padding: 20, borderBottomColor:"#bbb"
    ,borderBottomWidth: 1,fontSize:25
  },
  toDos:{
    alignItems: "center"
  }
});
