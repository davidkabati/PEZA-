import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

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
  roomsContainer: {
    flexDirection: 'row',
  },
  roomOption: {
    width: 56,
    height: 48,
    borderRadius: 16,
    backgroundColor: theme.colors.white,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const roomOptions = ['Any', '1', '2', '3', '4+'];
const bathroomOptions = ['Any', '1', '2', '3', '4+'];

// interface Props {}

const NewListingSpace = ({
  navigation,
}: StackScreenProps<ProfileNavParamList, 'NewListingSpace'>) => {
  const [rooms, setRooms] = useState<string>(roomOptions[0]);
  const [bathrooms, setBathrooms] = useState<string>(bathroomOptions[0]);

  return (
    <Box style={styles.container}>
      <StackHeader onPressBack={() => navigation.goBack()} title="Step 2 of 4" />
      <ScrollView
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}>
        <Text variant="h1Max" color="dark" style={styles.headerText}>
          How many guests can stay?
        </Text>

        <Text mb="xxl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
          Number of bedrooms
        </Text>

        <Box style={styles.roomsContainer}>
          {roomOptions.map((r, index) => (
            <TouchableOpacity
              onPress={() => setRooms(r)}
              key={index}
              style={[
                styles.roomOption,
                { backgroundColor: rooms === r ? theme.colors.primary : theme.colors.white },
              ]}>
              <Text variant="b1" color={rooms === r ? 'white' : 'dark'}>
                {r}
              </Text>
            </TouchableOpacity>
          ))}
        </Box>

        <Text mt="xxl" mb="xxl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
          Number of bathrooms
        </Text>

        <Box style={styles.roomsContainer}>
          {bathroomOptions.map((r, index) => (
            <TouchableOpacity
              onPress={() => setBathrooms(r)}
              key={index}
              style={[
                styles.roomOption,
                { backgroundColor: bathrooms === r ? theme.colors.primary : theme.colors.white },
              ]}>
              <Text variant="b1" color={bathrooms === r ? 'white' : 'dark'}>
                {r}
              </Text>
            </TouchableOpacity>
          ))}
        </Box>

        <Box marginVertical="xxl">
          <Button
            type="purple"
            width={theme.constants.screenWidth}
            onPress={() => navigation.navigate('NewListingImg', { listing: { type: 'for_rent' } })}
            label="Next Step"
          />
        </Box>
      </ScrollView>
    </Box>
  );
};

export default NewListingSpace;
