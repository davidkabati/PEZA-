import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { Box, theme, Text } from '../../components';
import { SortNavParamList } from '../../types/navigation.types';
import { Tabs } from '../../components/Tabs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.constants.screenPadding / 2,
    paddingTop: theme.constants.screenPadding,
  },
  headerText: {
    width: '70%',
    lineHeight: 35,
    marginBottom: hp(4),
  },
  dash: {
    width: theme.constants.screenWidth,
    backgroundColor: theme.colors.lightGrey,
    height: 1,
    marginVertical: hp(3),
  },
});

// interface Props {}
const Sort = ({ navigation }: StackScreenProps<SortNavParamList, 'Sort'>) => {
  return (
    <Box style={styles.container}>
      {/* <StackHeader onPressBack={() => navigation.goBack()} /> */}
      <Text variant="h1" color="dark" mt="l" style={styles.headerText}>
        Filter for your perfect property
      </Text>
      <Tabs text1="For Sale" text2="For Rent" />
      <Box style={styles.dash} />
    </Box>
  );
};

export default Sort;
