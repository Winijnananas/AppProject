import { KeyboardAvoidingView, StyleSheet, Text, TextInput, Keyboard, TouchableOpacity, TouchableWithoutFeedback, View, ScrollView, SafeAreaView, Image, Alert, Dimensions, Button, FlatList, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState, useRef } from 'react'
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../../css/styletwo';
import axios from 'axios';
const HomeScreen = ({ navigation }) => {
    const [roundNumber, setRoundNumber] = useState('');
    const [cost, setCost] = useState('');
    const [investment, setInvestment] = React.useState('');
    const [type, setType] = useState();
    const [status, setStatus] = useState();
    const pickerRef = useRef();




    const API_Invest = "http://192.168.1.31:3000/investments"
// const API_Regis = process.env.API_REGIS;
    // const API = "http://127.0.0.1:3000/users";
    const InpurInvest = () => {
        if( !roundNumber || !cost || !investment || !type || !status ) {
          alert('Complete your information');
          return;
        }
    
        //axios.post(`${MYAPP_API}}/users`,
        axios.post(API_Invest,
       
        {
          roundNumber:roundNumber,
          cost:cost,
          investment:investment,
          type:type,
          status:status
         

        })
        .then((response) => {
          if(response.data.status === 'Done Submit Data') {
            // navigation.navigate('Login');
          }
        })
        .catch((error) => {
          console.log('Can not submit',error.message);
        })
      }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View
                style={styles.container}
                behavior="padding"
            >

                
                    
                <View style={{ display: 'flex', justifyContent: 'flex-start', height: '100%' }}>
                    <Text style={styles.titlefirst}>กรอกสิ่งที่ต้องการลงทุน</Text>
                    {/* <Text style={{ color: 'red', fontWeight: '700', fontSize: 15, textAlign: 'left', marginLeft: 5 }}>เงินที่เหลือจากการลงทุน</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' ,marginLeft: 5 ,color: 'orange'}}>{income}</Text>
                    <Text style={{ fontSize: 15,marginLeft: 5  }}>จาก</Text>
                    <Text style={{ color: '#13678A', fontWeight: '700', fontSize: 15, textAlign: 'left', marginLeft: 5 }}>{cost}</Text> */}


                    <View>
                        <View style={{ justifyContent: 'center', alignContent: 'center', alignContent: 'center' }}>
                            <Text>รอบการลงทุน:</Text>
                            <TextInput
                                style={{
                                    marginBottom: 5,
                                    borderWidth: 0,
                                    height: 35,
                                    padding: 5,
                                    width: '20%'


                                }}
                                placeholder="กรอกรอบ"
                                value={roundNumber}
                                onChangeText={setRoundNumber}
                                keyboardType="numeric"
                            />

                          
                            <TextInput
                                style={styles.textInputHome}
                                placeholder="เงินลงทุน"
                                value={cost}
                                onChangeText={setCost}
                                keyboardType="numeric"
                            />
                        </View>

                        <TextInput
                            style={styles.textInputHome}
                            onChangeText={setInvestment}
                            value={investment}
                            placeholderTextColor="#A9A9A9"
                            autoCapitalize='none'
                            placeholder="สิ่งที่ต้องการลงทุน"
                            clearButtonMode="always"


                        />

                        {/* <TextInput
                            style={styles.textInputHome}
                            onChangeText={setPassword}
                            keyboardType='numeric'
                            value={price}
                            placeholderTextColor="#A9A9A9"
                            // secureTextEntry={true}
                            autoCapitalize='none'
                            placeholder="จำนวนเงิน"
                            clearButtonMode="always"

                        /> */}
                        {/* <Text style={{
                        textAlign: 'center',
                        justifyContent: 'center',
                        fontSize: 15,
                        fontWeight: "800",
                        color: "#606A74",
                    }}>เลือกประเภทการลงทุน</Text> */}
                        <TextInput
                            style={{
                                height: 40,
                                width: "100%",
                                borderWidth: 1,
                                borderColor: "#3D3D3D",
                                borderRadius: 7,
                                backgroundColor: "#FFFF",
                                padding: 5,
                                color: "#A9A9A9",
                                fontWeight: "700",
                                fontSize: 15,
                                marginTop: 5,
                                marginBottom: 5,
                            }}
                            onChangeText={setType}

                            value={type}
                            placeholderTextColor="#A9A9A9"
                            // secureTextEntry={true}
                            autoCapitalize='none'
                            placeholder="กำหนดประเภทเอง"
                            clearButtonMode="always"

                        />
                        <Text style={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            fontSize: 15,
                            fontWeight: "800",
                            color: "#606A74",
                        }}>เลือกประเภทการลงทุน</Text>
                        <Picker
                            ref={pickerRef}
                            selectedValue={type}
                            onValueChange={(itemValue, itemIndex) =>
                                setType(itemValue)}
                            style={{ marginTop: 10 }}
                        >
                            <Picker.Item label="ไม่มีประเภท" value="none" />
                            <Picker.Item label="เกษตรกรรม" value="เกษตรกรรม" />
                            <Picker.Item label="การประมง" value="ประมง" />
                            <Picker.Item label="ขายออก" value="ขายออก" />
                            <Picker.Item label="ได้รับเงิน" value="ได้รับเงิน" />
                            <Picker.Item label="จ่ายเงิน" value="จ่ายเงิน" />
                            <Picker.Item label="ถอนเงิน" value="ถอนเงิน" />
                            <Picker.Item label="ไม่ระบุ" value="ไม่ระบุ" />
                        </Picker>
                        <Text style={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            fontSize: 15,
                            fontWeight: "800",
                            color: "#606A74",
                        }}>สถานะ</Text>
                        <Picker
                            ref={pickerRef}
                            selectedValue={status}
                            onValueChange={(itemValue, itemIndex) =>
                                setStatus(itemValue)}
                            style={{ marginTop: 10 }}
                        >
                            <Picker.Item label="ระบุสถานะ" value="ระบุสถานะ" />
                            <Picker.Item label="Active" value="active" />
                            <Picker.Item label="Unactive" value="unactive" />
                            
                        </Picker>




                        <TouchableOpacity
                            style={styles.loginButtonHome}
                            //  onPress={() =>navigation.navigate('Tab')}

                            onPress={() => {
                                InpurInvest();
                                setCost('');
                                setInvestment('');
                                setType('');
                                setRoundNumber('');
                                setStatus('');
                                Alert.alert("บันทึกข้อมูลลงในฐานข้อมูลเเล้ว");
                            }}

                        >


                            <Text style={styles.buttonLabel}
                            >บันทึกข้อมูล</Text>
                        </TouchableOpacity>


                       

                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
 
  )
}

export default HomeScreen
