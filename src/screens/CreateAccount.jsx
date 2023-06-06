import React, { useRef, useState } from 'react';
import { SafeAreaView, TextInput, View, Text } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import Theme from '../resources/assets/Style';
import FsButton from '../components/Button';
import { SCR_WALLET } from '../constants/AppStrings';

export const CreateAccount = ({ navigation }) => {
  const [account, setAccount] = useState({
    phoneNumber: '',
    emailAddress: '',
    password: '',
    passwordConfirm: '',
  });
  const phoneInput = useRef(null);

  const { phoneNumber, emailAddress, password, passwordConfirm } = account;

  return (
    <View style={{ ...Theme.fsContainer, justifyContent: 'center' }}>
      <Text style={Theme.fsLabel}>Phone Number</Text>
      <PhoneInput
        ref={phoneInput}
        defaultValue=""
        defaultCode="KE"
        layout="first"
        onChangeText={(text) => {
          setAccount({ ...account, phoneNumber: text });
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
        onChangeText={(data) => setFormData({ ...formData, emailAddress: data })}
        value={emailAddress}
      />
      <Text style={Theme.fsLabel}>Password</Text>
      <TextInput
        style={Theme.fsInput}
        placeholder="Password"
        onChangeText={(data) => setFormData({ ...formData, password: data })}
        value={password}
      />
      <Text style={Theme.fsLabel}>Confirm Password</Text>
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
            onSubmitRegisterUser(formData);
            navigation.navigate(SCR_WALLET, { submittedFormData: formData });
          } else {
            console.log("Passwords don't match!!");
          }
        }}
        title="Sign Up"
      />
    </View>
  );
};
