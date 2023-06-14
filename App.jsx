import React, { useMemo, useLayoutEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { setItem, getItem } from './src/utils/KeysStorage';
import HomeScreen from './src/screens/Home';
import CreateAccountScreen from './src/screens/CreateAccount';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCR_HOME, SCR_REGISTRATION } from './src/constants/AppStrings';

function App() {
  const [isNewInstall, setIsNewInstall] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const APP_USED = 'FUSE_APP_Opened';

  useLayoutEffect(() => {
    const checkUse = async () => {
      const hasBeenUsed = await getItem(APP_USED);
      if (hasBeenUsed == undefined) {
        await setItem(APP_USED, 'TRUE');
        setIsNewInstall(true);
        setIsLoading(false);
      } else {
        setIsNewInstall(false);
        setIsLoading(false);
      }
    };

    checkUse().catch((error) => {
      console.log(error);
    });
  }, []);

  const Stack = createNativeStackNavigator();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        {...{ initialRouteName: isNewInstall && !isLoading ? SCR_REGISTRATION : SCR_HOME }}
      >
        <Stack.Screen name={SCR_REGISTRATION} component={CreateAccountScreen} />
        <Stack.Screen name={SCR_HOME} component={HomeScreen} options={{ title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
