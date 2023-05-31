
import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
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
import { Formik } from 'formik';
import DatePicker from 'react-native-date-picker'

import {
  getItem as getToken,
  setItem as setToken,
  removeItem as removeToken,
} from '../data/storage/TokenStorage';

import { createUser } from '../services/UserAccounts'
import { RegisterBasicSchema } from '../services/FormValidation';

import Theme from '../resources/assets/Style';
import FsButton from '../components/Button';



type User = {
  uid: string;
  username: string;
  registrationTime: string;
};


export const RegisterFormBasic = ({ navigation }) => {

  const [formData, setFormData] = useState({
    fname: '',
    sname: '',
    email: '',
    phone: '',
    passoword: '',
    confirmpassword: '',
  });

  const { fname, sname, phone, email, password, passwordconfirm } = formData;

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function onNavigateKyc(onSubmitFormData) {
    console.log(onSubmitFormData)
    setFormData(onSubmitFormData)
    navigation.navigate('KYCForm', { submittedFormData: onSubmitFormData })
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}> */}
      {/* {/* <Header /> */}
      <Formik
        initialValues={{
          fname: '',
          sname: '',
          email: '',
          phone: '',
          password: '',
          confirmpassword: '',
        }}
        validationSchema={RegisterBasicSchema}
        onSubmit={values => { onNavigateKyc(values) }}
      >
        {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
          <View
            style={Theme.fsContainer}
          // style={{
          //   backgroundColor: isDarkMode ? Colors.black : Colors.white,
          //   width: '100%',
          //   height: '100%',
          //   margin: 0,
          //   padding: 0,
          //   justifyContent: 'center',
          //   // alignItems: 'center',
          //   // bottom: 0,}}
          >

            <TextInput
              style={Theme.fsInput}
              placeholder="First Name"
              // placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
              onBlur={handleBlur('fname')}
              onChangeText={handleChange('fname')}
              value={values.fname}
            />
            <Text style={Theme.error}>{errors.fname}</Text>
            <TextInput
              style={Theme.fsInput}
              placeholder="Second Name"
              // placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
              onChangeText={handleChange('sname')}
              value={values.sname}
            />
            <Text style={Theme.error}>{errors.sname}</Text>
            <TextInput
              style={Theme.fsInput}
              placeholder="Email Address"
              // placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
              onChangeText={handleChange('email')}
              value={values.email}
            />
            <Text style={Theme.error}>{errors.email}</Text>
            <TextInput
              style={Theme.fsInput}
              placeholder="Phone Number"
              // placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
              onChangeText={handleChange('phone')}
              value={values.phone}
              keyboardType="numeric"
            />
            <Text style={Theme.error}>{errors.phone}</Text>
            <TextInput
              style={Theme.fsInput}
              placeholder="Password"
              // placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
              onChangeText={handleChange('password')}
              value={values.password}
            />
            <Text style={Theme.error}>{errors.password}</Text>
            <TextInput
              style={Theme.fsInput}
              placeholder="Repeat Password"
              // placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
              onChangeText={handleChange('confirmpassword')}
              value={values.confirmpassword}
            />
            <Text style={Theme.error}>{errors.confirmpassword}</Text>
            <FsButton
              onPress={handleSubmit}
              title="Next"
            />
          </View>
        )}
      </Formik>
      {/* </ScrollView> */}
    </SafeAreaView>
  )
};



export const RegisterFormKYC = ({ navigation, route }) => {

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<User>();


  const [formKycData, setFormData] = useState({
    id: '',
    dob: '',
  });
  const [collatedData, setCollatedData] = useState({})

  function onSubmitRegisterUser(userDetails) {
    setLoading(true)
    setFormData(userDetails)
    console.log(userDetails)
    const userFormData = { ...route.params.submittedFormData, ...userDetails }
    console.log(userFormData)
    const postRequestObject = {
      emailAddress: userFormData.email,
      phoneNumber: userFormData.phone,
      accountPassword: userFormData.confirmpassword,
      firstName: userFormData.fname,
      lastName: userFormData.sname,
      dateOfBirth: userFormData.dob,
      idNumber: userFormData.id,
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
      const userUniqueToken = parsedCreateUserResponse[0].uuid
      setToken(userUniqueToken)
      console.log(userUniqueToken)
      setLoading(false)
    });
  }

  const { idNumber, passPortNumber, dateOfBirth } = formKycData;

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}> */}
      {/* {/* <Header /> */}
      <Formik
        initialValues={{
          id: '',
          dob: '',
        }}
        // validationSchema={RegisterBasicSchema}
        onSubmit={values => { onSubmitRegisterUser(values) }}
      >
        {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
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
              style={Theme.fsInput}
              placeholder="Id/Passport Number"
              // placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
              onChangeText={handleChange('id')}
              value={values.id}
              keyboardType="numeric"
            />
            <TextInput
              style={Theme.fsInput}
              placeholder="Date Of birth (ddmmyy)"
              // placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
              onChangeText={handleChange('dob')}
              value={values.dob}
            />
            {/* <RNCamera style={styles.rnCamera} /> */}
            {isLoading && <ActivityIndicator size="large" color="#00ff00" />}
            <FsButton
              onPress={handleSubmit}
              title="Finish"
            />
          </View>
        )}
      </Formik>
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
  rnCamera: {
    flex: 1,
    width: '94%',
    alignSelf: 'center',
  }
});