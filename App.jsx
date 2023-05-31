import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
import { WalletScreen } from './src/screens/Wallet';
import { BuyAssetScreen } from './src/screens/BuyAsset';
import { PaymentsScreen } from './src/screens/Payments';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { SCR_BUY_ASSET, SCR_MAKE_PAYMENTS, SCR_WALLET } from './src/constants/AppStrings';
import Theme from './src/resources/assets/Style';

function App() {

  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={SCR_WALLET}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
           let iconName;
           if(route.name == SCR_WALLET){
            iconName = focused ? 'wallet' : 'wallet-outline';
           } else if (route.name === SCR_BUY_ASSET) {
            iconName = focused ? 'transfer' : 'transfer-outline';
           } else if (route.name === SCR_MAKE_PAYMENTS){
            iconName = focused ? 'smart-card' : 'smart-card-outline';
           } 
          return <MaterialCommunityIcons name={iconName} size={28} color={color}/>;
          },
          tabBarActiveTintColor: Theme.fsColors.secondary,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name={SCR_WALLET} component={WalletScreen}/>
        <Tab.Screen name="BuyAsset" component={BuyAssetScreen} />
        <Tab.Screen name="MakePayments" component={PaymentsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
