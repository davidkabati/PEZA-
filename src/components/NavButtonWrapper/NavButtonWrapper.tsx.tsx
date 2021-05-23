import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import { Box, theme, Text } from '..';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
});

interface Props {
  children: ReactNode;
}

const size = 40;
const strokeWidth = 3;
const center = size / 2;
const radius = size / 2 - strokeWidth / 2;
const circumfrence = 2 * Math.PI * radius;
const NavButtonWrapper = ({ children }: Props) => {
  return (
    <Box style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-330" origin={center}>
          <Circle
            stroke={theme.colors.white}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke={theme.colors.yellow}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumfrence}
            strokeDashoffset={circumfrence - (circumfrence * 32) / 100}
          />
        </G>
      </Svg>
      <TouchableOpacity style={styles.children}>{children}</TouchableOpacity>
    </Box>
  );
};

export default NavButtonWrapper;
