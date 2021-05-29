import React from 'react';
import { StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Feather as Icon } from '@expo/vector-icons';

import { Box, theme, Text } from '../../components';
import { ScreenContainer } from '../../components/Screen';
import { ListingImgSlider } from '../../components/ListingImgSlider';
import { StackHeader } from '../../components/StackHeader';
import { HomeNavParamList } from '../../types/navigation.types';

const styles = StyleSheet.create({
  container: {},
});

const listingDetail = ({
  route,
  navigation,
}: StackScreenProps<HomeNavParamList, 'ListingDetail'>) => {
  return (
    <ScreenContainer bgColor="secondary">
      <StackHeader
        onPressBack={() => navigation.goBack()}
        transparent
        option1={<Icon name="download" color={theme.colors.dark} size={24} />}
      />
      <ListingImgSlider images={route.params.listing.images} />
    </ScreenContainer>
  );
};

export default listingDetail;
