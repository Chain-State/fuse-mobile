import React, { useState } from 'react';
import { Button, SafeAreaView, StatusBar, TextInput, View } from 'react-native';

const LoginScreen = ({ navigation, route }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [authCredentials, setAuthCredentials] = useState({
    userName: '',
    password: '',
  });

  return (
    <SafeAreaView>
      <StatusBar></StatusBar>
      <View>
        <TextInput
          placeholder="User Name"
          onChangeText={(data) => setAuthCredentials(authCredentials.userName = data)}
          value={authCredentials.userName}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(data) =>
            setAuthCredentials(authCredentials.password = data)
          }
          value={authCredentials.password}
        />
        <Button
          onPress={() => {
            setLoading(true);
            // const userFormData = {...route.params.submittedFormData, ...formKycData}
            // navigation.navigate('HomeProfile', {submittedFormData: userFormData})
            // TODO: Show loading spinner
            // TODO: properly check legit id number
            if (passWord != null) {
              // TODO: Convert date string to timestamp
              // dummy POST request
              // const userCreatePromise = authorizeUser(authorizationCredentials)
              // userCreatePromise.then((data) => {
              //   console.log(data)
              //   // TODO: Remove loading spinner
              //   setLoading(false);
              // });
              navigation.navigate('HomeScreen');
            } else {
              //TODO: Prompt user for correction
              console.log('Invalid Id number');
            }
          }}
          title="Login"
        />
        <View></View>
        <Button
          onPress={() => {
            navigation.navigate('SignUpForm', { fromLoginData: 'Hello' });
          }}
          title="Register"
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
