import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Feather as Icon } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

import { Box, theme, Text } from '../../components';
import { StackHeader } from '../../components/StackHeader';
import { ProfileNavParamList } from '../../types/navigation.types';
import { Button } from '../../components/Button';
import TextInput from '../../components/TextInput';
import { Slider } from '../../components/Slider';
import { string } from 'yup';
import IListing from '../../types/listing.type';

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
    paddingTop: theme.constants.screenPadding,
  },
});

// interface Props {}

const NewListingFinal = ({
  navigation,
  route,
}: StackScreenProps<ProfileNavParamList, 'NewListingImg'>) => {
  const { listing } = route.params;

  // Dropdown
  const [open, setOpen] = useState<boolean>(false);
  const [location, setLocation] = useState<any>(null);
  const [items, setItems] = useState([
    { label: 'Lusaka', value: 'lusaka' },
    { label: 'Lagos', value: 'lagos' },
  ]);

  const [title, setTitle] = useState<string>();
  const [price, setPrice] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [address, setAddress] = useState<string>();

  const data: Partial<IListing> = {
    ...listing,
    title,
    price,
    description,
    address,
    address_area: location,
  };

  return (
    <Box style={styles.container}>
      <StackHeader onPressBack={() => navigation.goBack()} title="Step 4 of 4" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}>
        <Text variant="h1Max" color="dark" style={styles.headerText}>
          Complete your listing
        </Text>

        <Text mt="xxl" mb="xxl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
          Title of your listing
        </Text>

        <TextInput
          placeholder="Type listing title here"
          onChange={(e) => setTitle(e.nativeEvent.text)}
        />

        <Text mt="xxl" mb="xxl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
          Set the price
        </Text>

        <Slider />

        <Text mt="xxl" mb="xxl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
          Description
        </Text>

        <TextInput
          placeholder="Enter descriptions"
          height={hp(15)}
          onChange={(e) => setDescription(e.nativeEvent.text)}
        />

        <Text mt="xxl" mb="xxl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
          Address
        </Text>

        <TextInput
          placeholder="Enter listing address"
          height={hp(15)}
          onChange={(e) => setAddress(e.nativeEvent.text)}
        />

        <Text mt="xxl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
          Select location
        </Text>

        <Box style={{ marginVertical: 20 }}>
          <DropDownPicker
            min={0}
            max={5}
            open={open}
            items={items}
            value={location}
            setOpen={setOpen}
            setValue={setLocation}
            setItems={setItems}
          />
        </Box>

        <Box marginVertical="xxl">
          <Button
            type="purple"
            width={theme.constants.screenWidth}
            onPress={() => navigation.navigate('ListingSuccess', { listing: { type: 'for_rent' } })}
            label="Submit for review"
          />
        </Box>
      </ScrollView>
    </Box>
  );
};

export default NewListingFinal;
