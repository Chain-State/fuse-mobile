import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { transactionDummyData, pieDummyData } from '../data/dummy/transactions';

import { DonutGraphWithLegend } from '../components/DonutChart';
import Theme from '../resources/assets/Style';

export const WalletScreen = ({ navigation, route }) => {
  return (
    <View flex={1}>
      <DonutGraphWithLegend pieData={pieDummyData} />
      <View style={{ padding: 20 }}>
        <FlatList
          ListHeaderComponent={() => (
            <Text style={Theme.fsFonts.boldFont}>Transaction History</Text>
          )}
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
          data={transactionDummyData}
          renderItem={({ item }) => (
            <View style={Theme.fsList.row}>
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
