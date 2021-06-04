import React from 'react';
import { StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { theme } from '../../components';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  buttonText: {
    fontFamily: 'SofiaPro-Medium',
    fontSize: wp('4.5%'),
    letterSpacing: 0.6,
  },
});

interface Props {
  width?: number;
  height?: number;
  label: string;
  onPress: () => void;
  type: 'primary' | 'secondary' | 'light';
  loading?: boolean;
}

const Button = ({ width, height, label, onPress, type, loading }: Props) => {
  const backgroundColorValue =
    type === 'primary'
      ? theme.colors.primary
      : type === 'secondary'
      ? theme.colors.secondary
      : theme.colors.lightGrey;

  const color =
    type === 'primary'
      ? theme.colors.white
      : type === 'secondary'
      ? theme.colors.white
      : theme.colors.dark;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.container,
        {
          width: width ? width : 125,
          height: height ? height : 56,
          backgroundColor: backgroundColorValue,
        },
      ]}>
      {!loading ? (
        <Text
          style={[
            styles.buttonText,
            {
              color: color,
            },
          ]}>
          {label}
        </Text>
      ) : (
        <ActivityIndicator color={theme.colors.white} />
      )}
    </TouchableOpacity>
  );
};

export default Button;
