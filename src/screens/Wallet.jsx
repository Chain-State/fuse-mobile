import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';

import AssetPriceLineChart from '../components/LineChart';
import { DonutGraphWithLegend } from '../components/DonutChart';
import Theme from '../resources/assets/Style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const WalletScreen = ({ navigation, route }) => {
  const [userDisplayName, setUserDisplayName] = useState('Admin');

  const [tokenTimeout, setTokenTimeout] = useState(10000);

  const [currentAdaPrice, setCurrentAdaPrice] = useState(0.4);

  const [transactionHistory, setTransactionHistory] = useState([{}]);

  const [assetPriceData, setAssetPriceData] = useState([{}]);

  const priceDummyData = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 45 }];

  const transactionData = [
    {
      key: 'tx1',
      date: '12-05-23',
      amount: 'Buy Ada',
      type: 'Buy',
      status: <MaterialCommunityIcons name="check-bold" size={15} color="green" />,
    },
    {
      key: 'tx2',
      date: '12-05-23',
      type: 'Buy Ada',
      amount: 'KES 783.00',
      status: <MaterialCommunityIcons name="close" size={15} color="red" />,
    },
    {
      key: 'tx3',
      date: '12-05-23',
      type: 'Buy',
      amount: 'KES 783.00',
      status: <MaterialCommunityIcons name="check-bold" size={15} color="green" />,
    },
    {
      key: 'tx4',
      date: '12-05-23',
      type: 'Buy',
      amount: 'KES 783.00',
      status: <MaterialCommunityIcons name="check-bold" size={15} color="green" />,
    },
    {
      key: 'tx5',
      date: '12-05-23',
      type: 'Buy',
      amount: 'KES 783.00',
      status: <MaterialCommunityIcons name="check-bold" size={15} color="green" />,
    },
    {
      key: 'tx6',
      date: '12-05-23',
      type: 'Payment',
      amount: 'KES 783.00',
      status: <MaterialCommunityIcons name="close" size={15} color="red" />,
    },
    {
      key: 'tx7',
      date: '12-05-23',
      type: 'Swap',
      amount: 'KES 400.00',
      status: <MaterialCommunityIcons name="check-bold" size={15} color="green" />,
    },
    {
      key: 'tx8',
      date: '12-05-23',
      type: 'Buy',
      amount: 'KES 2,500.00',
      status: <MaterialCommunityIcons name="check-bold" size={15} color="green" />,
    },
    {
      key: 'tx9',
      date: '12-05-23',
      type: 'Buy',
      amount: 'KES 200.00',
      status: <MaterialCommunityIcons name="check-bold" size={15} color="green" />,
    },
    {
      key: 'tx10',
      date: '12-05-23',
      type: 'Buy',
      amount: 'KES 1,500.00',
      status: <MaterialCommunityIcons name="check-bold" size={15} color="green" />,
    },
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
          data={transactionData}
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
