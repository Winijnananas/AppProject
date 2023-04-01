import React, { useState, useEffect } from "react";
import { StyleSheet,AppState, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

export default function LogoutButton() {
  const [appState, setAppState] = useState(AppState.currentState);
  const navigation = useNavigation();
  const handleAppStateChange = (nextAppState) => {
    
    if (appState.match(/inactive|background/) && nextAppState === "active") {
          
    Alert.alert('Warning','You are not allowed to leave this app!',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}]
          );
        }
        setAppState(nextAppState);
      };
    
      useEffect(() => {
        AppState.addEventListener("change", handleAppStateChange);
    
        return () => {
          AppState.removeEventListener("change", handleAppStateChange);
        };
      }, []);
    
      // render your app components
    

  // Logout function to remove the stored token and navigate to the login page
  const Logout = async() => {
    try {
      await AsyncStorage.removeItem('@Token');
      console.log('logout');
      navigation.replace('Splash'); // Navigate to the login page after logout
    } catch(error) {
      console.log(error.message);
    }
  }
  
  return(
    <TouchableOpacity style={styles.card} onPress={Logout}>
      <Text style={styles.label}>ออกจากระบบ</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop:350,
    width:200,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#BF1700',
    marginVertical: 4
  },
  label: {
    color: '#FFF',
    fontWeight: '800',
    alignSelf: 'center',
    fontSize:20
  }
});