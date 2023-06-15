import React, { useState } from 'react';
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
  const [exchangeRate, setExchangeRate] = useState(2);
  const [timeSinceLastPriceCheck, setTimeSinceLastPriceCheck] = useState(0);
  const [buyPriceDuration, setBuyPriceDuration] = useState(0);

  return (
    <>
      <View style={Theme.fsContainer}>
        <AssetPriceLineChart title="Current ADA Price" chartData={lineChartData} />
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
