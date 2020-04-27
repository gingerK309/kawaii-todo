import React,{Component} from "react";
import { View, Text, TouchableOpacity,
StyleSheet, 
Dimensions,
TextInput} from "react-native";

const { width, height } = Dimensions.get("window");



export default class ToDo extends Component{
    state={
        isEditing: false,
        isCompleted: false,
        toDoValue: ""
    }
    render(){
        const {isCompleted,isEditing,toDoValue} =this.state;
        const {text}=this.props;
        return(
          <View style={styles.container}>
           <View style={styles.column}>   
            <TouchableOpacity onPress={
            this._toggleComplete
            }>
              <View style={[styles.circle, isCompleted?styles.completetdCircle:styles.uncompletedCircle]}/>

            </TouchableOpacity>
           {isEditing ? 
           (<TextInput style={[styles.text,styles.input,
            isCompleted? styles.completedText:
            styles.uncompletedText]} 
            
           value={toDoValue} 
           multiline={true}
           onChangeText={this._controlInput}
           returnKeyType={"done"}
           onBlur={this._finishEditing}
           />):
           
           (
                <Text style=
                {[
                    styles.text, 
                    isCompleted? styles.completedText:
                    styles.uncompletedText]}>
                         {text}
                    </Text>
           )}
                </View>
                
                    {isEditing?(
                        <View style={styles.actions} >
                            <TouchableOpacity onPressOut={this._finishEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>✔</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ):(
                    <View style={styles.actions} >
                        <TouchableOpacity onPressOut={this._startEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✏</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>❌</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                    )}

                </View>
        
        );
    }
  _toggleComplete=()=>{
      this.setState(prevState=>{
          return{
              isCompleted: !prevState.isCompleted
          };
      });
  };
  _startEditing = ()=>{
      const {text} = this.props;
      this.setState({
          isEditing: true,toDoValue: text
      });
  };
  _finishEditing =()=>{
      this.setState({
          isEditing:false
      });
  };
  _controlInput =(text)=>{
      this.setState({
       toDoValue: text
      })
  }
}

const styles = StyleSheet.create({
 container:{
 width:width-50,
 borderBottomColor: "#bbb",
 borderBottomWidth: StyleSheet.hairlineWidth,
 flexDirection:"row"
 ,alignItems:"center"
 ,justifyContent:"space-between"
 },
 circle:{
  width:30, height:30, 
  borderRadius:15,
  alignItems:"center",
  marginRight:20,
  
  borderWidth: 3

 },
 completetdCircle:{
 borderColor:"#bbb"
 },
 uncompletedCircle:{
    borderColor:"#5882FA"
 },
 text:{
     fontWeight:"600",
     fontSize:20
     ,marginVertical:20
 }
,
 completedText:{
     color: "#bbb", textDecorationLine:"line-through"
 },
 uncompletedText:{
color: "#0B0B61"

 },
 column:{
     flexDirection:"row"
     ,alignItems:"center",
     width: width/2
     ,justifyContent:"space-between"
 },
 actions:{
     flexDirection:"row"
    },
    actionContainer:{
        marginVertical:12,
        marginHorizontal:12
    
    },
    input:{
       marginVertical:12
      ,width: width/2
    }

});