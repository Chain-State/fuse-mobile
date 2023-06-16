import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { transactionDummyData, pieDummyData } from '../data/dummy/transactions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Theme, {
  pieColor1,
  pieColor2,
  pieColor3,
  pieColor4,
  pieColor5,
} from '../resources/assets/Style';
import { URI_USER_ASSETS } from '../constants/AppStrings';

import { DonutGraphWithLegend } from '../components/DonutChart';
import { getItem } from '../utils/KeysStorage';
import { ACCOUNT } from '../constants/AppStrings';

export const WalletScreen = ({ navigation, route }) => {
  const [assets, setAssets] = useState([]);
  const [userUuid, setUserUuid] = useState('');

  const importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);

      return result.map((req) => console.log(req));
    } catch (error) {
      console.error(error);
    }
  };

  const parseAssetForChart = async (assets) => {
    const colors = [pieColor1, pieColor2, pieColor3, pieColor4, pieColor5];
    const value = assets.reduce(function (acc, curr) {
      return acc + parseInt(curr.quantity);
    }, 0);
    let pieData = assets.map((item, index) => {
      item = item;
      item['value'] = item['quantity'];
      delete item['quantity'];
      item['color'] = colors[index];
      item['percentage'] = ((parseInt(item['value']) / value) * 100).toFixed(2);
      return item;
    });
    setAssets(pieData);
  };

  const setUserAccount = async () => {
    let account = null;
    try {
      account = await AsyncStorage.getItem(ACCOUNT);
      if (account !== null) {
        console.log(`User Key: ${JSON.parse(account)['uuid']}`);
        setUserUuid(JSON.parse(account)['uuid']);
      } else {
        throw new Error('No account details found for user');
      }
    } catch (error) {
      console.log(`Could not read user account details because: ${error} `);
    }
  };

  const fetchAssets = async (userUuid) => {
    try {
      const response = await fetch(`${URI_USER_ASSETS}/${userUuid}`);
      const result = await response.json();
      result.assets.total.push({ ...result.balance.total, asset_name: '' });
      parseAssetForChart(result.assets.total);
    } catch (error) {
      console.log(`Failed to fetch user assets: ${error}`);
    }
  };

  useEffect(() => {
    setUserAccount();
    fetchAssets(userUuid);
  }, [userUuid]);
  return (
    <View flex={1}>
      {assets && <DonutGraphWithLegend pieData={assets} />}
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
