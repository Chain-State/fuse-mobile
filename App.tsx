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

import {Home} from './Home'

type SectionProps = PropsWithChildren<{
  title: string;
}>;

// Section Component
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


// Navigation
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TransactionsScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

type User = {
  uid: string;
  username: string;
  registrationTime: string;
};


const RegisterFormBasic = ({navigation}) => {

  const [formData, setFormData] = useState({
    fname: "",
    sname: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  
  const { fname, sname, phone, email, password, passwordConfirm } = formData;

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return(
    <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        {/* <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}> */}
          {/* {/* <Header /> */}
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
              width: '100%',
              height: '100%',
              margin: 0,
              padding: 0,
              justifyContent: 'center',
              // alignItems: 'center',
              // bottom: 0,
            }}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor= {isDarkMode ? Colors.white : Colors.black}
              onChangeText={data => setFormData({...formData, fname: data })}
              value={fname}
            />
            <TextInput
              style={styles.input}
              placeholder="Second Name"
              placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
              onChangeText={data => setFormData({...formData, sname: data })}
              value={sname}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
              onChangeText={data => setFormData({...formData, email: data })}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
              onChangeText={data => setFormData({...formData, phone: data })}
              value={phone}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
              onChangeText={data => setFormData({...formData, password: data })}
              value={password}
            />
            <TextInput
              style={styles.input}
              placeholder="Repeat Password"
              placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
              onChangeText={data => setFormData({...formData, passwordConfirm: data })}
              value={passwordConfirm}
            />
            <Button
              onPress={() => {
                // TODO: Proper form validation
                if (password === passwordConfirm){
                  
                  navigation.navigate('KYCForm', {submittedFormData: formData})
                } else {
                  console.log("Passwords don't match!!")
                }
                }
              }
              title="Next"
            />        
          </View>
        {/* </ScrollView> */}
      </SafeAreaView>
  )
  };

  const RegisterFormKYC = ({navigation, route}) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<User>();
  
    const createUser = async (userData) => {
      try {
        const response = await fetch('https://mywebsite.com/endpoint/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userData
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        // Expect a body with user db details (including a uuid)
        // TODO: save uuid to local async storage
        const json = await response.json();
        setData(json.user);
        return json;
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        console.log(data?.username)
      }
    };
  
  
    const [formKycData, setFormData] = useState({
      idNumber: "",
      passPortNumber: "",
      dateOfBirth: "",
    });
    
    const { idNumber, passPortNumber, dateOfBirth } = formKycData;
  
    const isDarkMode = useColorScheme() === 'dark';
  
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
  
    return(
      <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          {/* <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}> */}
            {/* {/* <Header /> */}
            <View
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
                width: '100%',
                height: '100%',
                margin: 0,
                padding: 0,
                justifyContent: 'center',
                // alignItems: 'center',
                // bottom: 0,
              }}>
              <TextInput
                style={styles.input}
                placeholder="Id Number"
                placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
                onChangeText={data => setFormData({...formKycData, idNumber: data })}
                value={idNumber}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Passport Number (Optional)"
                placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
                onChangeText={data => setFormData({...formKycData, passPortNumber: data })}
                value={passPortNumber}
              />
              <TextInput
                style={styles.input}
                placeholder="Date Of birth (ddmmyy)"
                placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
                onChangeText={data => setFormData({...formKycData, dateOfBirth: data })}
                value={dateOfBirth}
              />
              {isLoading && <ActivityIndicator/>}
              <Button
                onPress={() => {
                  setLoading(true)
                  // const userFormData = {...route.params.submittedFormData, ...formKycData}
                  // navigation.navigate('HomeProfile', {submittedFormData: userFormData})
                  // TODO: Show loading spinner
                  // TODO: properly check legit id number
                  setTimeout(function() {
                    if (idNumber != null){
                      // TODO: Convert date string to timestamp
                      // dummy POST request
  
                      const userFormData = {...route.params.submittedFormData, ...formKycData}
                      const userCreatePromise = createUser(userFormData)
                      userCreatePromise.then((data) => {
                        console.log(data)
                        setLoading(false)
                        // TODO: Remove loading spinner
                        // navigation.navigate('TransactionsScreen', {submittedFormData: userFormData})
                      });
                      // navigation.navigate('HomeProfile', {submittedFormData: userFormData})
                    } else {
                      //TODO: Prompt user for correction
                      console.log("Invalid Id number")
                    }
                  }, 3000);
                  setLoading(false)
                  }
                }
                title="Finish"
              />        
            </View>
          {/* </ScrollView> */}
        </SafeAreaView>
    )
    };


    const LoginScreen = ({navigation, route}) => {

      const [isLoading, setLoading] = useState(false);
      const [data, setData] = useState<User>();
    
      const authorizeUser = async (userAuthCredentials) => {
        try {
          const response = await fetch('https://mywebsite.com/endpoint/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userAuthCredentials
            }),
          });
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
          // Expect a body with user db details (including a uuid)
          // TODO: save uuid to local async storage
          const json = await response.json();
          setData(json.user);
          return json;
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
          console.log(data?.username)
        }
      };
    
    
      const [authorizationCredentials, setAuthorizationCredentials] = useState({
        passCode: "",
        authorizationToken: "",
      });
      
      const { passCode, authorizationToken } = authorizationCredentials;
    
      const isDarkMode = useColorScheme() === 'dark';
    
      const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      };
    
      return(
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            {/* <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={backgroundStyle}> */}
              {/* {/* <Header /> */}
              <View
                style={{
                  backgroundColor: isDarkMode ? Colors.black : Colors.white,
                  width: '100%',
                  height: '100%',
                  margin: 0,
                  padding: 0,
                  justifyContent: 'center',
                  // alignItems: 'center',
                  // bottom: 0,
                }}>
                <TextInput
                  style={styles.input}
                  placeholder="Id Number"
                  placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
                  onChangeText={data => setAuthorizationCredentials({...authorizationCredentials, passCode: data })}
                  value={passCode}
                />
                <Button
                  onPress={() => {
                    setLoading(true);
                    // const userFormData = {...route.params.submittedFormData, ...formKycData}
                    // navigation.navigate('HomeProfile', {submittedFormData: userFormData})
                    // TODO: Show loading spinner
                    // TODO: properly check legit id number
                    if (passCode != null){
                      // TODO: Convert date string to timestamp
                      // dummy POST request
                      const userCreatePromise = authorizeUser(authorizationCredentials)
                      userCreatePromise.then((data) => {
                        console.log(data)
                        // TODO: Remove loading spinner
                        setLoading(false);
                      });
                      // navigation.navigate('HomeProfile', {submittedFormData: userFormData})
                    } else {
                      //TODO: Prompt user for correction
                      console.log("Invalid Id number")
                    }
                    }
                  }
                  title="Finish"
                />        
              </View>
            {/* </ScrollView> */}
          </SafeAreaView>
      )
      };

const HomeTextDemo = ({navigation}) => {
  const [text, setText] = useState('');
  return (
    <View style={{padding: 10}}>
      <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={newText => setText(newText)}
          defaultValue={text}
        />
        <Text style={{padding: 10, fontSize: 42}}>
          {text
            .split(' ')
            .map(word => word && '🍕')
            .join(' ')}
        </Text>
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigation.navigate('Profile', {name: 'Jane'})
        }
      />
    </View>
  );
};

const HomeScreenHolder = ({navigation, route}) => {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Tab = createBottomTabNavigator();

  function AppNavigationTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={TransactionsScreen} />
        <Tab.Screen name="Settings" component={BuyAdaScreen} />
      </Tab.Navigator>
    );
  }
  return (
    <AppNavigationTabs/>
  )
}

const BuyAdaScreen = ({navigation}) => {

  const [amountAda, setAmountAda] = useState(0);
  const [amountFiat, setAmountFiat] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(2);

  // TODO: Fetch the current price of ada.
  // TODO: Calculate the trend based past portfolio total values (for the last x time)
  // TODO: Make payment fetch request and return buy details 
  // TODO: Store buy details locally and append to 
  // TODO: Make sure the buy button is tapped in a duration of x time (1 minutes)
  // TODO: If the duration is more then notify user to authorize another buy with new price


  const isDarkMode = useColorScheme() === 'dark';
  
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
          justifyContent: 'center',
          // alignItems: 'center',
          // bottom: 0,
        }}>
          <TextInput
            style={styles.input}
            placeholder="Amount of Ada to Purchase"
            placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
            onChangeText={data => {
                                      setAmountAda(parseInt(data));
                                      setAmountFiat(amountAda * exchangeRate)
                                  }}
            value={amountAda.toString()}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Required Fiat Amount"
            placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
            editable= {true}
            onChangeText={data => {
                                      setAmountFiat(parseInt(data));
                                      setAmountAda(amountAda / exchangeRate)
                                  }}
            value={amountFiat.toString()}
          />
          <Button
                  onPress={() => {
                    // const userFormData = {...route.params.submittedFormData, ...formKycData}
                    // navigation.navigate('HomeProfile', {submittedFormData: userFormData})
                    // TODO: Show loading spinner
                    // TODO: Make request to buy ada in the backend
                    // TODO: Notify user of transaction success or failure
                    }
                  }
                  title="Buy"
                />        

      </View>
  )
}

// TODD: Move this to transactions screen file
const TransactionsScreen = ({navigation, route}) => {

  const [tokenTimeout, setTokenTimeout] = useState(10000);

  const [currentAdaPrice, setCurrentAdaPrice] = useState(0.4);

  const [transactionHistory, setTransactionHistory] = useState([]);

  // TODO :  Fetch transaction history data from db 
  // TODO :  Fetch asset price for Ada (api)
  // TODO :  Fetch currently owned asset list. (name, quantity)
  // TODO ;  For each owned asset get 
  // TODO :  Calculate the total portfolio value

  return (
    <View>
        <Section title="Fuse">
              <Text>The Ada payments platform</Text>
              <Text style={styles.highlight}>Hello {route.params.submittedFormData.fname}</Text>
        </Section>
     </View>
    );
}

const ProfileScreen = ({navigation, route}) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
      <NavigationContainer >
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
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
        </Stack.Navigator>
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
