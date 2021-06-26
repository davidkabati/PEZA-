/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AntDesign as AIcon } from '@expo/vector-icons';
import { Image } from 'react-native-expo-image-cache';
import { useDispatch } from 'react-redux';
import firebase from 'firebase';
import Toast from 'react-native-toast-message';
import favoritesApi from '../../firebase/favorite';

import { Box, theme, Text } from '..';
import IListing, { IListingFavorite } from '../../types/listing.type';
import { Area, Baths, Rooms } from '../../svg/listingsIcon';
import { removeFavorite, addFavorite } from '../../redux/actions';

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
    backgroundColor: theme.colors.green,
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
  onPress: () => void;
}
const Listing = ({ listing, onPress }: Props) => {
  const user = firebase.auth().currentUser;

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const [favorites, setFavorites] = useState<any[]>([]);

  const dispatch = useDispatch();

  const removeFromFavorite = (favorite: IListingFavorite) => {
    dispatch(removeFavorite(favorite));
  };

  const addToFavorite = (favorite: IListingFavorite) => {
    dispatch(addFavorite(favorite));
  };

  const handleAddFavorite = (listingToAdd: any) => {
    try {
      const newFav = {
        ...listingToAdd,
      };

      delete newFav.id;

      const fav: IListingFavorite = {
        ...newFav,
        user_id: user ? user.uid : '',
        product_id: listing.id,
      };

      console.log(fav);

      if (isFavorite) {
        const fav = favorites.filter((f: IListingFavorite) => f.product_id == listing.id);
        removeFromFavorite(fav[0]);
        Toast.show({
          type: 'success',
          position: 'top',
          visibilityTime: 2000,
          autoHide: true,
          text1: 'Favorites',
          text2: 'Successfully removed from favorites.',
        });
      } else {
        addToFavorite(fav);
        Toast.show({
          type: 'success',
          position: 'top',
          visibilityTime: 2000,
          autoHide: true,
          text1: 'Favorites',
          text2: 'Successfully added to favorites.',
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        position: 'top',
        visibilityTime: 2000,
        autoHide: true,
        text1: 'Favorites',
        text2: 'Error handling favorite.',
      });
    }
  };

  const loadFavs = async () => {
    const favs = await favoritesApi.getUserFavorites(user ? user?.uid : '');
    setFavorites(favs);
  };

  const isFav = () => {
    const isFav = favorites.some((f: IListingFavorite) => f.product_id === listing.id);
    isFav && setIsFavorite(true);
  };

  useEffect(() => {
    void loadFavs();
    isFav();
  }, [favorites]);

  return (
    <Box style={styles.container}>
      <Box>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image
            {...{ uri: listing.images[0] }}
            style={styles.image}
            tint="light"
            transitionDuration={300}
          />
        </TouchableOpacity>
        {/* {user && (
          <TouchableOpacity onPress={() => handleAddFavorite(listing)} style={styles.favButton}>
            {isFavorite ? (
              <AIcon name="heart" color={theme.colors.red} size={24} />
            ) : (
              <AIcon name="hearto" color={theme.colors.white} size={24} />
            )}
          </TouchableOpacity>
        )} */}
        <Box
          style={[
            styles.listingType,
            {
              backgroundColor: theme.colors.green,
            },
          ]}>
          <Text variant="b1" color="white">
            {listing.type === 'for_sale' ? 'For Sale' : 'For Rent'}
          </Text>
        </Box>
      </Box>
      <Box style={styles.infoContainer}>
        <Box style={{ width: wp(65) }}>
          <Text numberOfLines={1} variant="h2" color="dark" mt="l">
            {listing.title}
          </Text>
          <Text numberOfLines={1} variant="b1B" color="text" mt="m">
            {listing.address}
          </Text>
        </Box>
        <Box style={styles.priceContainer}>
          <Text variant="b1" color="white">{`ZK ${Intl.NumberFormat('en-US').format(
            listing.price,
          )}`}</Text>
        </Box>
      </Box>
      <Box style={styles.iconContainer}>
        <Text variant="b1" color="text" mr="s">
          {listing.rooms}
        </Text>
        <Text variant="b1" color="text">
          {`bedroom${listing.rooms === '1' ? '' : 's'}`}
        </Text>
        <Text variant="b1" color="text" mr="s" ml="l">
          {listing.baths}
        </Text>
        <Text variant="b1" color="text" mr="l">
          {`bathroom${listing.rooms === '1' ? '' : 's'}`}
        </Text>
        {/* <Area />
        <Text variant="b1" color="text" mr="m" ml="s">
          {listing.area !== '' ? `${listing.area} m2` : 'n/a'}
        </Text> */}
      </Box>
    </Box>
  );
};

export default Listing;
