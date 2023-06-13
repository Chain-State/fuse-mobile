import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { transactionDummyData, pieDummyData } from '../data/dummy/transactions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DonutGraphWithLegend } from '../components/DonutChart';
import Theme from '../resources/assets/Style';
import { getItem } from '../utils/KeysStorage';
import { ACCOUNT } from '../constants/AppStrings';
import { fetchAssets } from '../services/Transactions';

export const WalletScreen = ({ navigation, route }) => {
  const [assets, setAssets] = useState({});

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

  useEffect(async () => {
    // const userUuid = (async () => {
    //   await account();
    // })();
    setAssets(fetchAssets(await account()));
  }, []);
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
