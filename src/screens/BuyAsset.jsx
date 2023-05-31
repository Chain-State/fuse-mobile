
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
} from 'react-native';

import {
    Colors,
    Header,
} from 'react-native/Libraries/NewAppScreen';

export const BuyAssetScreen = ({navigation}) => {

    const [amountAda, setAmountAda] = useState(0);
    const [amountFiat, setAmountFiat] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(2);
    const [timeSinceLastPriceCheck, setTimeSinceLastPriceCheck] = useState(0)
    const [buyPriceDuration, setBuyPriceDuration] = useState(0)
  
    // TODO: Fetch the current price of ada.
    // TODO: Calculate the trend based past portfolio total values (for the last x time)
    // TODO: Make payment fetch request and return buy details 
    // TODO: Store buy details locally and append to 
    // TODO: Make sure the buy button is tapped in a duration of x time (1 minutes)
    // TODO: If the duration is more then notify user to authorize another buy with new price
  
  
    const isDarkMode = useColorScheme() === 'dark';
    
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
  
    return (
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            width: '100%',
            height: '100%',
            margin: 0,
            padding: 0,
            justifyContent: 'center',
            // alignItems: 'center',
            // bottom: 0,
          }}>
            <TextInput
              style={styles.input}
              placeholder="Amount of Ada to Purchase"
              placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
              onChangeText={data => {
                                        setAmountAda(parseInt(data));
                                        setAmountFiat(amountAda * exchangeRate)
                                    }}
              value={amountAda.toString()}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Required Fiat Amount"
              placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
              editable= {true}
              onChangeText={data => {
                                        setAmountFiat(parseInt(data));
                                        setAmountAda(amountAda / exchangeRate)
                                    }}
              value={amountFiat.toString()}
            />
            <Button
                    onPress={() => {
                      // const userFormData = {...route.params.submittedFormData, ...formKycData}
                      // navigation.navigate('HomeProfile', {submittedFormData: userFormData})
                      // TODO: Show loading spinner
                      // TODO: Make request to buy ada in the backend
                      // TODO: Notify user of transaction success or failure
                      if (timeSinceLastPriceCheck > buyPriceDuration){
                        // TODO: Refetch asset exchange price data
                      } else {
                        // TODO: Perform Buy
                      }
                      }
                    }
                    title="Buy"
                  />        
  
        </View>
    )
}

const styles = StyleSheet.create({

    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
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
});