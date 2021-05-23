import { StatusBar } from 'expo-status-bar';
import React from 'react';

import AppNav from './src/navigation/AppNav/AppNav';
import LoadAssets from './src/utils/LoadAssets';
import fonts from './src/utils/fonts';

export default function App() {
  return (
    <LoadAssets fonts={fonts}>
      <AppNav />
      <StatusBar style="auto" />
    </LoadAssets>
  );
}
