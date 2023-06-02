import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import { transactionDummyData, pieDummyData } from '../data/dummy/transactions';

import { DonutGraphWithLegend } from '../components/DonutChart';
import Theme from '../resources/assets/Style';

export const WalletScreen = ({ navigation, route }) => {
  const [userDisplayName, setUserDisplayName] = useState('Admin');

  const [tokenTimeout, setTokenTimeout] = useState(10000);

  const [currentAdaPrice, setCurrentAdaPrice] = useState(0.4);

  const [transactionHistory, setTransactionHistory] = useState([{}]);

  const [assetPriceData, setAssetPriceData] = useState([{}]);

  const priceDummyData = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 45 }];

  return (
    <View flex={1}>
      {/* <AssetPriceLineChart title={"Assets"} chartData={priceDummyData}/> */}
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'flex-start',
                justifyItems: 'start',
              }}
            >
              <Text style={Theme.fsList.item}>{item.date}</Text>
              <Text style={Theme.fsList.item}>{item.type}</Text>
              <Text style={Theme.fsList.item}>{item.amount}</Text>
              <Text style={Theme.fsList.item}>{item.status}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};
