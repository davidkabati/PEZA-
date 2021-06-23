/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useState, useEffect, useCallback } from 'react';
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
import { Tabs } from '../../components/Tabs';
import IListing from '../../types/listing.type';
import listing from '../../firebase/listing';

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
    justifyContent: 'space-between',
    // alignItems: 'flex-end',
    marginBottom: hp(3),
  },
});

const home = ({ navigation }: StackScreenProps<HomeNavParamList, 'Home'>) => {
  const [active, setActive] = useState<any>({});
  const [tab, setTab] = useState<string>('for_sale');
  const [listingData, SetListingData] = useState<IListing[]>([]);
  const [filterListing, setFilterListing] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const data = [
    {
      id: 1,
      icon: (
        <Icon
          name="home"
          color={active.id === 1 ? theme.colors.yellow : theme.colors.lightGrey}
          size={24}
        />
      ),
      label: 'Live on a budget',
    },
    {
      id: 2,
      icon: (
        <Icon
          name="home"
          color={active.id === 2 ? theme.colors.yellow : theme.colors.lightGrey}
          size={24}
        />
      ),
      label: 'Live in style',
    },
    {
      id: 3,
      icon: (
        <Icon
          name="home"
          color={active.id === 3 ? theme.colors.yellow : theme.colors.lightGrey}
          size={24}
        />
      ),
      label: 'Live in luxury',
    },
  ];

  const handleFilter = (item: any) => {
    setActive(item);
    if (item.label === 'Live on a budget') {
      const result = listingData.filter((l) => {
        if (l.price < 4000 && l.type === tab) {
          setFilterListing(result);
        }
      });
    } else if (item.label === 'Live in style') {
      const result = listingData.filter((l) => {
        if (l.price > 4000 && l.price < 10000 && l.type === tab) {
          setFilterListing(result);
        }
      });
    } else return;
  };

  const loadData = async () => {
    setIsLoading(true);
    const listings = await listingsApi.getAllListings();

    if (!active.label) {
      const result = listings.filter((l) => {
        if (l.type === tab) return l;
      });
      SetListingData(result);
    } else if (active.label === 'Live on a budget') {
      const result = listings.filter((l) => {
        if (l.type === tab && l.price < 4000) return l;
      });
      SetListingData(result);
    } else if (active.label === 'Live in style') {
      const result = listings.filter((l) => {
        if (l.type === tab && l.price > 4000 && l.price < 10000) return l;
      });
      SetListingData(result);
    } else if (active.label === 'Live in luxury') {
      const result = listings.filter((l) => {
        if (l.type === tab && l.price > 10000) return l;
      });
      SetListingData(result);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    void loadData();
    return () => {
      loadData;
    };
  }, [tab, active]);

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <Box style={styles.container}>
        <HomeHeader />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text variant="h1" color="dark" style={styles.headText}>
            Get your dream properties
          </Text>

          <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleFilter(item)}
                style={{ marginRight: 20 }}>
                <HomeCard
                  width={wp(35)}
                  active={active.id === item.id ? true : false}
                  icon={item.icon}
                  label={item.label}
                />
              </TouchableOpacity>
            )}
          />

          <Text variant="h2B" color="dark" style={styles.subHeadText}>
            {active.label ? active.label : 'Featured Listings'}
          </Text>

          <Tabs
            text1="For sale"
            value1="for_sale"
            text2="For rent"
            value2="for_rent"
            setSelected={setTab}
          />

          <Box style={{ paddingBottom: 100, marginTop: hp(4) }}>
            {listingData.length < 1 ? (
              <Text variant="b1B" color="primary">
                No Listings found matching your filter
              </Text>
            ) : (
              <FlatList
                data={listingData}
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
            )}
          </Box>
        </ScrollView>
      </Box>
    </>
  );
};

export default home;
