/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Feather as Icon } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { useQuery } from 'react-query';
import * as Linking from 'expo-linking';

import { Box, theme, Text } from '../../components';
import { HomeCard } from '../../components/HomeCard';
import { HomeHeader } from '../../components/HomeHeader';
import { Listing } from '../../components/ListingItem';
import { AgentCard } from '../../components/AgentCard';
import { HomeNavParamList } from '../../types/navigation.types';
import listingsApi from '../../firebase/listing';
import agentsApi from '../../firebase/agent';
import ActivityIndicator from '../../components/ActivityIndicator';
import Status from '../../components/Status';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.constants.screenPadding / 2,
    paddingTop: theme.constants.screenPadding,
    flex: 1,
  },
  headText: {
    marginTop: hp(4),
    marginBottom: hp(4),
  },
  subHeadText: {
    marginTop: hp(3),
    marginBottom: hp(3),
  },
  cardContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: hp(3),
  },
});

const home = ({ navigation }: StackScreenProps<HomeNavParamList, 'Home'>) => {
  const [active, setActive] = useState<number>(1);

  const data = [
    {
      id: 1,
      icon: (
        <Icon
          name="home"
          color={active === 1 ? theme.colors.yellow : theme.colors.lightGrey}
          size={24}
        />
      ),
      label: 'Homes',
      info: '50+',
    },
    {
      id: 2,
      icon: (
        <Icon
          name="user"
          color={active === 2 ? theme.colors.yellow : theme.colors.lightGrey}
          size={24}
        />
      ),
      label: 'Agents',
      info: '22',
    },
  ];

  const listingsQuery = useQuery('listings', listingsApi.getAllListings);
  const agentsQuery = useQuery('agents', agentsApi.getAllAgents);

  return (
    <>
      <ActivityIndicator visible={listingsQuery.isLoading} />
      <Box style={styles.container}>
        <HomeHeader />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text variant="h1" color="dark" style={styles.headText}>
            Get your dream property
          </Text>

          {/* <SearchInput
            placeholder="Find Listings"
            onFocus={() =>
              navigation.dispatch(
                CommonActions.navigate({
                  name: 'Categories',
                }),
              )
            }
          />

          <Text variant="h2B" color="dark" style={styles.subHeadText}>
            Might help you
          </Text> */}

          <Box style={styles.cardContainer}>
            {data.map((d) => (
              <TouchableOpacity key={d.id} onPress={() => setActive(d.id)}>
                <HomeCard
                  width={wp(42)}
                  active={active === d.id ? true : false}
                  icon={d.icon}
                  label={d.label}
                  info={d.info}
                />
              </TouchableOpacity>
            ))}
          </Box>

          <Text variant="h2B" color="dark" style={styles.subHeadText}>
            {active === 1 ? 'Featured Listings' : 'Featured Agents'}
          </Text>

          {active === 1 ? (
            <Box style={{ paddingBottom: 100 }}>
              <FlatList
                data={listingsQuery.data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Box mb="xl">
                    <Listing
                      listing={item}
                      onPress={() => navigation.navigate('ListingDetail', { listing: item })}
                    />
                  </Box>
                )}
              />
            </Box>
          ) : (
            <Box style={{ paddingBottom: 100 }}>
              <FlatList
                data={agentsQuery.data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <AgentCard
                    agent={item}
                    onPress={() => navigation.navigate('AgentDetail', { agent: item })}
                    onPressMessage={() => Linking.openURL(item.whatsapp_link)}
                    onPressPhone={() => Linking.openURL(`tel:${item.phone}`)}
                  />
                )}
              />
            </Box>
          )}
        </ScrollView>
      </Box>
    </>
  );
};

export default home;
