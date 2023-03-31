// import { StatusBar } from 'expo-status-bar';
// import * as React from 'react';
// import { KeyboardAvoidingView,View, Text, SafeAreaView, TextInput, StyleSheet, Button, TouchableOpacity, Image, Pressable } from 'react-native';
// import axios from 'axios';
// import { ScrollView } from 'react-native-gesture-handler';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { Myapp_Api } from "@env";

// export default function RegisterScreen() {
//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("")
//   const [confirm, setConfirm] = React.useState("");

//   const _storeData = async (data) => {
//     try {
//       await AsyncStorage.setItem('@Token', data);
//       //console.log(data);
//       navigation.navigate('App');
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   const API_login = "http://192.168.1.31:3000/users"
//   const register = () => {
//     if(!email || !password) {
//       alert('Complete your information');
//       return;
//     }
//     if(password !== confirm){
//         alert('Password not match,Please Try Again')
//         return;
//     }
//     // axios.post(`${Myapp_Api}}/user`,
//     axios.post(API_login,
   
//     {

//       email: email,
//       password: password,
     

//     })
//     .then((response) => {
//       if(response.data.status === 'ok') {
//         console.log('Login SUCCESS')
//         // navigation.navigate('Login');
//       }
//     })
//     .catch((error) => {
//       console.log('Can not connect',error.message);
//     })
//   }




//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior="padding"
//     >
       
//             <View style={{display: 'flex', justifyContent: 'flex-start', height: '100%'}}> 
//             <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 10, marginTop: 80,right: 120,left:4 ,color:'white'}}>SIGN UP  </Text>
//             <View>

//             <TextInput
//                 placeholder='Email'
//                 style={styles.inputlogin}
//                 onChangeText={setEmail}
//                 value={email}
//                 clearButtonMode="always"
//             />
      
           
      
//             <TextInput
//                 secureTextEntry={true}
//                 placeholder='Password'
//                 style={styles.inputlogin}
//                 onChangeText={setPassword}
//                 value={password}
//                 clearButtonMode="always"
//             />
//             <TextInput
//                 secureTextEntry={true}
//                 placeholder='ConfirmPassword'
//                 style={styles.inputlogin}
//                 onChangeText={setConfirm}
//                 value={confirm}
//                 clearButtonMode="always"
//             />
//             <TouchableOpacity style={styles.RegisBtn}
//                 onPress={register}>
//                 <Text style={styles.btn}>SUBMIT</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={{marginVertical: 10,flexDirection: 'row'}}
//             // onPress={() => {navigation.navigate('Login')}}
//           >
          
//           </TouchableOpacity>
//             </View>
//             </View>
       
// </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputlogin:{
//     borderWidth: 0.15,
//             borderRadius: 5,
//             padding: 10,
//             backgroundColor: "#FFF",
//             width: "100%",
//             alignItems: "center",
//             color: "white",
//             fontWeight: 'bold',
//             marginBottom: 10,
//             color:'black'
//   },
//   btn:{
//     borderWidth: 0.15,
//             borderRadius: 5,
//             padding: 10,
//             backgroundColor: "red",
//             width: "100%",
//             alignItems: "center",
//             color: "white",
//             fontWeight: 'bold',
//             marginBottom: 10
//   }
// });

import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { KeyboardAvoidingView,View, Text, SafeAreaView, TextInput, StyleSheet, Button, TouchableOpacity, Image, Pressable } from 'react-native';
import styles from '../../styles';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
// import dotenv from 'dotenv';
// dotenv.config();

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("")
    const [confirm, setConfirm] = React.useState("");
    const [fname,SetfName] = React.useState("");




    //wifi wu
    const API_Regis ="http://172.20.10.5:3000/users"
    //wigi หอ
  //  const API_Regis = "http://192.168.1.31:3000/users"
// const API_Regis = process.env.API_REGIS;
    // const API = "http://127.0.0.1:3000/users";
    const register = () => {
        if( !email || !password || !fname ) {
          alert('Complete your information');
          return;
        }
        if(password !== confirm){
            alert('Password not match,Please Try Again')
            return;
        }
        //axios.post(`${MYAPP_API}}/users`,
        axios.post(API_Regis,
       
        {
          fname : fname,
          email: email,
          password: password,
         

        })
        .then((response) => {
          if(response.data.status === 'ok') {
            navigation.navigate('Login');
          }
        })
        .catch((error) => {
          console.log('Can not connect',error.message);
        })
      }
    


    return (
      <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
       
            <View style={{display: 'flex', justifyContent: 'flex-start', height: '100%'}}> 
            <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 10, marginTop: 80,right: 120,left:4 ,color:'white'}}>SIGN UP  </Text>
            <View>

            <TextInput
                placeholder='Email'
                style={styles.textInput}
                onChangeText={setEmail}
                value={email}
                clearButtonMode="always"
            />
            <TextInput
                
                placeholder='Fullname'
                style={styles.textInput}
                onChangeText={SetfName}
                value={fname}
                clearButtonMode="always"
            />
        
      
            <TextInput
                secureTextEntry={true}
                placeholder='Password'
                style={styles.textInput}
                onChangeText={setPassword}
                value={password}
                clearButtonMode="always"
            />
            <TextInput
                secureTextEntry={true}
                placeholder='ConfirmPassword'
                style={styles.textInput}
                onChangeText={setConfirm}
                value={confirm}
                clearButtonMode="always"
            />
            <TouchableOpacity style={styles.RegisBtn}
                onPress={register}>
                <Text style={styles.buttonLabel}>SUBMIT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginVertical: 10,flexDirection: 'row'}}
            onPress={() => {navigation.navigate('Login')}}
          >
           <Text style={{color:'#ffff'}}>If already account ?</Text>
           <Text style={{color: '#FFF', fontWeight: '700', fontSize: 15, textAlign: 'left',marginLeft:5,backgroundColor:'#1F9B5E'}}>Sign In</Text>
          </TouchableOpacity>
            </View>
            </View>
       
</KeyboardAvoidingView>
        
    )
}