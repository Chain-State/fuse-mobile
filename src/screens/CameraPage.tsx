import * as React from 'react';
import { useRef, useState, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PinchGestureHandler, PinchGestureHandlerGestureEvent, TapGestureHandler } from 'react-native-gesture-handler';
import {
  CameraDeviceFormat,
  CameraRuntimeError,
  FrameProcessorPerformanceSuggestion,
  PhotoFile,
  sortFormats,
  useCameraDevices,
  useFrameProcessor,
  VideoFile,
} from 'react-native-vision-camera';
import { Camera, frameRateIncluded } from 'react-native-vision-camera';
// import Reanimated, { Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedProps, useSharedValue } from 'react-native-reanimated';




// const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
// Reanimated.addWhitelistedNativeProps({
//   zoom: true,
// });

// const SCALE_FULL_ZOOM = 3;
// const BUTTON_SIZE = 40;

// type Props = NativeStackScreenProps<Routes, 'CameraPage'>;