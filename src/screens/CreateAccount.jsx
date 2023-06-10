import React, { useRef, useState } from 'react';
import { SafeAreaView, TextInput, View, Text } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import Theme from '../resources/assets/Style';
import FsButton from '../components/Button';
import { BTN_CREAT_ACCOUNT, SCR_WALLET } from '../constants/AppStrings';
import { Image } from 'react-native-svg';
import { createUser } from '../services/UserAccounts';

const userAccount = {
  firstName: 'unverified',
  lastName: 'unverified',
  dateOfBirth: new Date(),
  idNumber: '000000',
  phoneNumber: '245700000000',
  emailAddress: 'test@fuse.io',
  password: 'testpass',
  passwordConfirm: 'testpass',
  idNumber: '8943743783',
};

export const CreateAccount = ({ navigation }) => {
  const [account, setAccount] = useState(userAccount);
  const phoneInput = useRef(userAccount.phoneNumber);
  const nav = navigation;

  return (
    <View style={{ ...Theme.fsContainer, justifyContent: 'center' }}>
      <Image source={require('../resources/images/logo.png')} style={{ width: 200, height: 90 }} />
      <Text style={Theme.fsLabel}>Phone Number</Text>
      <PhoneInput
        ref={phoneInput}
        defaultValue=""
        defaultCode="KE"
        layout="first"
        onChangeText={(number) => {
          setAccount({ ...account, phoneNumber: number });
        }}
        autoFocus
        containerStyle={{
          ...Theme.fsInput,
          width: 350,
          padding: 2,
          marginTop: 5,
        }}
        codeTextStyle={{ fontFamily: Theme.fsFonts.fontFamily }}
        textInputStyle={{ fontFamily: Theme.fsFonts.fontFamily }}
        textContainerStyle={{
          marginTop: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
          backgroundColor: 'white',
          fontFamily: Theme.fsFonts.fontFamily,
        }}
      />
      <Text style={Theme.fsLabel}>Email Address</Text>
      <TextInput
        style={Theme.fsInput}
        placeholder="Email Address"
        onChangeText={(data) => setAccount({ ...account, emailAddress: data })}
      />
      <Text style={Theme.fsLabel}>Password</Text>
      <TextInput
        style={Theme.fsInput}
        placeholder="Password"
        onChangeText={(data) => setAccount({ ...account, password: data })}
      />
      <Text style={Theme.fsLabel}>Confirm Password</Text>
      <TextInput
        style={Theme.fsInput}
        placeholder="Repeat Password"
        onChangeText={(data) => setAccount({ ...account, passwordConfirm: data })}
      />
      <FsButton
        onPress={async () => {
          console.log(account);
          if (account.password === account.passwordConfirm) {
            const activeUser = await createUser(account);
            if (activeUser) {
              console.log(`user created with ${JSON.stringify(activeUser)}`);
            }
            navigation.navigate(SCR_WALLET, { submittedFormData: activeUser });
          } else {
            console.log("Passwords don't match!!");
          }
        }}
        title={BTN_CREAT_ACCOUNT}
      />
    </View>
  );
};
