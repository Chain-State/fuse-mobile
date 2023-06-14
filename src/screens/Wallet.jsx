import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { transactionDummyData, pieDummyData } from '../data/dummy/transactions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URI_USER_ASSETS } from '../constants/AppStrings';

import { DonutGraphWithLegend } from '../components/DonutChart';
import Theme from '../resources/assets/Style';
import { getItem } from '../utils/KeysStorage';
import { ACCOUNT } from '../constants/AppStrings';

export const WalletScreen = ({ navigation, route }) => {
  const [assets, setAssets] = useState([]);
  const [legend, setLegend] = useState(new Map());

  const importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);

      return result.map((req) => req);
    } catch (error) {
      console.error(error);
    }
  };

  const account = async () => {
    let account = null;
    try {
      account = await getItem(ACCOUNT);
    } catch (error) {
      console.log(`Cannot get account: ${error} `);
    }
    return JSON.parse(account).uuid;
  };

  parseAssetForChart = (assets) => {
    console.log(`assets=${assets}`);
    let pieData = assets.map((item) => {
      item = item;
      item['value'] = item['quantity'];
      delete item['quantity'];
      return item;
    });

    //get total value of assets
    const initial = 0;
    const totalAssetsValue = assets.reduce((acc, val) => {
      acc + parseInt(val['value']), initial;
    });
    console.log(`Sum of assets: ${totalAssetsValue}`);

    //create map of asset name and percentage of total
    let assetsValueMap = new Map();
    pieData.forEach((asset) => {
      assetsValueMap.set(asset['asset_name'], (parseInt(asset['value']) / totalAssetsValue) * 100);
    });

    console.log(`Assets parsed: ${JSON.stringify(pieData)}`);
    return { pieData, assetsValueMap };
  };

  useEffect(() => {
    const fetchAssets = async (userUuid) => {
      try {
        const response = await fetch(`${URI_USER_ASSETS}/${userUuid}`);
        const result = await response.json();
        result.assets.total.push({ ...result.balance.total, asset_name: '' });
        const { pieData, assetsValueMap } = parseAssetForChart(result.assets.total);
        setAssets(pieData);
        setLegend(assetsValueMap);
        console.log(`Values: ${assetsValueMap}`);
      } catch (error) {
        console.log(`Failed to fetch user assets: ${error}`);
      }
    };

    fetchAssets('2f767661-495e-460d-a380-8d4cfa947906');
  }, []);
  return (
    <View flex={1}>
      <DonutGraphWithLegend pieData={assets} />
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
