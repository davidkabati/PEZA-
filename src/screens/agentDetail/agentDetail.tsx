import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Feather as Icon } from '@expo/vector-icons';

import { Box, theme, Text } from '../../components';
import { StackHeader } from '../../components/StackHeader';
import { HomeNavParamList } from '../../types/navigation.types';
import listings from '../home/listingData';
import { Listing } from '../../components/ListingItem';
import ProfileSvg from './profileSvg';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    paddingTop: theme.constants.screenPadding - 10,
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
  contactContainer: {
    flexDirection: 'row',
    width: wp(25),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(3),
    marginBottom: hp(4),
  },
  contactItem: {
    backgroundColor: theme.colors.white,
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
    marginTop: hp(8),
  },
});

// interface AgentDetailProps {}

const AgentDetail = ({ navigation, route }: StackScreenProps<HomeNavParamList, 'AgentDetail'>) => {
  const { first_name, last_name, email, phone, whatsapp_link } = route.params.agent;

  return (
    <Box style={styles.container}>
      <StackHeader onPressBack={() => navigation.goBack()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: theme.constants.screenPadding / 2 }}>
        <Box style={{ alignItems: 'center' }}>
          <Box style={styles.profileImg} />

          <Box style={styles.svg}>
            <ProfileSvg />
          </Box>

          <Text variant="h1M" color="dark" mt="xl">{`${first_name} ${last_name}`}</Text>

          <Text variant="b2" color="lightGrey" mt="m">
            {email}
          </Text>

          <Box style={styles.contactContainer}>
            <Box style={styles.contactItem}>
              <Icon name="phone" color={theme.colors.veryLightPurple} size={24} />
            </Box>

            <Box style={styles.contactItem}>
              <Icon name="message-circle" color={theme.colors.veryLightPurple} size={24} />
            </Box>
          </Box>
        </Box>

        <Text variant="h1" color="dark" marginVertical="xl">
          Listings
        </Text>

        {listings.map((listing) => (
          <Listing
            key={listing.id}
            listing={listing}
            onPressFav={() => alert('Fav pressed!')}
            onPress={() => navigation.navigate('ListingDetail', { listing: listing })}
          />
        ))}
      </ScrollView>
    </Box>
  );
};

export default AgentDetail;
