import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Box, Text, theme } from '..';
import { CardActiveDots } from '../../svg/homeIcons';

const styles = StyleSheet.create({
  container: {
    borderRadius: wp(4),
    padding: wp(4),
    justifyContent: 'space-between',
  },
});

interface Props {
  width?: number;
  height?: number;
  icon: ReactNode;
  info?: string;
  label: string;
  active: boolean;
}
const HomeCard = ({ width, icon, info, label, active, height }: Props) => {
  return (
    <Box
      style={[
        styles.container,
        {
          width: width ? width : 144,
          height: height ? height : 147,
          backgroundColor: active ? theme.colors.primary : theme.colors.white,
        },
      ]}>
      {active && <CardActiveDots />}
      {icon}
      {info && active && (
        <Text variant="h2" color="yellow">
          {info}
        </Text>
      )}
      <Text variant="b1" color={active ? 'lightGrey' : 'dark'}>
        {label}
      </Text>
    </Box>
  );
};

export default HomeCard;
