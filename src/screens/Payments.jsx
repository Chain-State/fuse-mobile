import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

export const PaymentsScreen = ({ navigation }) => {
  const [amountAda, setAmountAda] = useState(0);
  const [amountFiat, setAmountFiat] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(2);

  return (
    <View>
      <TextInput
        placeholder="Amount of Ada to Purchase"
        onChangeText={(data) => {
          setAmountAda(parseInt(data));
          setAmountFiat(amountAda * exchangeRate);
        }}
        value={amountAda.toString()}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Required Fiat Amount"
        editable={true}
        onChangeText={(data) => {
          setAmountFiat(parseInt(data));
          setAmountAda(amountAda / exchangeRate);
        }}
        value={amountFiat.toString()}
      />
    </View>
  );
};
