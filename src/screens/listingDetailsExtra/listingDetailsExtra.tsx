import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import { Box } from '../../components';
import { StackHeader } from '../../components/StackHeader';
import { HomeNavParamList } from '../../types/navigation.types';
import { ScreenContainer } from '../../components/Screen';

const styles = StyleSheet.create({
  container: {},
});

// interface ListingDetailsExtraProps {}

const ListingDetailsExtra = ({
  navigation,
}: StackScreenProps<HomeNavParamList, 'ListingDetailExtra'>) => {
  return (
    <ScreenContainer bgColor="secondary">
      <StackHeader onPressBack={() => navigation.goBack()} />
    </ScreenContainer>
  );
};

export default ListingDetailsExtra;
