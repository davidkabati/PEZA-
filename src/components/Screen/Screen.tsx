import React, { ReactNode } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Box, theme } from '..';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface Props {
  children: ReactNode;
  bgColor: 'primary' | 'secondary';
  horizontalPadding?: boolean;
  scrollable?: boolean;
  style?: ViewStyle;
}
const Screen = ({ children, bgColor, horizontalPadding, scrollable, style }: Props) => {
  if (scrollable) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            paddingHorizontal: horizontalPadding ? 20 : 0,
            backgroundColor: bgColor && theme.colors[bgColor],
            ...style,
          },
        ]}>
        <Box style={{ height: 30 }} />
        <StatusBar backgroundColor={theme.colors[bgColor]} />
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            paddingHorizontal: horizontalPadding ? 20 : 0,
            backgroundColor: bgColor && theme.colors[bgColor],
            ...style,
          },
        ]}>
        <Box style={{ height: 30 }} />
        <StatusBar backgroundColor={theme.colors[bgColor]} />
        {children}
      </SafeAreaView>
    );
  }
};

export default Screen;
