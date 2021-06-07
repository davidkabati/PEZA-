import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Feather as Icon } from '@expo/vector-icons';

import { Box, theme, Text } from '../../components';
import { Button } from '../../components/Button';
import { StackHeader } from '../../components/StackHeader';
import TextInput from '../../components/TextInput';
import { ProfileNavParamList } from '../../types/navigation.types';
import ProfileSvg from '../agentDetail/profileSvg';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    flex: 1,
    paddingHorizontal: theme.constants.screenPadding / 2,
    paddingTop: theme.constants.screenPadding,
    alignItems: 'center',
  },
  profileImg: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(15),
    backgroundColor: theme.colors.dark,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(5),
    zIndex: 1,
  },
  svg: {
    position: 'absolute',
    marginTop: hp(10),
  },
  inputContainer: {
    height: hp(18),
    justifyContent: 'space-between',
    marginBottom: hp(3),
  },
});

// interface Props {}

const EditAccount = ({ navigation }: StackScreenProps<ProfileNavParamList, 'EditAccount'>) => {
  return (
    <Box style={styles.container}>
      <StackHeader onPressBack={() => navigation.goBack()} />
      <TouchableOpacity
        activeOpacity={1}
        onPress={Keyboard.dismiss}
        style={{ alignItems: 'center', flex: 1 }}>
        <Box style={styles.profileImg}>
          <Icon name="camera" color={theme.colors.white} size={40} />
        </Box>
        <Box style={styles.svg}>
          <ProfileSvg />
        </Box>

        <Box mt="xxl" style={styles.inputContainer}>
          <TextInput placeholder="First name" />
          <TextInput placeholder="Last name" />
        </Box>
        <Button
          type="purple"
          onPress={() => alert('save')}
          label="Save Details"
          width={theme.constants.screenWidth}
        />
      </TouchableOpacity>
    </Box>
  );
};

export default EditAccount;
