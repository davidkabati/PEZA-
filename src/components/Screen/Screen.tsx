import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

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
}
const Screen = ({ children, bgColor, horizontalPadding }: Props) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingHorizontal: horizontalPadding ? 20 : 0,
          backgroundColor: bgColor && theme.colors[bgColor],
        },
      ]}>
      <Box style={{ height: 30 }} />
      {children}
    </SafeAreaView>
  );
};

export default Screen;
