
import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import {
    Colors,
    Header,
} from 'react-native/Libraries/NewAppScreen';

import AssetPriceLineChart from '../components/LineChart'


// Section Component
// function Section({children, title}: SectionProps): JSX.Element {
//     const isDarkMode = useColorScheme() === 'dark';
//     return (
//       <View style={styles.sectionContainer}>
//         <Text
//           style={[
//             styles.sectionTitle,
//             {
//               color: isDarkMode ? Colors.white : Colors.black,
//             },
//           ]}>
//           {title}
//         </Text>
//         <Text
//           style={[
//             styles.sectionDescription,
//             {
//               color: isDarkMode ? Colors.light : Colors.dark,
//             },
//           ]}>
//           {children}
//         </Text>
//       </View>
//     );
//   }

export const TransactionsScreen = ({navigation, route}) => {

    const [tokenTimeout, setTokenTimeout] = useState(10000);
  
    const [currentAdaPrice, setCurrentAdaPrice] = useState(0.4);
  
    const [transactionHistory, setTransactionHistory] = useState([{}]);

    const [assetPriceData, setAssetPriceData] = useState([{}])

    const priceDummyData = [{value: 15}, {value: 30}, {value: 26}, {value: 40}];

    const transactionData = [
        {key: 'Devin'},
        {key: 'Dan'},
        {key: 'Dominic'},
        {key: 'Jackson'},
        {key: 'James'},
        {key: 'Joel'},
        {key: 'John'},
        {key: 'Jillian'},
        {key: 'Jimmy'},
        {key: 'Julie'},
        ]

  
    // TODO :  Fetch transaction history data from db 
    // TODO :  Fetch asset price for Ada (api)
    // TODO :  Fetch currently owned asset list. (name, quantity)
    // TODO ;  For each owned asset get 
    // TODO :  Calculate the total portfolio value

    setAssetPriceData(priceDummyData)
    setTransactionHistory(transactionData)
  
    return (
      <View>
            <Text>The Ada payments platform</Text>
            <AssetPriceLineChart title={"Assets"} chartData={assetPriceData}/>
            {/* <Text style={styles.highlight}>Hello {route.params.userKyc}</Text> */}
            <Text style={styles.highlight}>Hello User </Text>
            <FlatList
                data={transactionData}
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            />
       </View>
      );
  }


  const styles = StyleSheet.create({
    highlight: {
        fontWeight: '700',
    },
    input: {
        height: 50,
        margin: 20,
        borderWidth: 1,
        borderColor: Colors.lighter,
        borderRadius: 10,
        padding: 10,
    },
    submitButton: {
        width: 50,
    
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
});  
  