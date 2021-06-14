import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@shopify/restyle';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from 'react-query';

import AppNav from './src/navigation/AppNav/AppNav';
import LoadAssets from './src/utils/LoadAssets';
import fonts from './src/utils/fonts';
import { theme } from './src/components';
import firebaseInit from './src/firebase';

export default function App() {
  const queryClient = new QueryClient();

  firebaseInit();
  return (
    <LoadAssets fonts={fonts}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AppNav />
          <StatusBar backgroundColor={theme.colors.primary} />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </QueryClientProvider>
      </ThemeProvider>
    </LoadAssets>
  );
}
