
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
  TouchableOpacity,
} from 'react-native';

import {
    Colors,
    Header,
} from 'react-native/Libraries/NewAppScreen';
import { RNCamera } from 'react-native-camera'

import {createUser} from '../services/user-accounts'



type User = {
    uid: string;
    username: string;
    registrationTime: string;
};

export const RegisterFormBasic = ({navigation}) => {

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



export const RegisterFormKYC = ({navigation, route}) => {

    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState<User>();
  
    // const createUser = async (userData) => {
    //   try {
    //     const response = await fetch('https://mywebsite.com/endpoint/', {
    //       method: 'POST',
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         userData
    //       }),
    //     });
    //     if (!response.ok) {
    //       throw new Error(`HTTP error: ${response.status}`);
    //     }
    //     // Expect a body with user db details (including a uuid)
    //     // TODO: save uuid to local async storage
    //     const json = await response.json();
    //     setData(json.user);
    //     return json;
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     setLoading(false);
    //     console.log(data?.username)
    //   }
    // };
  
  
    const [formKycData, setFormData] = useState({
      idNumber: "",
      passPortNumber: "",
      dateOfBirth: "",
    });
    const [collatedData, setCollatedData] = useState({})
    
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
                    if (idNumber != null){
                      // TODO: Convert date string to timestamp
                      // dummy POST request
                      setTimeout(function() {
                      const userFormData = {...route.params.submittedFormData, ...formKycData}
                      // setCollatedData(userFormData)
                      // const userCreatePromise = createUser(userFormData)
                      // userCreatePromise.then((data) => {
                      //   console.log(data)
                      //   setLoading(false)
                      //   // TODO: Remove loading spinner
                      //   // navigation.navigate('TransactionsScreen', {submittedFormData: userFormData})
                      // });
                      console.log(userFormData)
                      setLoading(false)
                      navigation.navigate('HomeScreen', { screen: 'Transactions' })
                    }, 5000);
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