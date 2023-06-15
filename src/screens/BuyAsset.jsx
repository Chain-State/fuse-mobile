import React, { useEffect, useState } from 'react';
import { Button, TextInput, View } from 'react-native';
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
  const [amountAda, setAmountAda] = useState(0);
  const [amountFiat, setAmountFiat] = useState(0);
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    //get ADA price history.Default 1 week
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
  });

  return (
    <>
      <View style={Theme.fsContainer}>
        {priceHistory && <AssetPriceLineChart title="Current ADA Price" chartData={priceHistory} />}
        <View style={{ marginTop: 50 }}>
          <Text style={Theme.fsLabel}>{LB_BUY_ADA_AMOUNT}</Text>
          <TextInput
            style={Theme.fsInput}
            placeholder={TX_ADA_AMOUNT}
            editable={true}
            onChangeText={(data) => {
              setAmountAda(parseInt(data));
              setAmountFiat(amountAda * exchangeRate);
            }}
            // value={amountAda.toString()}
            keyboardType="numeric"
          />
          <Text style={Theme.fsLabel}>{LB_BUY_SPEND_AMOUNT}</Text>
          <TextInput
            style={Theme.fsInput}
            placeholder={TX_FIAT_AMOUNT}
            editable={true}
            onChangeText={(data) => {
              setAmountFiat(parseInt(data));
              setAmountAda(amountAda / exchangeRate);
            }}
            // value={amountFiat.toString()}
            keyboardType="numeric"
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
      </View>
    </>
  );
};

export default BuyAssetScreen;
