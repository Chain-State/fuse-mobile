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

import {
    Colors,
    Header,
} from 'react-native/Libraries/NewAppScreen';


type User = {
    uid: string;
    username: string;
    registrationTime: string;
};



export const LoginScreen = ({navigation, route}) => {

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

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
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
                placeholder="Username"
                placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
                onChangeText={data => setAuthorizationCredentials({...authorizationCredentials, passCode: data })}
                value={username}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
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
                title="Login"
              />
              <View></View>
              <Button 
                onPress={() => {
                    console.log("Hey")
                    navigation.navigate('Register', {fromLoginData: "Hello"})
                }}
                title="Register"/>        
            </View>
          {/* </ScrollView> */}
        </SafeAreaView>
    )
    };

const styles = StyleSheet.create({
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
        margin: 20,
    },
});