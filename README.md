# Getting Started

## Step 1: Install the dependencies

Navigate to the repo folder in your terminal and run `yarn` command

## Step 2: Start the Metro Server

Then, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash

yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
yarn android
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Fetchiing Device Info from SDK

The local SDK for the app is inside the modules folder and it is also publishes on npm as `react-native-device-info-sdk`.

You can install the SDK in two ways:

1. run `yarn react-native-device-info-sdk` (OR)
2. If you want to modify the SDK and see the changes locally, add `"react-native-device-info-sdk": "link:./modules\\react-native-device-info-sdk"` inside `package.json` under dependencies, and repeat Steps 1 and 2
