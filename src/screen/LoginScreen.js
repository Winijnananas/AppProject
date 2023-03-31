// import { async } from '@firebase/util';
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, SafeAreaView, Image, Alert } from 'react-native'
// import { auth } from '../../firbase'
import styles from '../../styles';
import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();

// const navigation = useNavigation()
console.disableYellowBox = true;

const LoginScreen = ({ navigation }) => {
  //const API_login = "http://192.168.1.31:3000/login";
  //wifi wu
  const API_login ="http://172.20.10.5:3000/login"
  //wifi หอ
  // const API_login = "http://192.168.1.31:3000/login";
// const API_login = process.env.API_LOGIN;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('@Token', data);
      //console.log(data);
      navigation.navigate('Tab');
    } catch (err) {
      console.log(err);
    }
  }

  const Login = ({ }) => {
    console.log('login');
    //axios.post(`${MYAPP_API}}/login`
    //axios.post(`API_login`,
    axios.post(API_login,
      {
        email: email,
        password: password
      })
      .then((response) => {
        if (response.data.status === 'ok') {
          _storeData(response.data.token);
        } else {
          alert('Please,Enter your Account');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }



  return (
    <ScrollView
      style={styles.container}
      behavior="padding"
    >

      <View style={{ display: 'flex', justifyContent: 'flex-start', height: '100%' }}>

        <Text style={styles.title}>SIGN IN</Text>

        <View>


          <TextInput
            style={styles.textInput}
            onChangeText={setEmail}
            value={email}
            placeholderTextColor="#A9A9A9"
            autoCapitalize='none'
            placeholder="Username"
            clearButtonMode="always"
          />

          <TextInput
            style={styles.textInput}
            onChangeText={setPassword}
            value={password}
            placeholderTextColor="#A9A9A9"
            // secureTextEntry 
            // right={<TextInput.Icon icon="eye"/>}
            secureTextEntry={true}
            autoCapitalize='none'
            placeholder="Password"
            clearButtonMode="always"
          />


          <TouchableOpacity
            style={styles.loginButton}
             //onPress={() =>navigation.navigate('App')}
            onPress={Login}
          >
            <Text style={styles.buttonLabel}
            // onPress={login}
            // onPress={() => Alert.alert('Login Complete ')}
            >LOGIN</Text>
          </TouchableOpacity>

          { /* register */}
          <TouchableOpacity style={{ marginVertical: 10, flexDirection: 'row' }}
            onPress={() => { navigation.navigate('Regis') }}
          >
            <Text style={{ color: '#ffff' }}>New User?</Text>
            <Text style={{ color: '#FFF', fontWeight: '700', textDecorationLine: 'underline', fontSize: 15, textAlign: 'left', marginLeft: 5 }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default LoginScreen