
import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  Button,
  Dimensions,
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
import { DonutGraphWithLegend } from '../components/DonutChart'


const screenHeight = Dimensions.get('window').height;

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

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const textColorStyle = {
        color: isDarkMode ?  Colors.lighter : Colors.darker,
    }

    const [userDisplayName, setUserDisplayName] = useState("Admin")

    const [tokenTimeout, setTokenTimeout] = useState(10000);
  
    const [currentAdaPrice, setCurrentAdaPrice] = useState(0.4);
  
    const [transactionHistory, setTransactionHistory] = useState([{}]);

    const [assetPriceData, setAssetPriceData] = useState([{}])

    const priceDummyData = [{value: 15}, {value: 30}, {value: 26}, {value: 45}];

    const transactionData = [
        {key: 'Transaction 1'},
        {key: 'Transaction 2'},
        {key: 'Transaction 3'},
        {key: 'Transaction 4'},
        {key: 'Transaction 5'},
        {key: 'Transaction 6'},
        {key: 'Transaction 7'},
        {key: 'Transaction 8'},
        {key: 'Transaction 9'},
        {key: 'Transaction 10'},
        ]

    const pieDummyData = [
        {
            value: 47,
            color: '#009FFF',
            gradientCenterColor: '#006DFF',
            focused: true,
        },
        {value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE'},
        {value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3'},
        {value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97'},
        ];

  
    // TODO:  Fetch transaction history data from db 
    // TODO:  Fetch asset price for Ada (api)
    // TODO:  Fetch currently owned asset list. (name, quantity)
    // TODO:  For each owned asset get 
    // TODO:  Calculate the total portfolio value

    // setAssetPriceData(priceDummyData)
    // setTransactionHistory(transactionData)
    // setUserDisplayName("Admin")


    // TODO: Each of the sections should roughly cover 1/3 of the height
    return (
    <ScrollView>
        <View
            style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
                width: '100%',
                height: '100%',
                margin: 0,
                padding: 0,
                flexDirection: 'column',
            }}>
                <Text>The Ada payments platform</Text>
                <Text style={textColorStyle}>Hello {userDisplayName} </Text>
                <AssetPriceLineChart title={"Assets"} chartData={priceDummyData}/>
                <DonutGraphWithLegend pieData={pieDummyData} />
                <Text style={styles.highlight}>Transactions</Text>
                <FlatList
                    data={transactionData}
                    renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                />
        </View>
       </ScrollView>
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
    textStyle: {
        marginBottom:20,
        color: Colors.lighter,
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
  