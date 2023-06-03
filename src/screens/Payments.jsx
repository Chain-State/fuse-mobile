import React, { useState } from 'react';
import { TextInput, View, FlatList, Text } from 'react-native';
import Theme from '../resources/assets/Style';
import { PaymentsHistoryDummyData } from '../data/dummy/PaymentsHistoryData';

export const PaymentsScreen = ({ navigation }) => {
  const [amountAda, setAmountAda] = useState(0);
  const [amountFiat, setAmountFiat] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(2);

  return (
    <View style={{ ...Theme.fsContainer, justifyContent: 'flex-end' }}>
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
      <View style={{ padding: 20, height: 500 }}>
        <FlatList
          ListHeaderComponent={() => (
            <View>
              <View>
                <Text style={{ ...Theme.fsFonts.boldFont, marginBottom: 15 }}>
                  Transaction History
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ ...Theme.fsFonts.boldFont, marginRight: 5, marginLeft: 5 }}>
                  Date
                </Text>
                <Text style={{ ...Theme.fsFonts.boldFont, marginLeft: 5, marginRight: 5 }}>
                  Details
                </Text>
                <Text style={{ ...Theme.fsFonts.boldFont, marginLeft: 5, marginRight: 5 }}>
                  Amount
                </Text>
                <Text style={{ ...Theme.fsFonts.boldFont, marginLeft: 5, marginRight: 5 }}>
                  Status
                </Text>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
          data={PaymentsHistoryDummyData}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={Theme.fsList.column}>{item.date}</Text>
              <Text style={Theme.fsList.column}>{item.type}</Text>
              <Text style={Theme.fsList.column}>{item.amount}</Text>
              <Text style={Theme.fsList.column}>{item.status}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};
