/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Feather as Icon } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { useQuery } from 'react-query';
import { View, AnimatePresence } from 'moti';

import { Box, theme, Text } from '../../components';
import { HomeCard } from '../../components/HomeCard';
import { Listing } from '../../components/ListingItem';
import { HomeNavParamList } from '../../types/navigation.types';
import listingsApi from '../../firebase/listing';
import ActivityIndicator from '../../components/ActivityIndicator';
import { Tabs } from '../../components/Tabs';
import Logo from '../../svg/logo';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.constants.screenPadding / 2,
    paddingTop: theme.constants.screenPadding,
    flex: 1,
  },
  headText: {
    marginTop: hp(3),
    marginBottom: hp(4),
  },
  subHeadText: {
    marginTop: hp(3),
    marginBottom: hp(3),
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(3),
  },
});

const ICON_COLOR = theme.colors.yellow;

const home = ({ navigation }: StackScreenProps<HomeNavParamList, 'Home'>) => {
  const data = [
    {
      id: 1,
      icon: <Icon name="home" color={ICON_COLOR} size={24} />,
      label: 'All Listings',
    },
    {
      id: 2,
      icon: <Icon name="home" color={ICON_COLOR} size={24} />,
      label: 'Live on a budget',
    },
    {
      id: 3,
      icon: <Icon name="home" color={ICON_COLOR} size={24} />,
      label: 'Live in style',
    },
    {
      id: 4,
      icon: <Icon name="home" color={ICON_COLOR} size={24} />,
      label: 'Live in luxury',
    },
    {
      id: 5,
      icon: <Icon name="home" color={ICON_COLOR} size={24} />,
      label: 'Throw an event',
    },
    {
      id: 6,
      icon: <Icon name="home" color={ICON_COLOR} size={24} />,
      label: 'Spend a night',
    },
  ];

  const scrollRef = useRef<any>();

  const [active, setActive] = useState<any>(data[0]);
  const [tab, setTab] = useState<string>('for_sale');
  const [sortData, setSortData] = useState<any[]>([]);

  const handleFilter = (item: any) => {
    setActive(item);
  };

  const { data: listingData, isLoading } = useQuery('listings', () => listingsApi.getAllListings());

  const loadData = () => {
    if (!active.label) {
      const result =
        listingData &&
        listingData.filter((l) => {
          if (l.type === tab) return l;
        });

      setSortData(result ? result : []);
    } else if (active.label === 'Live on a budget') {
      const result =
        listingData &&
        listingData.filter((l) => {
          if (l.type === tab && l.price < 4000) return l;
        });

      setSortData(result ? result : []);
    } else if (active.label === 'Live in style') {
      const result =
        listingData &&
        listingData.filter((l) => {
          if (l.type === tab && l.price > 4000 && l.price < 10000) return l;
        });
      setSortData(result ? result : []);
    } else if (active.label === 'Live in luxury') {
      const result =
        listingData &&
        listingData.filter((l) => {
          if (l.type === tab && l.price > 10000) return l;
        });
      setSortData(result ? result : []);
    } else if (active.label === 'All Listings') {
      const result =
        listingData &&
        listingData.filter((l) => {
          if (l.type === tab) return l;
        });
      setSortData(result ? result : []);
    } else if (active.label === 'Throw an event') {
      const result =
        listingData &&
        listingData.filter((l) => {
          if (l.type === tab && l.party_allowed === true) return l;
        });
      setSortData(result ? result : []);
    } else if (active.label === 'Spend a night') {
      const result =
        listingData &&
        listingData.filter((l) => {
          if (l.type === tab && l.daily_lease === true) return l;
        });
      setSortData(result ? result : []);
    }
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <Box style={styles.container}>
        <Logo width={87.2} height={34} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text variant="h1" color="primary" style={styles.headText}>
            Get your dream properties
          </Text>

          <FlatList
            data={data}
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  handleFilter(item);
                  loadData();
                  scrollRef.current.scrollToIndex({ animated: true, index: index });
                }}
                style={{ marginRight: 10 }}>
                <HomeCard
                  width={wp(35)}
                  active={active.id === item.id ? true : false}
                  icon={item.icon}
                  label={item.label}
                />
              </TouchableOpacity>
            )}
          />

          <AnimatePresence>
            <View
              from={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'timing', duration: 750 }}
              exit={{
                opacity: 0,
              }}>
              <Text variant="h2B" color="dark" style={styles.subHeadText}>
                {active.label ? active.label : 'Featured Listings'}
              </Text>
            </View>
          </AnimatePresence>

          <Tabs
            text1="For sale"
            value1="for_sale"
            text2="For rent"
            value2="for_rent"
            setSelected={setTab}
            onChange={loadData}
          />

          <Box style={{ paddingBottom: 100, marginTop: hp(4) }}>
            <FlatList
              data={sortData.length < 1 ? listingData : sortData}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={() => (
                <Text variant="b1B" color="primary">
                  Sorry, no data available. Try again later...
                </Text>
              )}
              renderItem={({ item }) => (
                <AnimatePresence>
                  <View
                    from={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'timing', duration: 750 }}
                    exit={{
                      opacity: 0,
                    }}>
                    <Listing
                      listing={item}
                      onPress={() =>
                        navigation.navigate('ListingDetail', {
                          listing: item,
                        })
                      }
                    />
                  </View>
                </AnimatePresence>
              )}
            />
          </Box>
        </ScrollView>
      </Box>
    </>
  );
};

export default home;
