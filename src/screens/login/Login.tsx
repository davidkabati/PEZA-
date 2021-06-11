import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { Formik } from 'formik';
import { Feather as Icon } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { CommonActions } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as yup from 'yup';

import { theme, Text, Box } from '../../components';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import { ProfileNavParamList } from '../../types/navigation.types';
import { StackHeader } from '../../components/StackHeader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
  },
  welcomeContainer: {
    width: theme.constants.screenWidth,
    height: hp(8),
    marginTop: hp(3),
    justifyContent: 'space-between',
  },
  formContainer: {
    marginTop: hp(5),
    height: hp(22),
    justifyContent: 'space-around',
  },
  forgotPasswordContainer: {
    width: theme.constants.screenWidth,
    flexDirection: 'row-reverse',
  },
  registerContainer: {
    flexDirection: 'row',
    paddingBottom: hp(3),
    paddingTop: hp(3),
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: hp(22),
  },
});

const Login = ({ navigation }: StackScreenProps<ProfileNavParamList, 'Login'>) => {
  // const { loginSchema } = useLogin();
  const [loading, setLoading] = useState<boolean>(false);

  const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  interface LoginProps {
    email: string;
    password: string;
  }

  const onSubmit = (values: LoginProps) => {
    try {
      setLoading(true);
      // await firebaseFunc.signInUser(values.email, values.password);
      navigation.dispatch(
        CommonActions.navigate({
          name: 'Home',
        }),
      );
      setLoading(false);
      Toast.show({
        type: 'success',
        visibilityTime: 2000,
        autoHide: true,
        text1: 'Login Success',
        text2: 'You have been successfully logged in',
      });
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        visibilityTime: 2000,
        autoHide: true,
        text1: 'Login Error',
        text2: 'Error logging in',
      });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center', height: '100%' }}
      bounces={false}>
      <StackHeader bgColor="secondary" onPressBack={() => navigation.goBack()} padding />
      <SafeAreaView>
        {/* <ActivityIndicator visible={loading} /> */}
        <Box style={styles.welcomeContainer}>
          <Text variant="h1Max" color="dark">
            Login,
          </Text>
          <Text variant="h2" color="text">
            sign in to continue
          </Text>
        </Box>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={onSubmit}>
          {({ errors, touched, handleChange, handleBlur, handleSubmit }) => {
            return (
              <>
                <Box style={styles.formContainer}>
                  <TextInput
                    placeholder="Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    touched={touched.email}
                    error={errors.email}
                  />

                  <TextInput
                    placeholder="Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    touched={touched.password}
                    error={errors.password}
                    textContentType="password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secured={true}
                  />
                </Box>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('ForgotPassword')}
                  style={styles.forgotPasswordContainer}>
                  <Text variant="b1" color="text">
                    Forgot password?
                  </Text>
                </TouchableOpacity>
                <Box style={styles.buttonContainer}>
                  <Button
                    label="Login"
                    onPress={handleSubmit}
                    type="primary"
                    width={theme.constants.screenWidth}
                  />
                </Box>
              </>
            );
          }}
        </Formik>
        <Box style={styles.registerContainer}>
          <Text variant="b1" color="text">
            Dont have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text variant="b1" color="primary">
              {' '}
              Register Now
            </Text>
          </TouchableOpacity>
        </Box>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;
