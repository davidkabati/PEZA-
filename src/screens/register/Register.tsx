import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, Keyboard } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { theme, Box, Text } from '../../components';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import { CommonActions } from '@react-navigation/native';
import { ProfileNavParamList } from '../../types/navigation.types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: theme.constants.screenWidth,
    marginTop: hp(2.5),
  },
  headingContainer: {
    flexDirection: 'row',
    width: theme.constants.screenWidth,
    marginVertical: hp(3),
  },
  formContainer: {
    height: hp(40),
    justifyContent: 'space-between',
  },
  termsOfUseContainer: {
    alignItems: 'center',
    marginBottom: hp(3),
  },
});

const Register = ({ navigation }: StackScreenProps<ProfileNavParamList, 'Register'>) => {
  const [loading, setLoading] = useState<boolean>(false);

  const registerSchema = yup.object().shape({
    fullName: yup.string().min(2).required(),
    email: yup.string().email().required(),
    phone: yup.string().min(10).required(),
    password: yup.string().required(),
  });

  interface RegisterProps {
    fullName: string;
    email: string;
    password: string;
  }

  const onSubmit = (values: RegisterProps) => {
    try {
      setLoading(true);
      // await firebaseFunc.registerUser(
      //   values.email,
      //   values.password,
      //   values.fullName
      // );
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
        text1: 'Registeration Success',
        text2: 'You have been successfully registered',
      });
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        visibilityTime: 5000,
        autoHide: true,
        text1: 'Sign up Error',
        text2: 'Error registering user',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ActivityIndicator visible={loading} /> */}
      <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        <Formik
          initialValues={{ fullName: '', email: '', phone: '', password: '' }}
          validationSchema={registerSchema}
          onSubmit={onSubmit}>
          {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <>
              <KeyboardAvoidingView behavior="position">
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.goBack()}
                  style={styles.backContainer}>
                  <Icon name="chevron-left" size={20} color={theme.colors.dark} />
                  <Text variant="h2B" mt="s" color="dark">
                    Back
                  </Text>
                </TouchableOpacity>
                <Box style={styles.headingContainer}>
                  <Text variant="h1Max" color="dark">
                    Create Account
                  </Text>
                </Box>
                <Box style={styles.formContainer}>
                  <TextInput
                    placeholder="Full Name"
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    touched={touched.fullName}
                    error={errors.fullName}
                    keyboardType="default"
                    autoCapitalize="words"
                    autoCompleteType="name"
                  />
                  <TextInput
                    placeholder="Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    touched={touched.email}
                    error={errors.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoCompleteType="email"
                  />
                  <TextInput
                    placeholder="Phone Number"
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    touched={touched.phone}
                    error={errors.phone}
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    autoCompleteType="tel"
                  />
                  <TextInput
                    placeholder="Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    touched={touched.password}
                    error={errors.password}
                    keyboardType="default"
                    autoCapitalize="none"
                    secured={true}
                  />
                </Box>
              </KeyboardAvoidingView>
              <Box style={{ flex: 1 }} />
              <Box mb="xxxl">
                <Button
                  label="Complete Registeration"
                  onPress={handleSubmit}
                  type="primary"
                  width={theme.constants.screenWidth}
                />
              </Box>
            </>
          )}
        </Formik>
        <Box style={styles.termsOfUseContainer}>
          <Text variant="b1" color="text">
            By creating an account you agree with our
          </Text>
          <TouchableOpacity onPress={() => true}>
            <Text mt="s" variant="b1" color="primary">
              Terms of Use and Privacy Policy
            </Text>
          </TouchableOpacity>
        </Box>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Register;
