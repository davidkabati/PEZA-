import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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
    name: 'House',
  },
  {
    id: 2,
    name: 'TownHouse',
  },
  {
    id: 3,
    name: 'Cabin',
  },
  {
    id: 4,
    name: 'Chalet',
  },
  {
    id: 5,
    name: 'Earth house',
  },
  {
    id: 6,
    name: 'Hut',
  },
  {
    id: 7,
    name: 'Villa',
  },
  {
    id: 8,
    name: 'Cottage',
  },
];

// interface Props {}

const NewListingInfo = ({
  navigation,
}: StackScreenProps<ProfileNavParamList, 'NewListingInfo'>) => {
  const [selectedAmenity, setSelectedAmenity] = useState<string[]>([]);

  const handleAmenity = (a: string) => {
    const amenityArray: string[] = [];
    if (amenityArray.includes(a)) {
      const index = amenityArray.indexOf(a);
      amenityArray.splice(index, 1);
    } else {
      amenityArray.push(a);
      console.log(amenityArray);
      setSelectedAmenity(amenityArray);
    }
  };

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

        <Tabs text1="For Sale" text2="For Rent" />

        <Text mb="xl" mt="xl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
          Then, lets narrow things down
        </Text>

        <Box style={styles.amenityContainer}>
          {amenities.map((a) => (
            <TouchableOpacity
              onPress={() => handleAmenity(a.name)}
              key={a.id}
              style={[
                styles.amenity,
                {
                  backgroundColor: selectedAmenity.includes(a.name)
                    ? theme.colors.primary
                    : theme.colors.white,
                },
              ]}>
              {a.icon}
              <Text variant="b1" ml="m" color={selectedAmenity.includes(a.name) ? 'white' : 'dark'}>
                {a.name}
              </Text>
            </TouchableOpacity>
          ))}
        </Box>

        <Text mb="xl" mt="xl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
          Now choose property type
        </Text>

        <Box style={styles.amenityContainer}>
          {propertyType.map((a) => (
            <TouchableOpacity
              onPress={() => handleAmenity(a.name)}
              key={a.id}
              style={[
                styles.amenity,
                {
                  backgroundColor: selectedAmenity.includes(a.name)
                    ? theme.colors.primary
                    : theme.colors.white,
                },
              ]}>
              <Text variant="b1" color={selectedAmenity.includes(a.name) ? 'white' : 'dark'}>
                {a.name}
              </Text>
            </TouchableOpacity>
          ))}
        </Box>

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
