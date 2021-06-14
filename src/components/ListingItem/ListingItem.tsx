/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Feather as Icon } from '@expo/vector-icons';
import { Image } from 'react-native-expo-image-cache';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';

import { Box, theme, Text } from '..';
import IListing from '../../types/listing.type';
import { Area, Baths, Rooms } from '../../svg/listingsIcon';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: hp(35),
    marginBottom: hp(5),
  },
  image: {
    width: '100%',
    height: hp(23),
    borderRadius: wp(4),
  },
  favButton: {
    position: 'absolute',
    left: wp(80),
    bottom: hp(16),
    padding: wp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceContainer: {
    backgroundColor: theme.colors.yellow,
    borderRadius: wp(3),
    height: hp(4.5),
    padding: wp(2),
    justifyContent: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    marginVertical: hp(1),
    alignItems: 'center',
    marginTop: hp(2),
  },
  listingType: {
    position: 'absolute',
    width: wp(20),
    height: hp(3.5),
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.green,
    top: hp(17),
    left: wp(3),
  },
});

interface Props {
  listing: IListing;
  onPressFav: () => void;
  onPress: () => void;
}
const Listing = ({ listing, onPressFav, onPress }: Props) => {
  // const user = firebase.auth().currentUser;

  // const { favorites } = useSelector((state: any) => state.favoriteReducer);

  // const handleAddFavorite = (listingToAdd: IListing) => {
  //   const fav = {
  //     ...listing,
  //     product_id: listing.id,
  //     user_id: user ? user?.uid : '',
  //   };
  // };

  return (
    <Box style={styles.container}>
      <Box>
        <Image
          {...{ uri: listing.images[0] }}
          style={styles.image}
          tint="light"
          transitionDuration={300}
        />
        <TouchableOpacity onPress={onPressFav} style={styles.favButton}>
          <Icon name="heart" color={theme.colors.red} size={24} />
        </TouchableOpacity>
        <Box style={styles.listingType}>
          <Text variant="b1" color="white">
            {listing.type === 'for_sale' ? 'For Sale' : 'For Rent'}
          </Text>
        </Box>
      </Box>
      <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.infoContainer}>
        <Box>
          <Text variant="h2" color="dark" mt="l">
            {listing.title}
          </Text>
          <Text variant="b1B" color="text" mt="m">
            {listing.address}
          </Text>
        </Box>
        <Box style={styles.priceContainer}>
          <Text variant="b1" color="white">{`ZK ${listing.price}`}</Text>
        </Box>
      </TouchableOpacity>
      <Box style={styles.iconContainer}>
        <Rooms />
        <Text variant="b1" color="text" mr="m" ml="s">
          {listing.rooms}
        </Text>
        <Baths />
        <Text variant="b1" color="text" mr="m" ml="s">
          {listing.baths}
        </Text>
        <Area />
        <Text variant="b1" color="text" mr="m" ml="s">{`${listing.area} m2`}</Text>
      </Box>
    </Box>
  );
};

export default Listing;
