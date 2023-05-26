/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// import * as SecureStore from 'expo-secure-store';

import {RegisterFormBasic, RegisterFormKYC} from './src/screens/RegistrationScreen'
import { LoginScreen } from './src/screens/LoginScreen';
import {BuyAdaScreen} from './src/screens/BuyAdaScreen'
import {TransactionsScreen} from './src/screens/TransactionsScreen'

import {Home} from './Home'

type SectionProps = PropsWithChildren<{
  title: string;
}>;


const AuthContext = React.createContext();

// Navigation
const Stack = createNativeStackNavigator();

const HomeScreenHolder = ({navigation, route}) => {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Tab = createBottomTabNavigator();

  function AppNavigationTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen 
          name="Transactions" 
          component={TransactionsScreen} />
        <Tab.Screen name="BuyAda" component={BuyAdaScreen} />
        <Tab.Screen name="Make Payments" component={BuyAdaScreen} />
      </Tab.Navigator>
    );
  }
  return (
    <AppNavigationTabs/>
  )
}

const ProfileScreen = ({navigation, route}) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => signIn({ username, password })} />
    </View>
  );
}

function App(): JSX.Element {


  // const [isLoading, setLoading] = useState(true)
  // const [isSignout, setSignout] = useState(false)
  // const [userToken, setUserToken] = useState("Tokens")


  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      // dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
      <NavigationContainer >
        <AuthContext.Provider value={authContext}>
          <Stack.Navigator>
          {state.userToken == null ? (
            <>
              <Stack.Screen
                name="SignIn"
                component={LoginScreen}
                options={{title: 'Login',
                        headerStyle: { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter},
                        headerTitleStyle: {
                          fontSize: 18,
                          color: isDarkMode ? Colors.lighter : Colors.darker ,
                        },
                        }}
              />
              <Stack.Screen
                name="Register"
                component={RegisterFormBasic}
                options={{title: 'Welcome',
                        headerStyle: { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter},
                        headerTitleStyle: {
                          fontSize: 18,
                          color: isDarkMode ? Colors.lighter : Colors.darker ,
                        },
                        }}
              />
              <Stack.Screen
                name="KYCForm"
                component={RegisterFormKYC}
                options={{title: 'KYC Details',
                        headerStyle: { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter},
                        headerTitleStyle: {
                          fontSize: 18,
                          color: isDarkMode ? Colors.lighter : Colors.darker ,
                        },
                        }}
              />
              </>
            ) : (
              <>
                <Stack.Screen 
                  name="HomeScreen" 
                  component={HomeScreenHolder} 
                  options={{title: 'Home',
                            headerStyle: { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter},
                            headerTitleStyle: {
                              fontSize: 18,
                              color: isDarkMode ? Colors.lighter : Colors.darker ,
                            },
                          }}
                />
              </>
            )
          }
          </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 50,
    margin: 20,
    borderWidth: 1,
    borderColor: Colors.lighter,
    borderRadius: 10,
    padding: 10,
  },
  submitButton: {
    width: 50,

  },
});

export default App;
