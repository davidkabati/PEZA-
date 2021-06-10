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
    backgroundColor: theme.colors.white,
    alignItems: 'center',
  },
  topContainer: {
    flex: 0.85,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    width: '100%',
    zIndex: 1,
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
    marginTop: hp(17),
  },
  lowerContainer: {
    backgroundColor: theme.colors.white,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: hp(65),
    padding: theme.constants.screenPadding / 2,
    alignItems: 'center',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-between',
  },
});

// interface Props {}

const Login = ({ navigation }: StackScreenProps<ProfileNavParamList, 'Login'>) => {
  return (
    <Box style={styles.container}>
      <StackHeader onPressBack={() => navigation.goBack()} bgColor="primary" padding />

      <Box style={styles.topContainer}>
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

        <Text
          variant="b1"
          color="yellow"
          marginVertical="xxl"
          style={{ alignSelf: 'flex-start', marginLeft: theme.constants.screenPadding / 2 }}>
          Forgot password?
        </Text>

        <Box style={styles.buttonContainer}>
          <Button
            type="purple"
            icon={<Icon name="arrow-right" color={theme.colors.white} size={26} />}
            onPress={() => alert('login')}
            width={60}
            height={60}
            borderRad={10}
          />
        </Box>
      </Box>

      <Box style={styles.lowerContainer}>
        {/* <Text variant="b1" color="text" mb="xxl" mt="l">
          Or continue with
        </Text>

        <Box style={styles.socialLoginContainer}>
          <Button
            type="purple"
            icon={<Icon name="award" color={theme.colors.white} size={26} />}
            onPress={() => alert('login')}
            width={60}
            height={60}
            borderRad={10}
          />
          <Button
            type="purple"
            icon={<Icon name="award" color={theme.colors.white} size={26} />}
            onPress={() => alert('login')}
            width={60}
            height={60}
            borderRad={10}
          />
        </Box> */}
      </Box>
    </Box>
  );
};

export default Login;
