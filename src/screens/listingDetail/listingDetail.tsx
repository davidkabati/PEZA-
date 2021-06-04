import React from 'react';
import { StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Feather as Icon } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Box, theme, Text } from '../../components';
import { ScreenContainer } from '../../components/Screen';
import { ListingImgSlider } from '../../components/ListingImgSlider';
import { StackHeader } from '../../components/StackHeader';
import { HomeNavParamList } from '../../types/navigation.types';
import { Button } from '../../components/Button';

const styles = StyleSheet.create({
  container: {},
  imgSlider: {
    position: 'absolute',
  },
  lowerContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: 'absolute',
    top: hp(43),
    padding: theme.constants.screenPadding / 2,
    width: '100%',
    height: '60%',
    backgroundColor: theme.colors.white,
  },
  title: {
    marginLeft: theme.constants.screenPadding / 2,
    position: 'absolute',
    top: hp(32),
  },
  addressContainer: {
    flexDirection: 'row',
    width: theme.constants.screenWidth,
    alignItems: 'center',
    marginTop: hp(1),
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayImg: {
    width: wp(12),
    height: wp(12),
    backgroundColor: theme.colors.dark,
    borderRadius: wp(6),
    marginRight: wp(5),
  },
  asking: {},
  propertyDetail: {
    marginTop: hp(5),
  },
  amenities: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(2),
    marginBottom: hp(2),
  },
});

const listingDetail = ({
  route,
  navigation,
}: StackScreenProps<HomeNavParamList, 'ListingDetail'>) => {
  const { images, title, address, price, rooms, baths, type, description, area } =
    route.params.listing;
  return (
    <ScreenContainer bgColor="secondary">
      <StackHeader
        onPressBack={() => navigation.goBack()}
        transparent
        option1={<Icon name="download" color={theme.colors.dark} size={20} />}
      />

      <Box style={styles.imgSlider}>
        <ListingImgSlider images={images} />
      </Box>

      <Box style={styles.title}>
        <Text variant="h1" color="white">
          {title}
        </Text>

        <Box style={styles.addressContainer}>
          <Icon name="map-pin" color={theme.colors.text} size={18} />
          <Text variant="b1" color="white" ml="m">
            {address}
          </Text>
        </Box>
      </Box>

      <Box style={styles.lowerContainer}>
        <Box style={styles.topContainer}>
          <Box style={styles.displayImg} />
          <Box>
            <Text variant="h3" color="dark" mb="m">{`${'Jack'} ${'Saunders'}`}</Text>

            <Text variant="b1" color="text">
              Agent
            </Text>
          </Box>
          <Box style={{ flex: 1 }} />
          <Box style={styles.asking}>
            <Text variant="h3" color="dark">
              Asking
            </Text>
            <Text variant="h2B" color="dark" mt="s">
              {`ZK ${price}`}
            </Text>
          </Box>
        </Box>

        <Box style={styles.propertyDetail}>
          <Text variant="h2B" color="dark">
            Property detail
          </Text>

          <Box style={styles.amenities}>
            <Box>
              <Text variant="b1" color="lightGrey">
                Bedrooms
              </Text>
              <Text variant="b1B" color="dark" mt="s">
                {rooms}
              </Text>
            </Box>
            <Box>
              <Text variant="b1" color="lightGrey">
                Bathrooms
              </Text>
              <Text variant="b1B" color="dark" mt="s">
                {baths}
              </Text>
            </Box>
            <Box>
              <Text variant="b1" color="lightGrey">
                Area
              </Text>
              <Text variant="b1B" color="dark" mt="s">
                {area}
              </Text>
            </Box>
          </Box>

          <Text variant="h2B" color="dark" mt="m">
            Description
          </Text>
          <Text numberOfLines={2} variant="b2" color="lightGrey" lineHeight={25} mt="s" mb="m">
            {description}
          </Text>

          <Button
            type="primary"
            label="More details"
            onPress={() =>
              navigation.navigate('ListingDetailExtra', { listing: route.params.listing })
            }
            width={theme.constants.screenWidth}
          />
        </Box>
      </Box>
    </ScreenContainer>
  );
};

export default listingDetail;
