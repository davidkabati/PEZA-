import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeNavParamList } from '../../types/navigation.types';
import { Home, ListingDetail, Search } from '../../screens';

const HomeStack = createStackNavigator<HomeNavParamList>();

const HomeNav = () => {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Search" component={Search} />
      <HomeStack.Screen name="ListingDetail" component={ListingDetail} />
    </HomeStack.Navigator>
  );
};

export default HomeNav;
