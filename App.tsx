import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@shopify/restyle';
import Toast from 'react-native-toast-message';

import AppNav from './src/navigation/AppNav/AppNav';
import LoadAssets from './src/utils/LoadAssets';
import fonts from './src/utils/fonts';
import { theme } from './src/components';
import firebaseInit from './src/firebase';

export default function App() {
  firebaseInit();
  return (
    <LoadAssets fonts={fonts}>
      <ThemeProvider theme={theme}>
        <AppNav />
        <StatusBar style="auto" backgroundColor={theme.colors.primary} />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </ThemeProvider>
    </LoadAssets>
  );
}
