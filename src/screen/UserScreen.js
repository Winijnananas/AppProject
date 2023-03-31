import { View, Text, Button, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Image, ImageBackground, Pressable, ScrollView,ActivityIndicator,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { useIsFocused } from '@react-navigation/native';
import LogoutButton from '../components/LogoutButtin';
import axios from 'axios';


//import { ActivityIndicator } from 'react-native-paper';

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';




export default function UserScreen({ navigation }) {
  // const [editprofile, onChangeText] = React.useState("Edit Profile"); 



  const API_User_me = "http://192.168.47.1:3000/users/me"; 
  //const API_User_me = "http://192.168.1.31:3000/users/me";
  const [isLoading ,setIsLoading] = useState(false);
  const [token, setToken] = useState();
  const [username,setUser] = useState();

  const getToken = async () => {
    //await AsyncStorage.getItem('@Token');
    setToken(await AsyncStorage.getItem('@Token'));
    //console.log(token)
  };

  getToken();
  //console.log(getToken())



  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      const fetchUser = async () => {
        // const response = await axios.get(`http://192.168.1.31:3000/users/me`, {
        const response = await axios.get(API_User_me, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.data.status === 200) {
          setUser(response.data.user);
          setIsLoading(true);
        }
      }

      fetchUser();
    }
  }, [isFocused])

  return (
    <ScrollView>
      <View style={styles.container}>
          <View style={styles.header}></View>
          {
          isLoading &&(
           
        <Image source={{ uri: username.urluser }} style={styles.avatar}/>
 
        
          )
        }
          
          <View style={styles.body}>
            <View style={styles.bodyContent}>
            {
          isLoading &&(
           <View style={styles.containerflex}>
            <Text style={styles.info}>○ Welcome</Text>
            <Text style={styles.name}>{username.fname}</Text>
            <Text style={styles.nameuser}>{username.email}</Text>
            </View>
          )
        }
              <TouchableOpacity style={styles.buttonContainer}
              onPress={() =>navigation.navigate('Favorite')}
              >
              <MaterialCommunityIcons name="heart" color={'red'} size={25}
              style={{marginLeft:10}} 
              />
              <Text style={{marginLeft:5}}>Favorite</Text> 
              </TouchableOpacity> 


              <TouchableOpacity style={styles.buttonContainer}
              onPress={() =>navigation.navigate('Favorite')}
              >
              <MaterialCommunityIcons name="cog" color={'red'} size={25}
              style={{marginLeft:10}} 
              />
              <Text style={{marginLeft:5}}>Favorite</Text> 
              </TouchableOpacity>   


              <TouchableOpacity style={styles.buttonContainer}
              onPress={() => Alert.alert('During develop')}
              //onPress={() =>navigation.navigate('Favorite')}
              >
              <MaterialCommunityIcons name="alert-circle-outline" color={'grey'} size={25}
              style={{marginLeft:10}} 
              />
              <Text style={{marginLeft:5}}>App V.1.0.0</Text> 
              </TouchableOpacity>   

              <TouchableOpacity style={styles.loginBtn}>
          <LogoutButton />

        </TouchableOpacity>
            </View>
        </View>
        
      </View>
      

        



     
      
    </ScrollView>



  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.9,
    borderRadius: 0,
    padding: 10,
    backgroundColor: "#D9D9D9",
    width: "40%",
    alignItems: "center",
    marginBottom: 200

  },
  containerflex:{
    justifyContent:'center'
  },
  loginbtn: {
    borderWidth: 0,
    borderRadius: 25,
    padding: 10,
    margin:0,
    backgroundColor: "red",
    alignItems: "center",
    height: "5%",
    width: "100%",
  },
  image: {
    marginBottom: 1,
    height: 140,
    width: 140

  },
  logOutBtn: {
    marginBottom: 10,
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#BF1700",
    alignItems: "center",
    color: "white",
    fontWeight: 'bold',

  },
  header:{
    backgroundColor: "#303030",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  nameuser:{
    fontSize:15,
    color:"black",
    fontWeight:'500',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:4,
    height:45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom:0,
    width:'109%',
    borderRadius:5,
    backgroundColor: "#3333",
  },
});