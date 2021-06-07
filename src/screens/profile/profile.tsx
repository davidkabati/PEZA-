import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Feather as Icon } from '@expo/vector-icons';

import { Box, theme, Text } from '../../components';
import ProfileItem from '../../components/ProfileItem';
import { ProfileNavParamList } from '../../types/navigation.types';
import ProfileSvg from '../agentDetail/profileSvg';

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
    backgroundColor: theme.colors.dark,
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
});

// interface Props {}

const Profile = ({ navigation }: StackScreenProps<ProfileNavParamList, 'Profile'>) => {
  return (
    <Box style={styles.container}>
      <Box style={styles.profileImg} />

      <Box style={styles.svg}>
        <ProfileSvg />
      </Box>

      <Text variant="h1M" color="dark" mt="xl">
        Jonah Ada
      </Text>

      <Text variant="b2" color="lightGrey" mt="m">
        jonahada@gmail.com
      </Text>

      <Box style={styles.lowerContainer}>
        <ProfileItem
          icon={<Icon name="user" color={theme.colors.veryLightPurple} size={24} />}
          label="My Account"
          onPress={() => navigation.navigate('EditAccount')}
        />

        <ProfileItem
          icon={<Icon name="home" color={theme.colors.veryLightPurple} size={24} />}
          label="My Listings"
          onPress={() => navigation.navigate('MyListings')}
        />

        <ProfileItem
          icon={<Icon name="info" color={theme.colors.veryLightPurple} size={24} />}
          label="About"
          onPress={() => alert('About')}
        />

        <ProfileItem
          icon={<Icon name="log-in" color={theme.colors.green} size={24} />}
          label="Login"
          onPress={() => navigation.navigate('Login')}
        />
      </Box>
    </Box>
  );
};

export default Profile;
