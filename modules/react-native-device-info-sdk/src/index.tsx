import {NativeModules, Platform} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-device-info-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ios: "- You have run 'pod install'\n", default: ''}) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const DeviceInfoSdk = NativeModules.DeviceInfoSdk
  ? NativeModules.DeviceInfoSdk
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      },
    );

let deviceInfoCollected = false;
const getDeviceInfo = async () => {
  if (!deviceInfoCollected) {
    return DeviceInfoSdk.getDeviceInfo()
      .then((data: any) => {
        deviceInfoCollected = true;
        return data;
      })
      .catch((error: any) => {
        throw error;
      });
  } else {
    return Promise.resolve(null);
  }
};

export default {
  getDeviceInfo,
};
