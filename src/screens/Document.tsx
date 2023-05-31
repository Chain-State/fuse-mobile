import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PinchGestureHandler, PinchGestureHandlerGestureEvent, TapGestureHandler } from 'react-native-gesture-handler';

import { PermissionsPage } from './Permissions';
import { MediaPage } from './MediaPage';
import { CameraPage } from './CameraPage';

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
// import { Camera, CameraPermissionStatus, parsePhysicalDeviceTypes, useCameraDevices } from 'react-native-vision-camera';
import type { Routes } from '../constants/Routes';



const Stack = createNativeStackNavigator<Routes>();

export const GetKYCDocumentImage = async ({navigation}) => {

    // const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();
    // const [microphonePermission, setMicrophonePermission] = useState<CameraPermissionStatus>();

    // useEffect(() => {
    //     Camera.getCameraPermissionStatus().then(setCameraPermission);
    //     Camera.getMicrophonePermissionStatus().then(setMicrophonePermission);
    // }, []);

    // console.log(`Re-rendering Navigator. Camera: ${cameraPermission} | Microphone: ${microphonePermission}`);

    // if (cameraPermission == null || microphonePermission == null) {
    //     // still loading
    //     return null;
    // }

    // const showPermissionsPage = cameraPermission !== 'authorized' || microphonePermission === 'not-determined';

    // const camera = useRef<Camera>(null)

    const [imageString, setKycFrontImage] = useState("")

    // const devices = useCameraDevices()
    // const device = devices.back
    // // const isAppForeground = useIsAppForeground()
    // const isFocused = useIsFocused()

    // get a list of all available cameras 
    // const devicesAll = await Camera.getAvailableCameraDevices()
    // console.log(devicesAll)

    // const deviceType = parsePhysicalDeviceTypes(device?.devices)
    // console.log(deviceType)

    //taking a photo 
    // const photo = await camera.current.takePhoto({
    //   qualityPrioritization: 'quality',
    //   flash: 'on',
    //   enableAutoRedEyeReduction: true
    // })


    // if (device == null) return <ActivityIndicator />
    // return (
      
    //   <Camera
    //     ref={camera}
    //     style={StyleSheet.absoluteFill}
    //     device={device}
    //     isActive={isFocused}
    //     lowLightBoost={true}
    //     photo={true}
    //   />
    // )
    

    return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              statusBarStyle: 'dark',
              animationTypeForReplace: 'push',
            }}
            initialRouteName={showPermissionsPage ? 'PermissionsPage' : 'CameraPage'}>
            {/* <Stack.Screen name="PermissionsPage" component={PermissionsPage} />
            <Stack.Screen name="CameraPage" component={CameraPage} />
            <Stack.Screen
              name="MediaPage"
              component={MediaPage}
              options={{
                animation: 'none',
                presentation: 'transparentModal',
              }}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      );


    // return (
    //     <View style={styles.screen}>
    //       <SafeAreaView style={styles.saveArea}>
    //         <View style={styles.topBar}>
    //           <Text style={styles.topBarTitleText}>React Native Scanner</Text>
    //         </View>
    //       </SafeAreaView>
    
    //       <View style={styles.caption}>
    //         <Text style={styles.captionTitleText}>Welcome To React-Native-Camera Tutorial</Text>
    //       </View>
    //         <RNCamera
    //           style={styles.rnCamera}
    //           onBarCodeRead={setBarcode}
    //         />
    
    //       <View style={styles.cameraControl}>
    //         <TouchableOpacity style={styles.btn} onPress={() => setKycFrontImage(null)}>
    //           <Text style={styles.btnText}>New QR Scan</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //   );
};

const styles = StyleSheet.create({
    topBar: {
      height: 50,
      backgroundColor: '#62d1bc', // green
      alignItems: 'center',
      justifyContent: 'center',
    },
    topBarTitleText: {
      color: '#ffffff', // white
      fontSize: 20,
    },
    caption: {
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
    },
    captionTitleText: {
      color: '#121B0D', // black
      fontSize: 16,
      fontWeight: '600'
    },
    rnCamera: {
        flex: 1,
        width: '94%',
        alignSelf: 'center',
      }
  });