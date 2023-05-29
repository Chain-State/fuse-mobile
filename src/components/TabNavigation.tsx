import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { TransactionsScreen } from "../screens/Transactions";
import { BuyAdaScreen } from "../screens/BuyAda";
import { PaymentsScreen } from "../screens/Payments";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const TabNavigator = ({navigation, route}) => {

    const Tab = createBottomTabNavigator();
  
    const AppNavigationTabs = ({}) => {
      return (
        <NavigationContainer
          independent={true}>
          <Tab.Navigator
            initialRouteName="Transactions"
            screenOptions={{
              tabBarActiveTintColor: '#e91e63',
              headerShown: false
            }}
          >
            <Tab.Screen 
              name="Transactions" 
              component={TransactionsScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
              }} 
              />
            <Tab.Screen name="BuyAda" component={BuyAdaScreen} />
            <Tab.Screen name="Make Payments" component={PaymentsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <AppNavigationTabs navigation={navigation} routes={route}/>
    )
  }

  export default TabNavigator;