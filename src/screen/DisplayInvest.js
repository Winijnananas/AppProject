import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
const DisplayInvest = ({ navigation }) => {
  const API_Invest = 'http://192.168.1.31:3000/investments';
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const response = await axios.get(API_Invest);
      const data = response.data;

      if (data.status === 'ok') {
        setInvestments(data.investments);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item ,index}) => (
    <TouchableOpacity key={item._id} style={styles.investmentContainer}
    onPress={() => { navigation.navigate('Detail', { id: item._id }) }}
    >
         <Text style={styles.itemIndex}>{index + 1}</Text>
      <Text style={styles.investmentName}>{item.investment}</Text>
     
      {/* <Text style={styles.itemText}>{item.investment}</Text> */}
      {/* <Text style={styles.labelvest}>รอบที่ : {item.roundNumber}</Text> */}
      {/* <Text style={styles.labelvest}>ประเภทการลงทุน : {item.type}</Text> */}
      {/* <Text>สถานะ : {item.status.toUpperCase()}</Text> */}
      <Text style={[styles[item.status]]} >สถานะ : {item.status.toUpperCase()}</Text>
     <TouchableOpacity
     onPress={() => { navigation.navigate('Detail', { id: item._id }) }}>
        <Text style={{color:'#42A5F5',marginTop:5,fontWeight:'700',textDecorationLine: 'underline'}}>กดเพื่อดูรายละเอียด</Text>
     </TouchableOpacity>
      {/* <Text>งบการลงทุน : {item.cost}</Text> */}
      {/* <Text>วันที่เปิดรอบ : {item.startdate}</Text> */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ประวัติการลงทุน</Text>
      <FlatList
        data={investments}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignContent:'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  investmentContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
    marginBottom: 16,
  },
  investmentName: {
    
    color:'#1E38A1',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  active:{
    paddingTop:2,
    paddingBottom:5,
    color:"#FFF",
    borderRadius:5,
    backgroundColor:'green',
    width:'30%',
    height:25,
    alignContent:'center',
    justifyContent:'center',
    fontWeight:'700'
   
  },
  active:{
    paddingTop:2,
    paddingBottom:5,
    color:"#FFF",
    borderRadius:5,
    backgroundColor:'green',
    width:'30%',
    height:25,
    alignContent:'center',
    justifyContent:'center',
    fontWeight:'500'
   
  },
  unactive:{
    paddingTop:2,
    paddingBottom:5,
    color:"#FFF",
    borderRadius:5,
    backgroundColor:'red',
    width:'40%',
    height:25,
    alignContent:'center',
    justifyContent:'center',
    fontWeight:'700'
  },
  labelvest:{
    fontSize:19,
    fontWeight:'500',
  }, item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemIndex: {
    flexDirection:'row',
    marginRight: 10,
    fontWeight: 'bold',
    fontSize:20,
  },
  itemText: {
    flex: 1,
  },
});

export default DisplayInvest;
