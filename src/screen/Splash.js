import { View, Text ,Image,StyleSheet} from 'react-native'
import React ,{useEffect, useState}from 'react'
export default function Splash({navigation}) {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Login');
        //    handleGetToken();
        }, 2000);
      })
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'#FFFF'}}>
    <Text style={{fontSize:100,fontWeight:'bold'}}>WELCOME TO APP</Text>
      {/* <Text style={{fontWeight:'bold',color:'#D93D04',fontSize:20}}>ACCOUNTING APP📈</Text> */}
  
    </View>
  )
}
