import React, { useEffect, useState } from 'react';
import FsButton from '../components/Button';
import { Text, View, FlatList } from 'react-native';
import { transactionDummyData } from '../data/dummy/transactions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BTN_BUY_ADA, SCR_BUY_ASSET } from '../constants/AppStrings';
import Theme, {
  pieColor1,
  pieColor2,
  pieColor3,
  pieColor4,
  pieColor5,
} from '../resources/assets/Style';
import { URI_USER_ASSETS } from '../constants/AppStrings';

import { DonutGraphWithLegend } from '../components/DonutChart';
import { ACCOUNT } from '../constants/AppStrings';
import styles from '../components/ButtonStyles';

export const WalletScreen = ({ navigation, route }) => {
  const [assets, setAssets] = useState([]);
  const [userUuid, setUserUuid] = useState('');

  const parseAssetsData = async (assets) => {
    if (assets.length == 0) {
      return;
    }
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
        console.log(`(wallet read): User Key: ${JSON.parse(account)['uuid']}`);
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
      if (result.error) {
        throw new Error(result.error);
      }
      result.assets.total.push({ ...result.balance.total, asset_name: '' });
      parseAssetsData(result.assets.total);
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
      {assets.length >= 1 ? (
        <DonutGraphWithLegend pieData={assets} />
      ) : (
        <View style={Theme.fsCharts.fsDonutChart.container}>
          <View
            style={{
              ...Theme.fsCharts.fsDonutChart.chart,
              backgroundColor: Theme.fsCharts.fsDonutChart.container.backgroundColor,
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              height: 300,
            }}
          >
            <Text
              style={{
                fontFamily: Theme.fsFonts.boldFont.fontFamily,
                paddingRight: 10,
                fontSize: 23,
                paddingBottom: 20,
              }}
            >
              No Assets in Wallet
            </Text>
            <FsButton
              style={{ ...styles.appButtonContainer, width: 300 }}
              onPress={(amountAda, amountFiat) => {
                console.log('Called function');
                navigation.navigate(SCR_BUY_ASSET);
              }}
              title={`${BTN_BUY_ADA} with M-Pesa`}
            />
          </View>
        </View>
      )}
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
