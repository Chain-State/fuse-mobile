import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/components/TabNavigation';


function App() {
  return (
    <NavigationContainer>
                <TabNavigator/>
    </NavigationContainer>
  );
}

export default App;
