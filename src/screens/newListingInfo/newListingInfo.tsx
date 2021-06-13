import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, ScrollView } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { Box, theme, Text } from '../../components';
import { StackHeader } from '../../components/StackHeader';
import { ProfileNavParamList } from '../../types/navigation.types';
import { Tabs } from '../../components/Tabs';
import { amenities } from '../sort/sort';
import { Button } from '../../components/Button';
import Multiselect from '../../components/Multiselect';

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
  amenityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: theme.constants.screenWidth,
  },
  amenity: {
    width: 100,
    height: 48,
    backgroundColor: theme.colors.white,
    marginHorizontal: 12,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 16,
  },
});

const propertyType = [
  {
    id: 1,
    value: 'House',
  },
  {
    id: 2,
    value: 'TownHouse',
  },
  {
    id: 3,
    value: 'Cabin',
  },
  {
    id: 4,
    value: 'Chalet',
  },
  {
    id: 5,
    value: 'Earth house',
  },
  {
    id: 6,
    value: 'Hut',
  },
  {
    id: 7,
    value: 'Villa',
  },
  {
    id: 8,
    value: 'Cottage',
  },
];

// interface Props {}

const NewListingInfo = ({
  navigation,
}: StackScreenProps<ProfileNavParamList, 'NewListingInfo'>) => {
  const [selectedAmenity, setSelectedAmenity] = useState<string[]>([]);
  const [type, setType] = useState<string>();
  const [listingType, setListingType] = useState<string[]>();

  return (
    <Box style={styles.container}>
      <StackHeader onPressBack={() => navigation.goBack()} title="Step 1 of 4" />

      <ScrollView
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}>
        <Text variant="h1Max" color="dark" style={styles.headerText}>
          Tell us about your place
        </Text>

        <Text mb="xl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
          First, set listing type
        </Text>

        <Tabs text1="For Sale" text2="For Rent" setSelected={setType} />

        <Text mb="xl" mt="xl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
          Then, lets narrow things down
        </Text>

        <Multiselect items={amenities} setSelection={setSelectedAmenity} />

        <Text mb="xl" mt="xl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
          Now choose property type
        </Text>

        <Multiselect items={propertyType} setSelection={setListingType} />

        <Box marginVertical="xxl">
          <Button
            type="purple"
            width={theme.constants.screenWidth}
            onPress={() =>
              navigation.navigate('NewListingSpace', { listing: { type: 'for_rent' } })
            }
            label="Next Step"
          />
        </Box>
      </ScrollView>
    </Box>
  );
};

export default NewListingInfo;
