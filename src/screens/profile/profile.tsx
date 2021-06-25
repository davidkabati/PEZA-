/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Feather as Icon } from '@expo/vector-icons';
import firebase from 'firebase';
import Toast from 'react-native-toast-message';
import { Image } from 'react-native-expo-image-cache';

import { Box, theme, Text } from '../../components';
import ProfileItem from '../../components/ProfileItem';
import { ProfileNavParamList } from '../../types/navigation.types';
import ProfileSvg from '../agentDetail/profileSvg';
import firebaseAuthApi from '../../firebase/auth';
import { CommonActions } from '@react-navigation/routers';
import authApi from '../../firebase/auth';

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
    marginTop: hp(5),
    zIndex: 1,
  },
  svg: {
    position: 'absolute',
    marginTop: hp(15),
  },
  lowerContainer: {
    marginTop: hp(10),
    width: '100%',
    alignItems: 'center',
  },
  noLoginContainer: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
});

const Profile = ({ navigation }: StackScreenProps<ProfileNavParamList, 'Profile'>) => {
  const user = firebase.auth().currentUser;
  const [userDetails, setUserDetails] = useState<any>({});

  const fetchUserDetails = async () => {
    const details = await authApi.getUsersFullDetails(user ? user.uid : '');
    setUserDetails(details);
  };

  useEffect(() => {
    void fetchUserDetails();
    return () => {
      void fetchUserDetails();
    };
  }, [user]);

  const handleAuth = async () => {
    try {
      if (user) {
        await firebaseAuthApi.logOutUser();
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Home',
          }),
        );
        Toast.show({
          type: 'success',
          visibilityTime: 2000,
          autoHide: true,
          text1: 'Logout Success',
          text2: 'You have been succesfully logged out',
        });
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        visibilityTime: 5000,
        autoHide: true,
        text1: 'Logout Error',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        text2: error.message,
      });
    }
  };

  return (
    <Box style={styles.container}>
      {user ? (
        <>
          <Box
            style={[
              styles.profileImg,
              { backgroundColor: user.photoURL ? undefined : theme.colors.dark },
            ]}>
            {user.photoURL && (
              <Image
                {...{ uri: user.photoURL }}
                tint="light"
                transitionDuration={300}
                style={{ width: wp(30), height: wp(30), borderRadius: wp(15) }}
              />
            )}
          </Box>
          <Box style={styles.svg}>
            <ProfileSvg />
          </Box>

          <Text variant="h1M" color="dark" mt="xl">
            {user.displayName}
          </Text>

          <Text variant="b2" color="lightGrey" mt="m">
            {user.email}
          </Text>
        </>
      ) : (
        <Box style={styles.noLoginContainer}>
          <Text style={{ textAlign: 'center', lineHeight: 25 }} variant="h3" color="dark">
            Login/sign up to save details and do more
          </Text>
        </Box>
      )}

      <Box style={styles.lowerContainer}>
        <ProfileItem
          icon={<Icon name="user" color={theme.colors.veryLightPurple} size={24} />}
          label="My Account"
          onPress={() => navigation.navigate('EditAccount')}
        />

        {userDetails.is_admin && (
          <ProfileItem
            icon={<Icon name="home" color={theme.colors.veryLightPurple} size={24} />}
            label="My Listings"
            onPress={() => navigation.navigate('MyListings')}
          />
        )}

        <ProfileItem
          icon={<Icon name="info" color={theme.colors.veryLightPurple} size={24} />}
          label="About"
          onPress={() => true}
        />

        <ProfileItem
          icon={
            <Icon
              name={user ? 'log-out' : 'log-in'}
              color={user ? theme.colors.red : theme.colors.green}
              size={24}
            />
          }
          label={user ? 'Logout' : 'Login/Register'}
          onPress={handleAuth}
        />
      </Box>
    </Box>
  );
};

export default Profile;
