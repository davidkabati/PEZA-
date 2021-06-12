import React from 'react';
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firebase from 'firebase';

import { theme, Box, Text } from '..';
import { HeaderIcon } from '../../svg/homeIcons';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    flexDirection: 'row',
    height: hp(8),
    alignItems: 'center',
    paddingBottom: hp(1),
  },
  imageContainer: {
    width: hp(7),
    height: hp(7),
    borderRadius: hp(3.5),
    backgroundColor: theme.colors.dark,
    marginRight: wp(5),
  },
  textContainer: {
    justifyContent: 'space-between',
    height: '70%',
  },
});

const HomeHeader = () => {
  const user = firebase.auth().currentUser;

  return (
    <Box style={styles.container}>
      {user ? (
        <>
          <Box style={styles.imageContainer}>
            <Box />
          </Box>
          <Box style={styles.textContainer}>
            <Text variant="b2" color="text">
              Welcome,
            </Text>

            <Text variant="b1" color="dark">
              {user.displayName}
            </Text>
          </Box>
        </>
      ) : (
        <Text variant="h1" color="dark">
          Welcome to Peza
        </Text>
      )}
      <Box style={{ flex: 1 }} />
      <HeaderIcon />
    </Box>
  );
};

export default HomeHeader;
