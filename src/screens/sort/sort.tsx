/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';

import { Box, theme, Text } from '../../components';
import { SortNavParamList } from '../../types/navigation.types';
import { Tabs } from '../../components/Tabs';
import { Slider } from '../../components/Slider';
import { AirConIcon } from './amenitiesIcon';
import { Button } from '../../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.constants.screenPadding / 2,
  },
  headerText: {
    width: '70%',
    lineHeight: 35,
    marginBottom: hp(4),
    paddingTop: theme.constants.screenPadding,
  },
  dash: {
    width: theme.constants.screenWidth,
    backgroundColor: theme.colors.lightGrey,
    height: 0.5,
    marginVertical: hp(3),
  },
  roomsContainer: {
    flexDirection: 'row',
    marginTop: 15,
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

const roomOptions = ['Any', '1', '2', '3', '4+'];
const bathroomOptions = ['Any', '1', '2', '3', '4+'];
export const amenities = [
  {
    id: 1,
    name: 'Air Con.',
    icon: <AirConIcon color={theme.colors.primary} />,
  },
  {
    id: 2,
    name: 'Alarm',
    icon: <AirConIcon color={theme.colors.primary} />,
  },
  {
    id: 3,
    name: 'Balcony',
    icon: <AirConIcon color={theme.colors.primary} />,
  },
  {
    id: 4,
    name: 'Parking',
    icon: <AirConIcon color={theme.colors.primary} />,
  },
  {
    id: 5,
    name: 'Pool',
    icon: <AirConIcon color={theme.colors.primary} />,
  },
  {
    id: 6,
    name: 'CCTV',
    icon: <AirConIcon color={theme.colors.primary} />,
  },
];

// interface Props {}
const Sort = ({ navigation }: StackScreenProps<SortNavParamList, 'Sort'>) => {
  const [rooms, setRooms] = useState<string>(roomOptions[0]);
  const [bathrooms, setBathrooms] = useState<string>(bathroomOptions[0]);
  const [selectedAmenity, setSelectedAmenity] = useState<string[]>([]);

  const [minValue, setMinValue] = useState<number>();
  const [maxValue, setMaxValue] = useState<number>();

  // Dropdown
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<any>(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]);

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

  // console.log(`min: ${minValue}`);
  // console.log(`max: ${maxValue}`);

  return (
    <Box style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text variant="h1" color="dark" style={styles.headerText}>
          Filter for your perfect property
        </Text>
        <Tabs text1="For Sale" text2="For Rent" />
        <Box style={styles.dash} />
        <Text variant="b1B" color="dark" mb="m">
          Minimum Asking
        </Text>
        <Slider getValue={(v) => setMinValue(v)} />
        <Text variant="b1B" color="dark" mb="m" mt="xl">
          Maximum Asking
        </Text>
        <Slider getValue={(v) => setMaxValue(v)} />
        <Text variant="h2" color="dark" mt="xxl" mb="l">
          Location
        </Text>
        <DropDownPicker
          multiple
          min={0}
          max={5}
          open={open}
          items={items}
          value={value}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
        <Text variant="b1" color="text" mt="xxl" textAlign="center">
          The average price in this area is ZK 4000
        </Text>
        <Text variant="h2" color="dark" mt="xxl">
          Rooms
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
        <Text variant="h2" color="dark" mt="xxl">
          Bathrooms
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
        <Text variant="h2" color="dark" mt="xxl">
          Amenities
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
        <Box marginVertical="xxl">
          <Button
            type="primary"
            width={theme.constants.screenWidth}
            onPress={() => navigation.navigate('SortResult', { sortParam: 'fixed' })}
            label="Filter properties"
          />
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Sort;
