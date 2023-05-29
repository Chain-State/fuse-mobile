import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterFormBasic, RegisterFormKYC } from './src/screens/Registration';
import LoginScreen from './src/screens/Login';
import TabNavigator from './src/components/TabNavigation';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Register'>
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  title: 'Login',
                }}
              />
              <Stack.Screen
                name="Register"
                component={RegisterFormBasic}
                options={{
                  title: 'Welcome',
                }}
              />
              <Stack.Screen
                name="KYCForm"
                component={RegisterFormKYC}
                options={{
                  title: 'KYC Details',
                }}
              />
            </>
              <Stack.Screen
                name="HomeScreen"
                component={TabNavigator}
                options={{
                  title: 'Fuse',
                }}
              />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
