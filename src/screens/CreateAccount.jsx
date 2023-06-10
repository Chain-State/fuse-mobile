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
  accountPassword: 'testpass',
  accountPasswordConfirm: 'testpass',
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
      {/* TODO: Validate password length (min 10chars), otherwise CW backend will fail wallet creation with a 400 error */}
      <TextInput
        style={Theme.fsInput}
        placeholder="Password"
        onChangeText={(data) => setAccount({ ...account, accountPassword: data })}
      />
      <Text style={Theme.fsLabel}>Confirm Password</Text>
      <TextInput
        style={Theme.fsInput}
        placeholder="Repeat accountPassword"
        onChangeText={(data) => setAccount({ ...account, accountPasswordConfirm: data })}
      />
      <FsButton
        onPress={async () => {
          console.log(account);
          if (
            account.accountPassword === account.accountPasswordConfirm &&
            account.accountPassword.length >= 10
          ) {
            const activeUser = await createUser(account);
            if (activeUser) {
              console.log(`user created with ${JSON.stringify(activeUser)}`);
            }
            navigation.navigate(SCR_WALLET, { submittedFormData: activeUser });
          } else {
            console.log("Passwords don't match!! or password too short");
          }
        }}
        title={BTN_CREAT_ACCOUNT}
      />
    </View>
  );
};
