import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileNavParamList } from '../../types/navigation.types';
import {
  Profile,
  MyListings,
  EditAccount,
  ManageListings,
  NewListingInfo,
  NewListingSpace,
  NewListingImg,
  NewListingFinal,
  ListingSuccess,
  Login,
  Register,
  ForgotPassword,
} from '../../screens';

const ProfileStack = createStackNavigator<ProfileNavParamList>();

const ProfileNav = () => {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="MyListings" component={MyListings} />
      <ProfileStack.Screen name="EditAccount" component={EditAccount} />
      <ProfileStack.Screen name="ManageListings" component={ManageListings} />
      <ProfileStack.Screen name="NewListingInfo" component={NewListingInfo} />
      <ProfileStack.Screen name="NewListingSpace" component={NewListingSpace} />
      <ProfileStack.Screen name="NewListingImg" component={NewListingImg} />
      <ProfileStack.Screen name="NewListingFinal" component={NewListingFinal} />
      <ProfileStack.Screen name="ListingSuccess" component={ListingSuccess} />
      <ProfileStack.Screen name="Login" component={Login} />
      <ProfileStack.Screen name="Register" component={Register} />
      <ProfileStack.Screen name="ForgotPassword" component={ForgotPassword} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNav;
