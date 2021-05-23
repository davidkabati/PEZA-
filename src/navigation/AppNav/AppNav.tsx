import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '../../components';
import { AppNavParamList } from '../../types/navigation.types';
import { Home, Categories, Favorites, Profile } from '../../screens';
import { HomeIcon, CategoryIcon, FavoriteIcon, ProfileIcon } from '../../svg/homeNavIcons';
import NavButtonWrapper from '../../components/NavButtonWrapper/NavButtonWrapper.tsx';

const AppStack = createBottomTabNavigator<AppNavParamList>();

const AppNav = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppStack.Navigator
        tabBarOptions={{
          keyboardHidesTabBar: true,
          showLabel: false,
          activeTintColor: theme.colors.primary,
          inactiveTintColor: theme.colors.lightGrey,
          inactiveBackgroundColor: theme.colors.secondary,
          activeBackgroundColor: theme.colors.secondary,
          //   tabStyle: styles.tabBarItem,
          style: {
            backgroundColor: theme.colors.secondary,
          },
        }}>
        <AppStack.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => {
              return <HomeIcon color={color} />;
            },
          }}
          listeners={() => ({
            tabPress: () => {
              void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            },
          })}
        />
        <AppStack.Screen
          name="Categories"
          component={Categories}
          options={{
            tabBarIcon: ({ color }) => {
              return <CategoryIcon color={color} />;
            },
          }}
          listeners={() => ({
            tabPress: () => {
              void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            },
          })}
        />
        <AppStack.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarIcon: ({ color }) => {
              return <FavoriteIcon color={color} />;
            },
          }}
          listeners={() => ({
            tabPress: () => {
              void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            },
          })}
        />
        <AppStack.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => {
              return <ProfileIcon color={color} />;
            },
          }}
          listeners={() => ({
            tabPress: () => {
              void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            },
          })}
        />
      </AppStack.Navigator>
    </SafeAreaView>
  );
};

export default AppNav;
