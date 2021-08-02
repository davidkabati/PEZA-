/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';

import Toast from 'react-native-toast-message';
import firebase from 'firebase';
import * as ImageManipulator from 'expo-image-manipulator';

import { Box, theme, Text } from '../../components';
import { StackHeader } from '../../components/StackHeader';
import { ProfileNavParamList } from '../../types/navigation.types';
import { Button } from '../../components/Button';
import TextInput from '../../components/TextInput';
import IListing from '../../types/listing.type';
import ActivityIndicator from '../../components/ActivityIndicator';
import listingApi from '../../firebase/listing';
import storage from '../../utils/storage';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.constants.screenPadding / 2,
    paddingTop: theme.constants.screenPadding + 20,
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

  // const user = firebase.auth().currentUser;

  const [userDetails, setUserDetails] = useState<any>({});

  // Dropdown Location
  const [open, setOpen] = useState<boolean>(false);
  const [location, setLocation] = useState<any>(null);
  const [items, setItems] = useState([
    { label: 'Lusaka', value: 'Lusaka' },
    { label: 'Chalala', value: 'Chalala' },
    { label: 'Avondale', value: 'Avondale' },
    { label: 'Bauleni', value: 'Bauleni' },
    { label: 'Cathedrall Hill', value: 'Cathedrall Hill' },
    { label: 'Chainda', value: 'Chainda' },
    { label: 'Chaisa', value: 'Chaisa' },
    { label: 'Chamba Valley', value: 'Chamba Valley' },
    { label: 'Chandamali', value: 'Chandamali' },
    { label: 'Chawama', value: 'Chawama' },
    { label: 'Chelston', value: 'Chelston' },
    { label: 'Chibolya', value: 'Chibolya' },
    { label: 'Chilenje', value: 'Chilenje' },
    { label: 'Chilenje South', value: 'Chilenje South' },
    { label: 'Chipata', value: 'Chipata' },
    { label: 'Chiwala Mambwe', value: 'Chiwala Mambwe' },
    { label: 'Chunga', value: 'Chunga' },
    { label: 'Desai', value: 'Desai' },
    { label: 'Emmasdale', value: 'Emmasdale' },
    { label: 'Frank', value: 'Frank' },
    { label: 'George', value: 'George' },
    { label: 'Handsworth', value: 'Handsworth' },
    { label: 'Ibex Hill', value: 'Ibex Hill' },
    { label: 'Chakunkula', value: 'Chakunkula' },
    { label: 'Industrial Area', value: 'Industrial Area' },
    { label: 'Jack', value: 'Jack' },
    { label: 'John Howard', value: 'John Howard' },
    { label: 'Kabanana', value: 'Kabanana' },
    { label: 'Kabulonga', value: 'Kabulonga' },
    { label: 'Kalikiliki', value: 'Kalikiliki' },
    { label: 'Kalingalinga', value: 'Kalingalinga' },
    { label: 'Kalundu', value: 'Kalundu' },
    { label: 'Kamanga', value: 'Kamanga' },
    { label: 'Kamwala', value: 'Kamwala' },
    { label: 'Kamwala South', value: 'Kamwala South' },
    { label: 'Kaunda Square', value: 'Kaunda Square' },
    { label: 'Libala', value: 'Libala' },
    { label: 'Lilinda', value: 'Lilinda' },
    { label: 'Longacres', value: 'Longacres' },
    { label: 'Luneta', value: 'Luneta' },
    { label: 'Makeni', value: 'Makeni' },
    { label: 'Mandevu', value: 'Mandevu' },
    { label: 'Matero', value: 'Matero' },
    { label: 'Msisi', value: 'Msisi' },
    { label: 'Mulobela', value: 'Mulobela' },
    { label: 'Mutambe', value: 'Mutambe' },
    { label: 'Mwambula', value: 'Mwambula' },
    { label: 'Namununga', value: 'Namununga' },
    { label: 'New Kasama', value: 'New Kasama' },
    { label: 'New Woodlands Extension', value: 'New Woodlands Extension' },
    { label: 'Ngombe', value: 'Ngombe' },
    { label: 'Northmead', value: 'Northmead' },
    { label: 'Nyumba Yanga', value: 'Nyumba Yanga' },
    { label: 'Olympia Extension', value: 'Olympia Extension' },
    { label: 'Paradise', value: 'Paradise' },
    { label: 'Rhodes Park', value: 'Rhodes Park' },
    { label: 'Ridgeway', value: 'Ridgeway' },
    { label: 'State Lodge', value: 'State Lodge' },
    { label: 'Woodlands', value: 'Woodlands' },
    { label: 'Woodlands Extension', value: 'Woodlands Extension' },
  ]);

  // Dropdown Owner
  const [openO, setOpenO] = useState<boolean>(false);
  const [owner, setOwner] = useState<any>(null);
  const [itemsO, setItemsO] = useState([
    { label: 'Owner', value: 'owner' },
    { label: 'Agent', value: 'agent' },
  ]);

  const [title, setTitle] = useState<string>('');
  const [agentCode, setAgentCode] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<any[]>([]);

  const data: Partial<IListing> = {
    ...listing,
    title,
    price,
    description,
    address,
    address_area: location,
  };

  const imageUpload = async (uri: string) => {
    const actions = [];

    actions.push({ resize: { width: 300 } });

    const manipulatorResult = await ImageManipulator.manipulateAsync(uri, actions, {
      compress: 0.99,
    });

    const localUri = await fetch(manipulatorResult.uri);

    const localBlob = await localUri.blob();
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const filename = userDetails.id + new Date().getTime();

    const storageRef = firebase
      .storage()
      .ref()
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      .child('avatar/' + filename);

    const putTask = storageRef.put(localBlob);

    // eslint-disable-next-line @typescript-eslint/await-thenable
    putTask.on('state_changed', () => {
      void putTask.snapshot.ref.getDownloadURL().then((URL) => {
        avatar.push(URL);
      });
    });
  };

  const imageUpload2 = async (uri: string) => {
    // Implement a new Blob promise with XMLHTTPRequest
    const blob: Blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    // Create a ref in Firebase (I'm using my user's ID)
    const ref = firebase.storage().ref().child(`avatars/${Math.random()}`);

    // Upload blob to Firebase
    const snapshot = await ref.put(blob, { contentType: 'image/png' });

    // Create a download URL
    const remoteURL = await snapshot.ref.getDownloadURL();

    // Return the URL
    return remoteURL;
  };

  const upload = async () => {
    let i;
    for (i = 0; i < listing.images.length; i++) {
      const url = await imageUpload2(listing.images[i]);
      avatar.push(url);
    }
  };

  const handleSubmit = async () => {
    try {
      if (
        title === '' ||
        price === 0 ||
        description === '' ||
        address === '' ||
        location === null ||
        owner === null
      ) {
        return Toast.show({
          type: 'error',
          position: 'top',
          visibilityTime: 2500,
          autoHide: true,
          text1: 'Listing Info',
          text2: 'Complete all fields to continue.',
        });
      } else {
        setLoading(true);

        await upload();

        delete data.images;

        const finalListing = {
          ...data,
          images: avatar,
          created_at: new Date().toISOString(),
          sale_price: '',
          on_sale: false,
          agent_code: agentCode,
          agent_id: userDetails.id,
          agent_name: userDetails.full_name,
          agent_email: userDetails.email,
          agent_phone: userDetails.phoneNumber,
          verified: 'not verified',
          owner: owner,
        };

        // setTimeout(() => {

        // }, 7500);

        void listingApi.addListing(finalListing);
        navigation.navigate('ListingSuccess');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);

      Toast.show({
        type: 'error',
        autoHide: true,
        text1: 'Submit Listing',
        text2: 'Error submitting listing.',
      });
    }
  };

  const getUser = async () => {
    const user = await storage.getData('user');
    if (user) {
      setUserDetails(JSON.parse(user));
    }
  };

  useEffect(() => {
    void getUser();
  }, []);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Box style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'position' : 'height'}>
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
              autoCapitalize="words"
            />

            <Text mt="xxl" mb="xxl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
              Agent Code (Optional)
            </Text>

            <TextInput
              placeholder="Enter agent code here if applicable"
              onChange={(e) => setAgentCode(e.nativeEvent.text)}
            />

            <Text mt="xxl" mb="xxl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
              Set the price (ZK)
            </Text>

            <TextInput
              placeholder="Enter Price"
              onChange={(e) => setPrice(Number(e.nativeEvent.text))}
              keyboardType="number-pad"
            />

            <Text mt="xxl" mb="xxl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
              Description
            </Text>

            <TextInput
              placeholder="Enter description"
              height={hp(15)}
              onChange={(e) => setDescription(e.nativeEvent.text)}
              multiline
            />

            <Text mt="xxl" mb="xxl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
              Address
            </Text>

            <TextInput
              placeholder="Enter listing address"
              height={hp(15)}
              onChange={(e) => setAddress(e.nativeEvent.text)}
              multiline
              autoCapitalize="words"
            />

            <Text mt="xxl" variant="h2B" color="dark" style={{ alignSelf: 'flex-start' }}>
              Are you the owner of the listing?
            </Text>

            <Box style={{ marginVertical: 20 }}>
              <DropDownPicker
                open={openO}
                items={itemsO}
                value={owner}
                setOpen={setOpenO}
                setValue={setOwner}
                setItems={setItemsO}
                style={{ borderColor: theme.colors.white }}
                textStyle={{ color: theme.colors.text }}
              />
            </Box>

            {!openO ? (
              <>
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
                    style={{ borderColor: theme.colors.white }}
                    textStyle={{ color: theme.colors.text }}
                  />
                </Box>
              </>
            ) : (
              <Box style={{ marginVertical: 20, height: 55 }} />
            )}

            {!open ? (
              <Box style={{ marginVertical: 70 }} pb="xxxl">
                <Button
                  type="purple"
                  width={theme.constants.screenWidth}
                  onPress={handleSubmit}
                  label="Submit for review"
                />
              </Box>
            ) : (
              <Box style={{ marginVertical: 70, height: 56 }} />
            )}

            <Box style={{ height: 50 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
    </>
  );
};

export default NewListingFinal;
