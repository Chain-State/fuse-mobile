import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { WalletScreen } from '../screens/Wallet';
import { BuyAssetScreen } from '../screens/BuyAsset';
import { PaymentsScreen } from '../screens/Payments';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SCR_WALLET } from '../constants/AppStrings';

const TabNavigator = ({ navigation, route }) => {
  const Tab = createBottomTabNavigator();

  const AppNavigationTabs = ({}) => {
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
  };
  return <AppNavigationTabs navigation={navigation} routes={route} />;
};

export default TabNavigator;
