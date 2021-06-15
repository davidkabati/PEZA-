/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import firebase from 'firebase';

import { Box, theme, Text } from '../../components';
import { FavoriteItem } from '../../components/FavoriteItem';
import Status from '../../components/Status';
import { removeFavorite } from '../../redux/actions';
import { IListingFavorite } from '../../types/listing.type';
import { FavoritesNavParamList } from '../../types/navigation.types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
    paddingTop: theme.constants.screenPadding,
    alignItems: 'center',
  },
});

// interface favoritesProps {}
const favorites = ({ navigation }: StackScreenProps<FavoritesNavParamList, 'Favorite'>) => {
  const { favorites } = useSelector((state: any) => state.favoriteReducer);

  const user = firebase.auth().currentUser;

  const dispatch = useDispatch();

  const removeFromFavorite = (favorite: IListingFavorite) => {
    dispatch(removeFavorite(favorite));
  };

  const handleRemoveFavorite = (favorite: IListingFavorite) => {
    removeFromFavorite(favorite);
    Toast.show({
      type: 'success',
      position: 'top',
      visibilityTime: 2000,
      autoHide: true,
      text1: 'Favorites',
      text2: 'Successfully removed from favorites.',
    });
  };

  return (
    <Box style={styles.container}>
      <Text variant="h1" mb="xl" ml="xl" style={{ alignSelf: 'flex-start' }}>
        Favorites
      </Text>
      {favorites.length < 1 || !user?.uid ? (
        <Status
          image={require('../../../assets/images/noContent.png')}
          text="Sorry, you have no favorites"
          onPress={false}
          bgColor="white"
        />
      ) : (
        <Box
          mt="xl"
          style={{
            paddingBottom: 100,
            width: theme.constants.screenWidth,
            height: hp(75),
          }}>
          <FlatList
            data={favorites}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <FavoriteItem
                listing={item}
                bgColor="secondary"
                onPressButton={() => handleRemoveFavorite(item)}
                onPress={() => navigation.navigate('ListingDetail', { listing: item })}
              />
            )}
          />
        </Box>
      )}
    </Box>
  );
};

export default favorites;
