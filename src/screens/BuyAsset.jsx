import React, { useEffect, useState } from 'react';
import { Button, TextInput, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import AssetPriceLineChart from '../components/LineChart';
import lineChartData from '../data/dummy/LineChartDummyData';
import CurrencyInput from 'react-native-currency-input';
import Theme from '../resources/assets/Style';
import FsButton from '../components/Button';
import { Text } from 'react-native-svg';
import styles from '../components/ButtonStyles';
import {
  APP_SERVER,
  BTN_BUY_ADA,
  LB_BUY_ADA_AMOUNT,
  LB_BUY_SPEND_AMOUNT,
  SCR_HOME,
  TX_ADA_AMOUNT,
  TX_FIAT_AMOUNT,
  URI_BUY_ASSET,
} from '../constants/AppStrings';

const BuyAssetScreen = ({ navigation }) => {
  const [amountAda, setAmountAda] = useState('');
  const [amountFiat, setAmountFiat] = useState('');
  const [priceHistory, setPriceHistory] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(140);
  const [adaPrice, setAdaPrice] = useState(0.2564);
  const [isProcessing, setIsProcessing] = useState(false);

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
    // fetch('https://openexchangerates.org/api/latest.json?app_id=46d02af8d01c44118f232980cbad46a8', {
    //   method: 'GET',
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data.rates['KES']);
    //     setExchangeRate(data['KES']);
    //   })
    //   .catch((err) => console.log(`Fx rate fetch failed: ${err}`));
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
                  onChangeValue={setAmountAda}
                  style={Theme.fsInput}
                  keyboardType="numeric"
                  clearTextOnFocus={true}
                  showSoftInputOnFocus
                  onChangeText={(data) => {
                    console.log(`Data == ${data}`);
                    console.log(`adaPrice == ${adaPrice}`);
                    console.log(`Rate == ${exchangeRate}`);
                    console.log(`Result: ${parseFloat(data) * adaPrice * exchangeRate}`);
                    const validatedInput = data.startsWith('0') || data == '0' ? '0' : data;
                    setAmountFiat(
                      parseInt(
                        (validatedInput == '' ? '0' : validatedInput) * adaPrice * exchangeRate
                      )
                        .toFixed(2)
                        .toString()
                    );
                  }}
                  value={amountAda}
                />
                <Text style={Theme.fsLabel}>{LB_BUY_SPEND_AMOUNT}</Text>
                <CurrencyInput
                  value={amountFiat}
                  prefix="Ksh "
                  precision={0}
                  delimiter=","
                  minValue={0}
                  onChangeValue={setAmountFiat}
                  keyboardType="numeric"
                  style={Theme.fsInput}
                  onChangeText={(data) => {
                    // const validatedInput = data.startsWith('0') || data == '0' ? '0' : data;
                    setAmountAda(
                      parseFloat((amountFiat == '' ? '0' : amountFiat) / (adaPrice * exchangeRate))
                        .toFixed(2)
                        .toString()
                    );
                  }}
                />
                <FsButton
                  style={{ ...styles.appButtonContainer }}
                  onPress={(amountAda, amountFiat) => {
                    console.log('Called function');
                    // setIsProcessing(true);
                    fetch(URI_BUY_ASSET, {
                      method: 'POST',
                      body: {
                        userUuid: '240434dd-07e7-403c-9027-dec588e867c5',
                        assetType: 'Ada',
                        tokenQuantity: amountAda,
                        paymentAmount: amountFiat,
                      },
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                    })
                      .then((res) => res.json())
                      .then((data) => data)
                      .catch((err) => console.log(`Tx failed ${err}`));
                    // navigation.navigate(SCR_HOME);
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
