import React, { useEffect, useState } from 'react';
import { Button, TextInput, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import AssetPriceLineChart from '../components/LineChart';
import lineChartData from '../data/dummy/LineChartDummyData';
import Theme from '../resources/assets/Style';
import FsButton from '../components/Button';
import { Text } from 'react-native-svg';
import {
  BTN_BUY_ADA,
  LB_BUY_ADA_AMOUNT,
  LB_BUY_SPEND_AMOUNT,
  TX_ADA_AMOUNT,
  TX_FIAT_AMOUNT,
} from '../constants/AppStrings';

const BuyAssetScreen = ({ navigation }) => {
  const [amountAda, setAmountAda] = useState('');
  const [amountFiat, setAmountFiat] = useState('');
  const [priceHistory, setPriceHistory] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(140);
  const [adaPrice, setAdaPrice] = useState(0.2564);

  useEffect(() => {
    //get ADA price history.Default 1 week
    // fetch(
    //   'https://rest.coinapi.io/v1/exchangerate/ADA/USD/history?period_id=1DAY&time_start=2023-06-11T23:59:00.0000000Z&time_end=2023-06-15T23:59:00.0000000Z&display_name=day',
    //   {
    //     method: 'GET',
    //     headers: {
    //       'X-CoinAPI-Key': '7CC0179B-877B-4473-AD94-B0AB33921F18',
    //     },
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(JSON.stringify(data));
    //     const priceData = data.map((item) => {
    //       item = item;
    //       delete item.time_period_start;
    //       delete item.time_period_end;
    //       delete item.rate_low;
    //       delete item.rate_high;
    //       delete item.rate_open;
    //       delete item.time_open;
    //       delete item.time_close;
    //       item['value'] = (item.rate_close * 142).toFixed(2);
    //       return item;
    //     });
    //     console.log(`PriceData == ${JSON.stringify(priceData)}`);
    //     setPriceHistory(priceData);
    //   })
    //   .catch((error) => console.log(`Price fetch failed: ${error}`));
    fetch('https://openexchangerates.org/api/latest.json?app_id=46d02af8d01c44118f232980cbad46a8', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.rates['KES']);
        setExchangeRate(data['KES']);
      })
      .catch((err) => console.log(`Fx rate fetch failed: ${err}`));
  }, []);

  return (
    <>
      <KeyboardAvoidingView enabled={true} behavior="padding">
        <SafeAreaView>
          <View style={Theme.fsContainer}>
            {priceHistory && (
              <AssetPriceLineChart title="Current ADA Price" chartData={lineChartData} />
            )}
            {exchangeRate && (
              <View style={{ marginTop: 50 }}>
                <Text style={Theme.fsLabel}>{LB_BUY_ADA_AMOUNT}</Text>
                <TextInput
                  style={Theme.fsInput}
                  placeholder={TX_ADA_AMOUNT}
                  editable={true}
                  onChangeText={(data) => {
                    console.log(`Data == ${data}`);
                    console.log(`adaPrice == ${adaPrice}`);
                    console.log(`Rate == ${exchangeRate}`);
                    console.log(`Result: ${parseFloat(data) * adaPrice * exchangeRate}`);
                    setAmountAda(data);
                    // setAmountFiat(data);
                    setAmountFiat(
                      (parseFloat(data) * adaPrice * exchangeRate).toFixed(2).toString()
                    );
                  }}
                  value={amountAda}
                  // keyboardType="numeric"
                />
                <Text style={Theme.fsLabel}>{LB_BUY_SPEND_AMOUNT}</Text>
                <TextInput
                  style={Theme.fsInput}
                  placeholder={TX_FIAT_AMOUNT}
                  editable={true}
                  onChangeText={(data) => {
                    setAmountFiat(data);
                    setAmountAda(
                      (parseFloat(data) * adaPrice * exchangeRate).toFixed(2).toString()
                    );
                  }}
                  value={amountFiat}
                  // keyboardType="numeric"
                />
                <FsButton
                  onPress={() => {
                    if (timeSinceLastPriceCheck > buyPriceDuration) {
                    } else {
                    }
                  }}
                  title={BTN_BUY_ADA}
                />
              </View>
            )}
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

export default BuyAssetScreen;
