import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Feather as Icon } from '@expo/vector-icons';

import { Box, theme, Text } from '../../components';
import { StackHeader } from '../../components/StackHeader';
import { ProfileNavParamList } from '../../types/navigation.types';
import { Button } from '../../components/Button';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.constants.screenPadding / 2,
    paddingTop: theme.constants.screenPadding,
    flex: 1,
  },
  headerText: {
    alignSelf: 'flex-start',
    width: '70%',
    lineHeight: 35,
    marginBottom: hp(4),
    paddingTop: theme.constants.screenPadding,
  },
  uploadContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.constants.screenWidth,
    height: hp(30),
  },
});

// interface Props {}

const NewListingImg = ({ navigation }: StackScreenProps<ProfileNavParamList, 'NewListingImg'>) => {
  return (
    <Box style={styles.container}>
      <StackHeader onPressBack={() => navigation.goBack()} title="Step 3 of 4" />

      <Text variant="h1Max" color="dark" style={styles.headerText}>
        Upload photos
      </Text>

      <Box style={styles.uploadContainer}>
        <Icon name="plus-square" color={theme.colors.veryLightPurple} size={35} />
        <Text variant="h3" color="text" marginVertical="l">
          Upload your photos at least 5
        </Text>
        <Button
          type="primary"
          label="Upload photos"
          width={wp(35)}
          height={hp(5)}
          borderRad={7}
          onPress={() => alert('upload images')}
        />
      </Box>

      <Box marginVertical="xxl">
        <Button
          type="purple"
          width={theme.constants.screenWidth}
          onPress={() => navigation.navigate('NewListingFinal', { listing: { type: 'for_rent' } })}
          label="Next Step"
        />
      </Box>
    </Box>
  );
};

export default NewListingImg;
