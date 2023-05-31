import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUpForm, RegisterFormKYC } from './src/screens/SignUpForm';
import LoginScreen from './src/screens/Login';
import TabNavigator from './src/components/TabNavigation';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='SignUpForm'>
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  title: 'Login',
                }}
              />
              <Stack.Screen
                name="SignUpForm"
                component={SignUpForm}
                options={{
                  title: 'Create Account',
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
