import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Box, theme, Text } from '..';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // paddingHorizontal: theme.constants.screenPadding / 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'white',
    zIndex: 1,
  },
  buttonContainer: {
    padding: wp(1),
  },
});

interface Props {
  bgColor?: 'primary' | 'secondary';
  color?: 'light';
  transparent?: boolean;
  onPressBack: () => void;
  option1?: ReactNode;
  onPressOption1?: () => void;
  title?: string;
}
const StackHeader = ({
  bgColor,
  color,
  onPressBack,
  option1,
  onPressOption1,
  title,
  transparent,
}: Props) => {
  return (
    <Box
      style={[
        styles.container,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        { backgroundColor: transparent ? undefined : theme.colors[bgColor!] },
      ]}>
      <TouchableOpacity onPress={onPressBack} style={styles.buttonContainer}>
        <Icon
          name="arrow-left"
          color={bgColor === 'primary' ? theme.colors.secondary : theme.colors.dark}
          size={22}
        />
      </TouchableOpacity>
      {title && (
        <Text variant="h1" color="dark">
          {title}
        </Text>
      )}
      <TouchableOpacity onPress={onPressOption1} style={styles.buttonContainer}>
        {option1}
      </TouchableOpacity>
    </Box>
  );
};

export default StackHeader;
