/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import { Box, theme, Text } from '../../components';
import { SortNavParamList } from '../../types/navigation.types';
import { StackHeader } from '../../components/StackHeader';
import { Listing } from '../../components/ListingItem';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
});

// interface SortResultProps {}

const SortResult = ({ navigation, route }: StackScreenProps<SortNavParamList, 'SortResult'>) => {
  return (
    <Box style={styles.container}>
      <StackHeader onPressBack={() => navigation.goBack()} padding />

      <Text variant="h1" color="dark" mb="xxxl">
        Search Results
      </Text>

      {route.params.listings.length < 1 ? (
        <Text variant="b1B" color="dark">
          No listing found matching your search
        </Text>
      ) : (
        <Box style={{ paddingBottom: 100, width: theme.constants.screenWidth }}>
          <FlatList
            data={route.params.listings}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Listing
                listing={item}
                onPressFav={() => alert('Fav pressed!')}
                onPress={() => navigation.navigate('ListingDetail', { listing: item })}
              />
            )}
          />
        </Box>
      )}
    </Box>
  );
};

export default SortResult;
