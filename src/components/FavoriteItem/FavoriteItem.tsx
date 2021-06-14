import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image } from 'react-native-expo-image-cache';

import { Box, theme, Text } from '..';
import IListing from '../../types/listing.type';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: theme.constants.screenWidth,
    height: 109,
    borderRadius: 16,
    backgroundColor: theme.colors.white,
    marginBottom: 20,
    padding: 20,
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 20,
    justifyContent: 'space-between',
    height: '80%',
  },
  button: {
    width: wp(9),
    height: wp(9),
    backgroundColor: theme.colors.purple,
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props {
  listing: IListing;
  bgColor: 'white' | 'secondary';
}

const FavoriteItem = ({ listing, bgColor }: Props) => {
  return (
    <Box style={[styles.container, { backgroundColor: theme.colors[bgColor] }]}>
      <Image {...{ uri: listing.images[0] }} style={{ width: 90, height: 70, borderRadius: 16 }} />

      <Box style={styles.textContainer}>
        <Text numberOfLines={1} variant="b1B" color="dark">
          {listing.title}
        </Text>
        <Text numberOfLines={1} variant="b2" color="lightGrey">
          {listing.address}
        </Text>
        <Text numberOfLines={1} variant="b1B" color="dark">{`ZK ${listing.price}`}</Text>
      </Box>

      <Box style={{ flex: 1 }} />

      <TouchableOpacity style={styles.button} onPress={() => true}>
        <Icon name="trash-2" color={theme.colors.white} size={22} />
      </TouchableOpacity>
    </Box>
  );
};

export default FavoriteItem;
