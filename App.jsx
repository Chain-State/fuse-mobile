import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
import { WalletScreen } from './src/screens/Wallet';
import { BuyAssetScreen } from './src/screens/BuyAsset';
import { PaymentsScreen } from './src/screens/Payments';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SCR_WALLET } from './src/constants/AppStrings';

function App() {

  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={SCR_WALLET}
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          headerShown: false,
        }}
      >
        <Tab.Screen
          name={SCR_WALLET}
          component={WalletScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen name="BuyAda" component={BuyAssetScreen} />
        <Tab.Screen name="Make Payments" component={PaymentsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
