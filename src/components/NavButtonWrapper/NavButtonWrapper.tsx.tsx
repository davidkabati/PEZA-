import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import { Box, theme, Text } from '..';

const styles = StyleSheet.create({
  container: {},
  children: {
    position: 'absolute',
  },
});

interface Props {
  children: ReactNode;
}

const size = 40;
const strokeWidth = 4;
const center = size / 2;
const radius = size / 2 - strokeWidth / 2;
const circumfrence = 2 * Math.PI * radius;
const NavButtonWrapper = ({ children }: Props) => {
  return (
    <Box>
      <Svg width={size} height={size}>
        <Circle
          stroke={theme.colors.veryLightPurple}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
      </Svg>
      <TouchableOpacity style={styles.children}>{children}</TouchableOpacity>
    </Box>
  );
};

export default NavButtonWrapper;
