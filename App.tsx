/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// import * as SecureStore from 'expo-secure-store';

import { RegisterFormBasic, RegisterFormKYC } from './src/screens/RegistrationScreen'
import { LoginScreen } from './src/screens/LoginScreen';
import { BuyAdaScreen } from './src/screens/BuyAdaScreen'
import { TransactionsScreen } from './src/screens/TransactionsScreen'
import { PaymentsScreen } from './src/screens/PaymentsScreen'

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const AuthContext = React.createContext();

// Navigation
const Stack = createNativeStackNavigator();

const HomeScreenHolder = ({navigation, route}) => {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Tab = createBottomTabNavigator();

  const AppNavigationTabs = ({navigation, routes}) => {
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
      let userToken = "def";

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
                  options={{title: 'Fuse',
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
});

export default App;
