import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import AssetPriceLineChart from '../components/LineChart';
import lineChartData from '../data/dummy/LineChartDummyData';
import Theme from '../resources/assets/Style';
import FsButton from '../components/Button';

export const BuyAssetScreen = ({ navigation }) => {
  const [amountAda, setAmountAda] = useState(0);
  const [amountFiat, setAmountFiat] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(2);
  const [timeSinceLastPriceCheck, setTimeSinceLastPriceCheck] = useState(0);
  const [buyPriceDuration, setBuyPriceDuration] = useState(0);

  return (
    <>
      <View style={Theme.fsContainer}>
        <AssetPriceLineChart chartData={lineChartData} />
        <View>
          <TextInput
            style={Theme.fsInput}
            placeholder="Required Fiat Amount"
            editable={true}
            onChangeText={(data) => {
              setAmountAda(parseInt(data));
              setAmountFiat(amountAda * exchangeRate);
            }}
            value={amountAda.toString()}
            keyboardType="numeric"
          />
          <TextInput
            style={Theme.fsInput}
            placeholder="Required Fiat Amount"
            editable={true}
            onChangeText={(data) => {
              setAmountFiat(parseInt(data));
              setAmountAda(amountAda / exchangeRate);
            }}
            value={amountFiat.toString()}
          />
          <FsButton
            onPress={() => {
              if (timeSinceLastPriceCheck > buyPriceDuration) {
              } else {
              }
            }}
            title="Buy"
          />
        </View>
      </View>
    </>
  );
};
