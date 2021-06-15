import React, { useState, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Feather as Icon } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import Constants from 'expo-constants';
import firebase from 'firebase';
import * as yup from 'yup';
import { Formik } from 'formik';
import { CommonActions } from '@react-navigation/routers';
import Toast from 'react-native-toast-message';
import { Image } from 'react-native-expo-image-cache';

import { Box, theme } from '../../components';
import { Button } from '../../components/Button';
import { StackHeader } from '../../components/StackHeader';
import TextInput from '../../components/TextInput';
import { ProfileNavParamList } from '../../types/navigation.types';
import ProfileSvg from '../agentDetail/profileSvg';
import ActivityIndicator from '../../components/ActivityIndicator';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    flex: 1,
    paddingHorizontal: theme.constants.screenPadding / 2,
    paddingTop: theme.constants.screenPadding,
    alignItems: 'center',
  },
  profileImg: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(15),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(5),
    zIndex: 1,
  },
  svg: {
    position: 'absolute',
    marginTop: hp(10),
  },
  inputContainer: {
    justifyContent: 'space-between',
  },
});

const EditAccount = ({ navigation }: StackScreenProps<ProfileNavParamList, 'EditAccount'>) => {
  const userData = firebase.auth().currentUser;

  const [loading, setLoading] = useState<boolean>(false);

  const updateAccountSchema = yup.object().shape({
    full_name: yup.string(),
  });

  const [avatar, setAvatar] = useState<string>();
  const [progress, setProgress] = useState<string>();

  const restoreAvatar = () => {
    const user = firebase.auth().currentUser;
    setAvatar(user?.photoURL ? user.photoURL : undefined);
  };

  useEffect(() => {
    restoreAvatar();
    return () => {
      restoreAvatar();
    };
  }, []);

  const ImageChoiceAndUpload = async () => {
    try {
      if (Constants.platform?.ios) {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission is required for use.');
          return;
        }
      }
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        const actions = [];
        actions.push({ resize: { width: 300 } });
        const manipulatorResult = await ImageManipulator.manipulateAsync(result.uri, actions, {
          compress: 0.4,
        });
        const localUri = await fetch(manipulatorResult.uri);
        const localBlob = await localUri.blob();
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        const filename = userData && userData.uid + new Date().getTime();
        const storageRef = firebase
          .storage()
          .ref()
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          .child('avatar/' + filename);
        const putTask = storageRef.put(localBlob);
        putTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            setProgress(progress + '%');
          },
          (error) => {
            console.log(error);
            alert('Upload failed.');
          },
          () => {
            void putTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              setProgress('');
              setAvatar(downloadURL);
            });
          },
        );
      }
    } catch (e) {
      alert('The size may be too much.');
    }
  };

  const avatarUpdate = (values: any) => {
    try {
      setLoading(true);
      const data = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        full_name: values.full_name !== '' ? values.full_name : userData?.displayName,
        avatar: avatar,
      };
      userData?.updateProfile({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        displayName: values.full_name !== '' ? values.full_name : userData.displayName,
        photoURL: avatar,
      });
      const userRef = firebase.firestore().collection('user').doc(userData?.uid);
      void userRef.update(data);
      navigation.dispatch(
        CommonActions.navigate({
          name: 'Home',
        }),
      );
      setLoading(false);
      Toast.show({
        type: 'success',
        autoHide: true,
        visibilityTime: 2000,
        text1: 'Account update',
        text2: 'Account updated successfuly',
      });
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        autoHide: true,
        visibilityTime: 2000,
        text1: 'Account update',
        text2: 'Error updating account, try again',
      });
    }
  };

  return (
    <Box style={styles.container}>
      <StackHeader onPressBack={() => navigation.goBack()} />
      <ActivityIndicator visible={loading} />
      <TouchableOpacity
        activeOpacity={1}
        onPress={Keyboard.dismiss}
        style={{ alignItems: 'center', flex: 1 }}>
        <TouchableOpacity
          onPress={ImageChoiceAndUpload}
          style={[styles.profileImg, { backgroundColor: avatar ? undefined : theme.colors.dark }]}>
          {avatar ? (
            <Image
              {...{ uri: avatar }}
              style={{
                width: wp(30),
                height: wp(30),
                borderRadius: wp(15),
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              tint="light"
              transitionDuration={300}
            />
          ) : (
            <Icon name="camera" color={theme.colors.white} size={40} />
          )}
        </TouchableOpacity>

        <Box style={styles.svg}>
          <ProfileSvg />
        </Box>

        <Formik
          initialValues={{ full_name: '' }}
          validationSchema={updateAccountSchema}
          onSubmit={avatarUpdate}>
          {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <>
              <Box mt="xxl" mb="xxl" style={styles.inputContainer}>
                <TextInput
                  placeholder="Full Name"
                  onChangeText={handleChange('full_name')}
                  onBlur={handleBlur('full_name')}
                  touched={touched.full_name}
                  error={errors.full_name}
                  keyboardType="default"
                  autoCapitalize="words"
                  autoCompleteType="name"
                />
              </Box>

              <Button
                type="purple"
                onPress={handleSubmit}
                label="Save Details"
                width={theme.constants.screenWidth}
              />
            </>
          )}
        </Formik>
      </TouchableOpacity>
    </Box>
  );
};

export default EditAccount;
