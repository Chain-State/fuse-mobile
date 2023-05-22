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


const RegisterForm = ({navigation}) => {

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
      const json = await response.json();
      setData(json.user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


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
            }}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={data => setFormData({...formData, fname: data })}
              value={fname}
            />
            <TextInput
              style={styles.input}
              placeholder="Second Name"
              onChangeText={data => setFormData({...formData, sname: data })}
              value={sname}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              onChangeText={data => setFormData({...formData, email: data })}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              onChangeText={data => setFormData({...formData, phone: data })}
              value={phone}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={data => setFormData({...formData, password: data })}
              value={password}
            />
            <TextInput
              style={styles.input}
              placeholder="Repeat Password"
              onChangeText={data => setFormData({...formData, passwordConfirm: data })}
              value={passwordConfirm}
            />
            <Button
              onPress={() => {
                if (password === passwordConfirm){
                  // add dummy https call here
                  createUser(formData)
                  navigation.navigate('HomeProfile', {submittedFormData: formData})
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

const HomeScreen = ({navigation}) => {
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

const HomeProfile = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
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

  // const onPressButton = {
  //   Alert.alert('You tapped the button!')
  // };

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={RegisterForm}
            options={{title: 'Welcome'}}
          />
          <Stack.Screen name="HomeProfile" component={HomeProfile} options={{title: 'Hello'}}/>
        </Stack.Navigator>
      </NavigationContainer>
      // <SafeAreaView style={backgroundStyle}>
      //   <StatusBar
      //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      //     backgroundColor={backgroundStyle.backgroundColor}
      //   />
      //   <ScrollView
      //     contentInsetAdjustmentBehavior="automatic"
      //     style={backgroundStyle}>
      //     {/* {/* <Header /> */}
      //     <View
      //       style={{
      //         backgroundColor: isDarkMode ? Colors.black : Colors.white,
      //       }}>
      //       {/* <Section title="Step One">
      //         <Text style={styles.highlight}>Fuse</Text>
      //         The Ada payments platform
      //       </Section>
      //       <Section title="See Your Changes">
      //         <ReloadInstructions />
      //       </Section>
      //       <Section title="Debug">
      //         <DebugInstructions />
      //       </Section>
      //       <Section title="Learn More">
      //         Read the docs to discover what to do next:
      //       </Section>
      //       <LearnMoreLinks /> */}
      //       <Text>Hello</Text>
      //       <MyStack>
      //       {/* {Home} */}
      //       {/* <Button
      //         onPress={() => {
      //           console.log('You tapped the button!');
      //         }}
      //         title="Press Me"
      //       />         */}
      //     </View>
          
      //   </ScrollView>
      // </SafeAreaView>
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
    width: 50
  },
});

export default App;
