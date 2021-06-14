/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { Box, theme, Text } from '../../components';
import { FavoriteItem } from '../../components/FavoriteItem';
import listings from '../home/listingData';
import Status from '../../components/Status';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
    paddingTop: theme.constants.screenPadding,
    alignItems: 'center',
  },
});

// interface favoritesProps {}
const favorites = () => {
  const { favorites } = useSelector((state: any) => state.favoriteReducer);
  return (
    <Box style={styles.container}>
      <Text variant="h1" mb="xl" ml="xl" style={{ alignSelf: 'flex-start' }}>
        Favorites
      </Text>
      {favorites.length < 1 ? (
        <Status
          image={require('../../../assets/images/noContent.png')}
          text="Sorry, you have no favorites"
          onPress={false}
          bgColor="white"
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {listings.map((l, index) => (
            <FavoriteItem key={index} listing={l} />
          ))}
        </ScrollView>
      )}
    </Box>
  );
};

export default favorites;
