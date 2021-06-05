import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Box, theme, Text } from '../../components';
import { FavoriteItem } from '../../components/FavoriteItem';
import listings from '../home/listingData';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    flex: 1,
    paddingTop: theme.constants.screenPadding,
    alignItems: 'center',
  },
});

// interface favoritesProps {}
const favorites = () => {
  return (
    <Box style={styles.container}>
      <Text variant="h1" mb="xl" ml="xl" style={{ alignSelf: 'flex-start' }}>
        Favorites
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {listings.map((l, index) => (
          <FavoriteItem key={index} listing={l} />
        ))}
      </ScrollView>
    </Box>
  );
};

export default favorites;
