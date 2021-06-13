import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, Image as RNImage } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firebase from 'firebase';
import { Image } from 'react-native-expo-image-cache';

import { Box, theme, Text } from '../../components';
import { ProfileNavParamList } from '../../types/navigation.types';
import { StackHeader } from '../../components/StackHeader';
import { Button } from '../../components/Button';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    flex: 1,
    paddingHorizontal: theme.constants.screenPadding / 2,
    paddingTop: theme.constants.screenPadding,
    alignItems: 'center',
  },
  lowerContainer: {
    backgroundColor: theme.colors.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    height: hp(80),
    width: wp(100),
    top: wp(15),
    padding: 20,
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  displayImg: {
    width: wp(12),
    height: wp(12),
    backgroundColor: theme.colors.dark,
    borderRadius: wp(6),
    marginRight: wp(5),
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// interface MyListingsProps {}

const MyListings = ({ navigation }: StackScreenProps<ProfileNavParamList, 'MyListings'>) => {
  const user = firebase.auth().currentUser;

  return (
    <Box style={styles.container}>
      <StackHeader
        onPressBack={() => navigation.goBack()}
        bgColor="primary"
        title="Listing Product"
      />

      <Box style={styles.lowerContainer}>
        <Box style={styles.userProfile}>
          <Box style={styles.displayImg}>
            {user?.photoURL && (
              <Image
                {...{ uri: user.photoURL ? user.photoURL : '' }}
                style={{
                  width: wp(12),
                  height: wp(12),
                  borderRadius: wp(6),
                }}
                tint="light"
                transitionDuration={300}
              />
            )}
          </Box>
          <Box>
            <Text variant="b1" color="text" mb="m">
              Welcome,
            </Text>
            <Text variant="h2" color="dark">
              {user?.displayName}
            </Text>
          </Box>
        </Box>

        <Box style={styles.image}>
          <RNImage
            source={require('../../../assets/images/underConstruction.png')}
            style={{ width: 323.6, height: 216.5 }}
          />

          <Text mt="l" variant="h1" color="dark">
            Lets set up your listing
          </Text>

          <Text mt="l" mb="xxl" variant="h3" color="text">
            List your home in a few steps
          </Text>

          <Button
            type="purple"
            onPress={() => navigation.navigate('NewListingInfo')}
            label="Add New Listing"
            width={theme.constants.screenWidth}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MyListings;
