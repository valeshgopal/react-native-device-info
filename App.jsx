/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  PermissionsAndroid,
  View,
  Pressable,
  SafeAreaView,
  Linking,
} from 'react-native';
import UserDevice from 'react-native-device-info-sdk';

function App() {
  const [deviceInfo, setDeviceInfo] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const requestDeviceInfoPermission = async () => {
    try {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        {
          title: 'Device Info Permission',
          message: 'Device Info App needs access to your device info',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return status;
    } catch (err) {
      console.warn(err);
    }
  };

  const handlePress = async () => {
    const status = await requestDeviceInfoPermission();
    console.log({status});
    if (status !== 'granted') {
      setMessage('🤝 Please grant permission to access device info');
      return;
    }

    if (deviceInfo) {
      setMessage('⚠️ Device info already captured');
      return;
    }

    setIsLoading(true);
    try {
      const data = await UserDevice.getDeviceInfo();

      if (data) {
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          mode: 'cors',
          body: JSON.stringify(data),
        };

        await fetch(
          'https://6671b4d5e083e62ee43cc596.mockapi.io/api/device-info',
          options,
        )
          .then(response => {
            if (response.ok) {
              setDeviceInfo(data);
              setMessage('✅ Device info captured successfully');
            }
          })
          .catch(err => {
            setMessage('❌ Something went wrong. Please try again');
            console.log('==> Network Error: ', err);
          });
      }
    } catch (error) {
      setMessage('❌ Something went wrong. Please try again');
      console.error('==>SDK Error', error);
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fefefe'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fefefe'} />
      <View style={styles.container}>
        <Pressable onPress={handlePress} style={styles.button}>
          <Text style={{color: '#fefefe', fontWeight: 700, fontSize: 18}}>
            {isLoading ? 'Capturing..' : 'Capture Device Info'}
          </Text>
        </Pressable>
        <View style={{marginTop: 8}}>
          {message && <Text style={{color: '#010101'}}>{message}</Text>}
        </View>
        {deviceInfo && (
          <View style={{marginTop: 8}}>
            <Text
              style={{color: 'blue', textDecorationLine: 'underline'}}
              onPress={() =>
                Linking.openURL(
                  'https://6671b4d5e083e62ee43cc596.mockapi.io/api/device-info',
                )
              }>
              View captured device info
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    width: 200,
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
