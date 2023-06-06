import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
import { WalletScreen } from './src/screens/Wallet';
import { BuyAssetScreen } from './src/screens/BuyAsset';
import { PaymentsScreen } from './src/screens/Payments';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  SCR_BUY_ASSET,
  SCR_MAKE_PAYMENTS,
  SCR_SWAP_TOKENS,
  SCR_WALLET,
} from './src/constants/AppStrings';
import Theme from './src/resources/assets/Style';
import { setItem, getItem } from './src/utils/KeysStorage';
import { RegisterFormKYC, SignUpForm } from './src/screens/SignUp';

function App() {
  const [firstUse, setFirstUse] = useState(true);

  useEffect(() => {
    const checkUse = async () => {
      const returnUse = await getItem('isFirst');
      if (returnUse) {
        setFirstUse(false);
      } else {
        await setItem('isFirst', 'NO');
      }
    };

    checkUse().catch((error) => {
      console.log(error);
    });
  }, []);

  const Tab = createBottomTabNavigator();

  return (
    <>
      {firstUse ? (
        <SignUpForm />
      ) : (
        <NavigationContainer independent={true}>
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
            })}
          >
            <Tab.Screen name={SCR_WALLET} component={WalletScreen} />
            <Tab.Screen name={SCR_BUY_ASSET} component={BuyAssetScreen} />
            <Tab.Screen name={SCR_MAKE_PAYMENTS} component={PaymentsScreen} />
            <Tab.Screen name={SCR_SWAP_TOKENS} component={PaymentsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}

export default App;
