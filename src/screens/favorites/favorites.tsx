import React from 'react';
import { StyleSheet } from 'react-native';

import { Box, theme, Text } from '../../components';
import { FavoriteItem } from '../../components/FavoriteItem';
import { ScreenContainer } from '../../components/Screen';
import listings from '../home/listingData';

const styles = StyleSheet.create({
  container: {},
});

// interface favoritesProps {}
const favorites = () => {
  return (
    <ScreenContainer bgColor="secondary" horizontalPadding scrollable topPadding={70}>
      <Text variant="h1" mb="xl">
        Favorites
      </Text>
      {listings.map((l, index) => (
        <FavoriteItem key={index} listing={l} />
      ))}
    </ScreenContainer>
  );
};

export default favorites;
