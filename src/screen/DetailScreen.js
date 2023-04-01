import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,SafeAreaView} from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';

const DetailScreen = ({ route }) => {
  const API_Invest = 'http://192.168.1.31:3000/investments';
  const [investment, setInvestment] = useState(null);
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ]
  };
  
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
    style: {
      borderRadius: 16
    }
  };

 
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
      <Image source={{ uri: 'https://img.freepik.com/free-vector/investor-with-laptop-monitoring-growth-dividends-trader-sitting-stack-money-investing-capital-analyzing-profit-graphs-vector-illustration-finance-stock-trading-investment_74855-8432.jpg?w=2000' }} style={styles.poster} resizeMode="cover" />
      <View style ={styles.containerDetail}>
        
        <Text style={styles.title}>{investment.investment}</Text>
      
    
    <Text style={{fontSize:20,textDecorationLine: 'underline',color:'#025AF0',fontWeight:'600'}}>รอบที่: {investment.roundNumber}</Text>
    <View style={{ flexDirection: 'row' }}>
        <Text style={styles.labelvest}>ประเภทการลงทุน: </Text>
        <Text style={styles.labelvestRow}>{investment.type}</Text>
    </View>
    
    <View style={{ marginVertical: 10, flexDirection: 'row' }}>
    <Text style={styles.labelvest}>งบการลงทุน: </Text>
    <Text style={styles.labelCost}>{investment.cost}</Text>
    </View>
    
    {/* <Text>วันที่เปิดรอบ : {investment.startdate}</Text> */}
    <Text style={styles.labelvestRow}>
      วันที่เปิดรอบ: {moment(investment.startdate).format('DD MMMM YYYY')}
    </Text>

    <Text style={[styles[investment.status], styles.labelvestStat]}>
      สถานะ: {investment.status.toUpperCase()}
    </Text>
    </View>

    <View>
      <LineChart
        data={data}
        width={300}
        height={200}
        chartConfig={chartConfig}
      />
    </View>

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
  },
  containerDetail: {
    flex: 1,
    padding:15,
    backgroundColor:'#FFF',
    borderRadius:10
    
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
 
  button: {
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
  titleRound: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    left:50
    
  
  },
  labelvest: {
    fontSize: 19,
    fontWeight:'bold',
  },
  labelCost: {
    fontSize: 19,
    color:'#0052D8'
  },
  labelvestRow: {
    fontSize: 19,
  },
  labelvestStat: {
    fontSize: 15,
    
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
  }, poster: {
    width: "100%",
    height: 281,
    justifyContent: "flex-start",
    backgroundColor: "red",

},
  
});

export default DetailScreen;
