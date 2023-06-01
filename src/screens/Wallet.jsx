import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';

import AssetPriceLineChart from '../components/LineChart';
import { DonutGraphWithLegend } from '../components/DonutChart';
import Theme from '../resources/assets/Style';

export const WalletScreen = ({ navigation, route }) => {
  const [userDisplayName, setUserDisplayName] = useState('Admin');

  const [tokenTimeout, setTokenTimeout] = useState(10000);

  const [currentAdaPrice, setCurrentAdaPrice] = useState(0.4);

  const [transactionHistory, setTransactionHistory] = useState([{}]);

  const [assetPriceData, setAssetPriceData] = useState([{}]);

  const priceDummyData = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 45 }];

  const transactionData = [
    { key: 'Transaction 1' },
    { key: 'Transaction 2' },
    { key: 'Transaction 3' },
    { key: 'Transaction 4' },
    { key: 'Transaction 5' },
    { key: 'Transaction 6' },
    { key: 'Transaction 7' },
    { key: 'Transaction 8' },
    { key: 'Transaction 9' },
    { key: 'Transaction 10' },
  ];

  const pieDummyData = [
    {
      value: 47,
      color: Theme.fsCharts.fsDonutChart.chart.pieColor1,
      gradientCenterColor: '#006DFF',
      focused: true,
    },
    {
      value: 40,
      color: Theme.fsCharts.fsDonutChart.chart.pieColor2,
      gradientCenterColor: '#3BE9DE',
    },
    {
      value: 16,
      color: Theme.fsCharts.fsDonutChart.chart.pieColor3,
      gradientCenterColor: '#8F80F3',
    },
    {
      value: 3,
      color: Theme.fsCharts.fsDonutChart.chart.pieColor4,
      gradientCenterColor: '#FF7F97',
    },
  ];

  return (
    <ScrollView>
      <View>
        {/* <AssetPriceLineChart title={"Assets"} chartData={priceDummyData}/> */}
        <DonutGraphWithLegend pieData={pieDummyData} />
        <Text>Transactions</Text>
        <FlatList data={transactionData} renderItem={({ item }) => <Text>{item.key}</Text>} />
      </View>
    </ScrollView>
  );
};
