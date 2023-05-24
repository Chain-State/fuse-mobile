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
          component={HomeScreen}
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
      taxCredential: "",
    });
    
    const { idNumber, passPortNumber, dateOfBirth, taxCredential } = formKycData;
  
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
              <Button
                onPress={() => {
                  // const userFormData = {...route.params.submittedFormData, ...formKycData}
                  // navigation.navigate('HomeProfile', {submittedFormData: userFormData})
                  // TODO: Show loading spinner
                  // TODO: properly check legit id number
                  if (idNumber != null){
                    // TODO: Convert date string to timestamp
                    // dummy POST request
                    const userFormData = {...route.params.submittedFormData, ...formKycData}
                    const userCreatePromise = createUser(userFormData)
                    userCreatePromise.then((data) => {
                      console.log(data)
                      // TODO: Remove loading spinner
                      navigation.navigate('HomeProfile', {submittedFormData: userFormData})
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

const BuyAdaScreen = ({navigation}) => {
  const [amountAda, setAmountAda] = useState(0);
  const [amountFiat, setAmountFiat] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(2);


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
            editable= {false}
            value={amountFiat.toString()}
          />
      </View>
  )
}

const HomeScreen = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Tab = createBottomTabNavigator();

  function AppNavigationTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={BuyAdaScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <View>
        <Section title="Fuse">
              <Text>The Ada payments platform</Text>
              <Text style={styles.highlight}>Hello {route.params.submittedFormData.fname}</Text>
        </Section>
        <AppNavigationTabs/>
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
            name="HomeProfile" 
            component={HomeScreen} 
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
