import { View, Text, Button, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Image, ImageBackground, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { useIsFocused } from '@react-navigation/native';
import LogoutButton from '../components/LogoutButton';
import axios from 'axios';


console.disableYellowBox = true;




export default function UserScreen({ navigation }) {




  const [shown, show] = React.useState(false);
  const onPress = () => show(!shown);
  // const API_User_me = "http://172.20.10.5:3000/users/:id";
  const API_ENDPOINT = "http://172.20.10.5:3000/user";
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState();
  const [user, setUser] = useState();


  const getToken = async () => {
    //await AsyncStorage.getItem('@Token');
    setToken(await AsyncStorage.getItem('@Token'));
    // console.log('THIS IS TOKEN:',token)
  };

  getToken();
  //console.log(getToken())
  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ENDPOINT, {
          headers: {
            "Authorization": `Bearer ${token}`
          },
        });
        const data = response.data;
        setUser(data.user);
        console.log('this is user',user)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [isFocused]);

  if (!user) {
    return (
      <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }


  return (
    <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
       <Text style={{fontSize:50,fontWeight:'bold',marginBottom:200}}>UserScreen</Text>
      <Text style={{fontSize:20,fontWeight:'500',color:'blue'}}>{`HELLO ! : ${user.fname}`}</Text>
      <Text style={{fontSize:15,fontWeight:'600',color:'black'}}>{`Email : ${user.email}`}</Text>
  


      <TouchableOpacity style={styles.loginBtn}>
        <LogoutButton />
        { shown ? <Hello /> : null }
      </TouchableOpacity>
    </View>
  );
};
          

           
       
      
      





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
  containerflex: {
    justifyContent: 'center'
  },
  loginbtn: {
    borderWidth: 0,
    borderRadius: 25,
    padding: 10,
    margin: 0,
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
  header: {
    backgroundColor: "#303030",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  nameuser: {
    fontSize: 15,
    color: "black",
    fontWeight: '500',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 4,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 0,
    width: '109%',
    borderRadius: 5,
    backgroundColor: "#3333",
  },
});