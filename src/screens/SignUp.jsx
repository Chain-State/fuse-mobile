import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import Theme from '../resources/assets/Style';

import { createUser } from '../services/UserAccounts';
import FsButton from '../components/Button';
import { SCR_KYC, SCR_WALLET } from '../constants/AppStrings';



function onSubmitRegisterUser(userDetails) {
  setLoading(true)
  console.log(userDetails)
  const postRequestObject = {
    emailAddress: userDetails.email,
    phoneNumber: userDetails.phone,
    accountPassword: userDetails.confirmpassword,
    firstName: userDetails.fname,
    lastName: userDetails.sname,
    dateOfBirth: userDetails.dob,
    idNumber: userDetails.id,
  }
  console.log(postRequestObject)
  const userCreatePromise = createUser(postRequestObject)
  userCreatePromise.then((data) => {
    console.log(data)
    // TODO: Remove loading spinner
    // navigation.navigate('TransactionsScreen', {submittedFormData: userFormData})
    // You from user createPromise get the token from json object returned from d.b
    //TODO: Save userToken to async storage
    const parsedCreateUserResponse = JSON.parse(data)
    const userUniqueToken = parsedCreateUserResponse[0].wallet.id
    console.log(userUniqueToken)
  });
}

export const SignUpForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fname: '',
    sname: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { fname, sname, phone, email, password, passwordConfirm } = formData;

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={Theme.fsContainer}>
        <TextInput
          style={Theme.fsInput}
          placeholder="First Name"
          onChangeText={(data) => setFormData({ ...formData, fname: data })}
          value={fname}
        />
        <TextInput
          style={Theme.fsInput}
          placeholder="Second Name"
          onChangeText={(data) => setFormData({ ...formData, sname: data })}
          value={sname}
        />
        <TextInput
          style={Theme.fsInput}
          placeholder="Email Address"
          onChangeText={(data) => setFormData({ ...formData, email: data })}
          value={email}
        />
        <TextInput
          style={Theme.fsInput}
          placeholder="Phone Number"
          onChangeText={(data) => setFormData({ ...formData, phone: data })}
          value={phone}
          keyboardType="numeric"
        />
        <TextInput
          style={Theme.fsInput}
          placeholder="Password"
          onChangeText={(data) => setFormData({ ...formData, password: data })}
          value={password}
        />
        <TextInput
          style={Theme.fsInput}
          placeholder="Repeat Password"
          onChangeText={(data) => setFormData({ ...formData, passwordConfirm: data })}
          value={passwordConfirm}
        />
        <FsButton
          onPress={() => {
            // TODO: Proper form validation
            if (password === passwordConfirm) {
              onSubmitRegisterUser(formData)
              navigation.navigate(SCR_WALLET, { submittedFormData: formData });
            } else {
              console.log("Passwords don't match!!");
            }
          }}
          title="Sign Up"
        />
      </View>
    </SafeAreaView>
  );
};

export const RegisterFormKYC = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState();

  const [formKycData, setFormData] = useState({
    idNumber: '',
    passPortNumber: '',
    dateOfBirth: '',
  });
  const [collatedData, setCollatedData] = useState({});

  const { idNumber, passPortNumber, dateOfBirth } = formKycData;

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar />
      <View>
        <TextInput
          placeholder="Id Number"
          onChangeText={(data) => setFormData({ ...formKycData, idNumber: data })}
          value={idNumber}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Passport Number (Optional)"
          onChangeText={(data) => setFormData({ ...formKycData, passPortNumber: data })}
          value={passPortNumber}
        />
        <TextInput
          placeholder="Date Of birth (ddmmyy)"
          onChangeText={(data) => setFormData({ ...formKycData, dateOfBirth: data })}
          value={dateOfBirth}
        />
        {/* <RNCamera style={styles.rnCamera} /> */}
        {isLoading && <ActivityIndicator />}
        <Button
          onPress={() => {
            setLoading(true);
            // const userFormData = {...route.params.submittedFormData, ...formKycData}
            // navigation.navigate('HomeProfile', {submittedFormData: userFormData})
            // TODO: Show loading spinner
            // TODO: properly check legit id number
            if (idNumber != null) {
              // TODO: Add Form validation
              // TODO: Convert date string to timestamp
              // dummy POST request
              setTimeout(function () {
                const userFormData = { ...route.params.submittedFormData, ...formKycData };
                setCollatedData(userFormData);
                const userCreatePromise = createUser(userFormData);
                userCreatePromise.then((data) => {
                  setLoading(false);
                  // TODO: Remove loading spinner
                  // navigation.navigate('TransactionsScreen', {submittedFormData: userFormData})
                });
                setLoading(false);
                // You from user createPromise get the token from json object returned from d.b
                //TODO: Save userToken to async storage
                //TODO: Set flag for 'first time use' to false
                navigation.navigate('HomeScreen', { screen: 'Transactions' });
              }, 5000);
            } else {
              //TODO: Prompt user for correction
              console.log('Invalid Id number');
            }
          }}
          title="Finish"
        />
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};
