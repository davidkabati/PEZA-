import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Box, theme, Text } from '../../components';
import { StackHeader } from '../../components/StackHeader';
import Logo from '../../svg/logo';
import { ProfileNavParamList } from '../../types/navigation.types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
  },
  textContainer: {
    width: theme.constants.screenWidth,
  },
});

// interface Props {}

const Terms = ({ navigation }: StackScreenProps<ProfileNavParamList, 'About'>) => {
  return (
    <Box style={styles.container}>
      <StackHeader onPressBack={() => navigation.goBack()} padding />
      <Logo width={127.2} height={74} />
    </Box>
  );
};

export default Terms;
