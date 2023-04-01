import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

import moment from 'moment';

const DetailScreen = ({ route }) => {
  const API_Invest = 'http://192.168.1.31:3000/investments';
  const [investment, setInvestment] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const { id } = route.params || {};
      if (id) {
        fetchInvestment(id);
      }
    }, [route.params])
  );

  const fetchInvestment = async (id) => {
    try {
      const response = await axios.get(`${API_Invest}/${id}`);
      const data = response.data;

      if (data.status === 'ok') {
        setInvestment(data.investment);
        console.log(data.investment)
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async () => {
    try {
        if (!investment) {
            console.error("No investment selected");
            return;
        }
        const response = await axios.delete(`${API_Invest}/${investment.id}`);
        const data = response.data;

        if (data.status === 'ok') {
            // If the deletion is successful, navigate back to the previous screen
            navigation.goBack();
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error(error);
    }
};
  if (!investment) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <Text style={styles.title}>{investment.investment}</Text>
    <Text style={styles.labelvest}>รอบที่: {investment.roundNumber}</Text>
    <Text style={styles.labelvest}>ประเภทการลงทุน: {investment.type}</Text>
    <Text style={[styles[investment.status], styles.statusText]}>
      สถานะ: {investment.status.toUpperCase()}
    </Text>
    <Text style={styles.costText}>งบการลงทุน: {investment.cost}</Text>
    {/* <Text>วันที่เปิดรอบ : {investment.startdate}</Text> */}
    <Text style={styles.dateText}>
      วันที่เปิดรอบ: {moment(investment.startdate).format('DD MMMM YYYY')}
    </Text>
    <TouchableOpacity style={styles.button} onPress={handleDelete}>
      <Text style={styles.buttonText}>Delete</Text>
      
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonAdd} onPress={handleDelete}>
      <Text style={styles.buttonText}>add</Text>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  active: {
    paddingTop: 2,
    paddingBottom: 5,
    color: '#FFF',
    borderRadius: 5,
    backgroundColor: 'green',
    width: '30%',
    height: 25,
    alignContent: 'center',
    justifyContent: 'center',
    fontWeight: '700',
  },
  unactive: {
    paddingTop: 2,
    paddingBottom: 5,
    color: '#FFF',
    borderRadius: 5,
    backgroundColor: 'red',
    width: '40%',
    height: 25,
    alignContent: 'center',
    justifyContent: 'center',
    fontWeight: '700',
  },
  labelvest: {
    fontSize: 19,
    fontWeight: '500',
  }, button: {
    backgroundColor: '#ff6961',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    alignSelf: 'center',
  },
  buttonAdd: {
    flexDirection:'row',
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  labelvest: {
    fontSize: 16,
    marginBottom: 4,
  },
  pending: {
    color: 'orange',
    fontSize: 16,
    marginBottom: 4,
  },
  completed: {
    color: 'green',
    fontSize: 16,
    marginBottom: 4,
  },
  cancelled: {
    color: 'red',
    fontSize: 16,
    marginBottom: 4,
  },
  
});

export default DetailScreen;
