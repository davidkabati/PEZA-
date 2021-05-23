import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { HomeIcon } from './src/svg/homeNavIcons';
import NavButtonWrapper from './src/components/NavButtonWrapper/NavButtonWrapper.tsx';

export default function App() {
  return (
    <View style={styles.container}>
      <NavButtonWrapper>
        <HomeIcon />
      </NavButtonWrapper>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
