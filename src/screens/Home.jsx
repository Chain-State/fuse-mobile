import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  SCR_WALLET,
  SCR_BUY_ASSET,
  SCR_MAKE_PAYMENTS,
  SCR_SWAP_TOKENS,
} from '../constants/AppStrings';
import { WalletScreen } from './Wallet';
import BuyAssetScreen from './BuyAsset';
import PaymentsScreen from './Payments';
import SwapScreen from './Swap';
import Theme from '../resources/assets/Style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { ACCOUNT } from '../constants/AppStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen() {
  const [account, setAccount] = useState('');

  useEffect(() => {
    userAccount();
  }, [account]);

  const userAccount = async () => {
    let account = null;
    try {
      account = await AsyncStorage.getItem(ACCOUNT);
      if (account !== null) {
        console.log(`User Key in TabNav: ${JSON.parse(account)['uuid']}`);
        setAccount(JSON.parse(account)['uuid']);
      } else {
        throw new Error('No account details found for user');
      }
    } catch (error) {
      console.log(`Could not read user account details because: ${error} `);
    }
  };

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName={SCR_WALLET}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name == SCR_WALLET) {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === SCR_BUY_ASSET) {
            iconName = focused ? 'circle-multiple' : 'circle-multiple-outline';
          } else if (route.name === SCR_MAKE_PAYMENTS) {
            iconName = focused ? 'credit-card' : 'credit-card-outline';
          } else if (route.name === SCR_SWAP_TOKENS) {
            iconName = focused ? 'swap-horizontal' : 'swap-horizontal';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Theme.fsColors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: Theme.fsTabNavigation.labels,
        tabBarIconStyle: Theme.fsTabNavigation.icons,
        tabBarStyle: Theme.fsTabNavigation.tab,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name={SCR_WALLET}
        component={WalletScreen}
        initialParams={{ userAccount: account }}
      />
      <Tab.Screen
        name={SCR_BUY_ASSET}
        component={BuyAssetScreen}
        initialParams={{ userAccount: account }}
      />
      <Tab.Screen
        name={SCR_MAKE_PAYMENTS}
        component={PaymentsScreen}
        initialParams={{ userAccount: account }}
      />
      <Tab.Screen
        name={SCR_SWAP_TOKENS}
        component={SwapScreen}
        initialParams={{ userAccount: account }}
      />
    </Tab.Navigator>
  );
}

export default HomeScreen;
