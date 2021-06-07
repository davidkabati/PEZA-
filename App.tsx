import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@shopify/restyle';

import AppNav from './src/navigation/AppNav/AppNav';
import LoadAssets from './src/utils/LoadAssets';
import fonts from './src/utils/fonts';
import { theme } from './src/components';

export default function App() {
  return (
    <LoadAssets fonts={fonts}>
      <ThemeProvider theme={theme}>
        <AppNav />
        <StatusBar backgroundColor={theme.colors.primary} />
      </ThemeProvider>
    </LoadAssets>
  );
}
