import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, LoginScreen} from './src/screens';


const Stack = createStackNavigator();

export const Home = () => {
    return (
        <NavigationContainer>
      <Stack.Navigator initialRouteName="Root" headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Auth" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}