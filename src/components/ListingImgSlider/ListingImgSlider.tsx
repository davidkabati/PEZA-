import React from 'react';
import { StyleSheet } from 'react-native';

import { Box, theme, Text } from '..';

const styles = StyleSheet.create({
  container: {},
});

interface Props {
  images: string[] | number[];
}
const ListingImgSlider = ({ images }: Props) => {
  return (
    <Box>
      <Text>ImgSlider</Text>
    </Box>
  );
};

export default ListingImgSlider;
