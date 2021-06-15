import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@shopify/restyle';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import AppNav from './src/navigation/AppNav/AppNav';
import LoadAssets from './src/utils/LoadAssets';
import fonts from './src/utils/fonts';
import { theme } from './src/components';
import firebaseInit from './src/firebase';
import { store } from './src/redux/store';

export default function App() {
  const queryClient = new QueryClient();

  const assets = [
    require('./assets/images/noContent.png'),
    require('./assets/images/forgotPassword.png'),
    require('./assets/images/underConstruction.png'),
  ];

  firebaseInit();
  return (
    <LoadAssets fonts={fonts} assets={assets}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <AppNav />
            <StatusBar backgroundColor={theme.colors.secondary} />
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </LoadAssets>
  );
}
