import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Box, theme, Text } from '../../components';
import { StackHeader } from '../../components/StackHeader';
import { ProfileNavParamList } from '../../types/navigation.types';
import TextInput from '../../components/TextInput';
import { Button } from '../../components/Button';
import { Feather as Icon } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.constants.screenPadding / 2,
    paddingTop: theme.constants.screenPadding,
  },
  titleContainer: {
    marginTop: hp(5),
  },
  inputContainer: {
    marginTop: hp(5),
    height: hp(18),
    justifyContent: 'space-between',
  },
  buttonContainer: {
    alignItems: 'center',
  },
});

// interface Props {}

const Login = ({ navigation }: StackScreenProps<ProfileNavParamList, 'Login'>) => {
  return (
    <Box style={styles.container}>
      <StackHeader onPressBack={() => navigation.goBack()} bgColor="primary" />

      <Box style={styles.titleContainer}>
        <Text variant="h1" color="white">
          Welcome back!
        </Text>

        <Text mt="l" variant="h2" color="white">
          Sign in with your email and password or social media to continue
        </Text>
      </Box>

      <Box style={styles.inputContainer}>
        <TextInput placeholder="Email" />
        <TextInput placeholder="Password" secured={true} />
      </Box>

      <Text variant="b1" color="white" marginVertical="xxl">
        Forgot password?
      </Text>

      <Box style={styles.buttonContainer}>
        <Button
          type="purple"
          icon={<Icon name="arrow-right" color={theme.colors.white} size={24} />}
          onPress={() => alert('login')}
          width={70}
          height={70}
          borderRad={10}
        />
      </Box>
    </Box>
  );
};

export default Login;
