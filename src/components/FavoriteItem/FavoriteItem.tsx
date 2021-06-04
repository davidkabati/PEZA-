import React from 'react';
import { StyleSheet } from 'react-native';

import { Box, theme, Text } from '..';

const styles = StyleSheet.create({
  container: {},
});

// interface FavoriteItemProps {}

const FavoriteItem = () => {
  return (
    <Box style={styles.container}>
      <Text>Fav item</Text>
    </Box>
  );
};

export default FavoriteItem;
