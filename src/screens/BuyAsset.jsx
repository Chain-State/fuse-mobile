import React, { useEffect, useState } from 'react';
import { Text, Button, TextInput, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import AssetPriceLineChart from '../components/LineChart';
import lineChartData from '../data/dummy/LineChartDummyData';
import CurrencyInput from 'react-native-currency-input';
import Theme from '../resources/assets/Style';
import FsButton from '../components/Button';
import styles from '../components/ButtonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCOUNT } from '../constants/AppStrings';
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

const BuyAssetScreen = ({ navigation, route }) => {
  const [amountAda, setAmountAda] = useState('');
  const [amountFiat, setAmountFiat] = useState('');
  const [priceHistory, setPriceHistory] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [adaPrice, setAdaPrice] = useState(0.2564);
  const [isProcessing, setIsProcessing] = useState(false);
  const [account, setAccount] = useState({});

  const getTokenExRate = () => {
    fetch(
      'https://rest.coinapi.io/v1/exchangerate/ADA/USD/history?period_id=1DAY&time_start=2023-06-11T23:59:00.0000000Z&time_end=2023-06-15T23:59:00.0000000Z&display_name=day',
      {
        method: 'GET',
        headers: {
          'X-CoinAPI-Key': '7CC0179B-877B-4473-AD94-B0AB33921F18',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        const priceData = data.map((item) => {
          item = item;
          delete item.time_period_start;
          delete item.time_period_end;
          delete item.rate_low;
          delete item.rate_high;
          delete item.rate_open;
          delete item.time_open;
          delete item.time_close;
          item['value'] = (item.rate_close * 142).toFixed(2);
          return item;
        });
        console.log(`PriceData == ${JSON.stringify(priceData)}`);
        setPriceHistory(priceData);
      })
      .catch((error) => console.log(`Price fetch failed: ${error}`));
  };

  const getLocalCurrencyRate = () => {
    console.log(`[BuyAsset]-Key: ${route.params.userAccount}`);
    fetch('https://openexchangerates.org/api/latest.json?app_id=46d02af8d01c44118f232980cbad46a8', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.rates['KES']);
        setExchangeRate(data.rates['KES']);
      })
      .catch((err) => console.log(`Fx rate fetch failed: ${err}`));
  };

  const buyAda = () => {
    console.log(`Ada value: ${amountAda}`);
    console.log(`Fiat value: ${amountFiat}`);
    console.log(`Account: ${account}`);
    const details = {
      // userUuid: 'ea7b43d4-f50c-40ab-8de4-90cc4a2ecbdf',
      userUuid: account,
      assetType: 'Ada',
      tokenQuantity: amountAda,
      paymentAmount: 1,
    };
    console.log('Executing buy transaction...');
    // setIsProcessing(true);
    const response = fetch(URI_BUY_ASSET, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    })
      .then((res) => {
        if (res.ok) {
          res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((data) => data)
      .catch((err) => console.log(`Tx failed ${err}`));
    // navigation.navigate(SCR_HOME);
  };

  const userAccount = async () => {
    let account = null;
    try {
      account = await AsyncStorage.getItem(ACCOUNT);
      if (account !== null) {
        console.log(`(wallet read): User Key: ${JSON.parse(account)['uuid']}`);
        setAccount(JSON.parse(account)['uuid']);
      } else {
        throw new Error('No account details found for user');
      }
    } catch (error) {
      console.log(`Could not read user account details because: ${error} `);
    }
  };

  useEffect(() => {
    // getTokenExRate();
    getLocalCurrencyRate();
    userAccount();
  }, []);

  return (
    <>
      <KeyboardAvoidingView enabled={true} behavior="padding">
        <SafeAreaView>
          <View style={Theme.fsContainer}>
            {priceHistory && (
              <AssetPriceLineChart title="Current ADA Price" chartData={lineChartData} />
            )}
            <View style={{ marginTop: 10 }}>
              <Text style={{ ...Theme.fsLabel, height: 20 }}>{LB_BUY_ADA_AMOUNT}</Text>
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
              <Text style={{ ...Theme.fsLabel, height: 20 }}>{LB_BUY_SPEND_AMOUNT}</Text>
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
                onPress={buyAda}
                title={BTN_BUY_ADA}
              />
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

export default BuyAssetScreen;
