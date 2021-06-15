/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, ScrollView } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Feather as Icon } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import * as ImageManipulator from 'expo-image-manipulator';
import Toast from 'react-native-toast-message';

import { Box, theme, Text } from '../../components';
import { StackHeader } from '../../components/StackHeader';
import { ProfileNavParamList } from '../../types/navigation.types';
import { Button } from '../../components/Button';
import ImageInputList from '../../components/ImageInputList';
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
    marginBottom: hp(4),
    paddingTop: theme.constants.screenPadding,
  },
  uploadContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.constants.screenWidth,
    height: hp(50),
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  uploadContainerWithImg: {},
  imageSlider: {},
});

// interface Props {}

const NewListingImg = ({
  navigation,
  route,
}: StackScreenProps<ProfileNavParamList, 'NewListingImg'>) => {
  const { listing } = route.params;

  const [imgUris, setImgUris] = useState<string[]>([]);

  const [avatar, setAvatar] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const data: Partial<IListing> = {
    ...listing,
    images: avatar,
  };

  const handleNext = async () => {
    if (imgUris.length < 5) {
      return Toast.show({
        type: 'error',
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
        text1: 'Listing Image',
        text2: 'Add at least 5 images to continue.',
      });
    } else {
      setLoading(true);
      let i;
      for (i = 0; i < imgUris.length; i++) {
        await imageUpload(imgUris[i]);
      }

      setTimeout(() => {
        setLoading(false);
        navigation.navigate('NewListingFinal', { listing: data });
      }, 5000);
    }
  };
  const imageUpload = async (uri: string) => {
    const userData = firebase.auth().currentUser;

    const actions = [];

    actions.push({ resize: { width: 300 } });

    const manipulatorResult = await ImageManipulator.manipulateAsync(uri, actions, {
      compress: 0.8,
    });

    const localUri = await fetch(manipulatorResult.uri);

    const localBlob = await localUri.blob();
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const filename = userData && userData.uid + new Date().getTime();

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

  const onAddImage = (uri: string | null) => {
    const newUris = [...imgUris, uri as string];
    setImgUris(newUris);
  };

  const onRemoveImage = (uri: string | null) => {
    setImgUris(imgUris.filter((i) => i !== uri));
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) {
        // await imageUpload(result.uri);
        onAddImage(result.uri);
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      console.log('Error reading image: ' + error);
    }
  };

  return (
    <Box style={styles.container}>
      <StackHeader onPressBack={() => navigation.goBack()} title="Step 3 of 4" />

      <Text variant="h1Max" color="dark" style={styles.headerText}>
        Upload photos
      </Text>

      <Box style={styles.uploadContainer}>
        {imgUris.length > 0 ? (
          <ScrollView>
            <ImageInputList {...{ onAddImage, onRemoveImage, imgUris }} />
          </ScrollView>
        ) : (
          <>
            <Icon name="plus-square" color={theme.colors.veryLightPurple} size={55} />

            <Text variant="h2" color="text" marginVertical="xxl">
              Upload at least 5 photos
            </Text>

            <Button
              type="primary"
              label="Upload photos"
              width={wp(45)}
              height={hp(8)}
              borderRad={7}
              onPress={() => selectImage()}
            />
          </>
        )}
      </Box>

      <Box marginVertical="xxl">
        <Button
          type="purple"
          width={theme.constants.screenWidth}
          onPress={handleNext}
          label={loading ? 'Uploading Images' : 'Next Step'}
        />
      </Box>
    </Box>
  );
};

export default NewListingImg;
