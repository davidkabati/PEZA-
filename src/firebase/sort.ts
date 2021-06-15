/* eslint-disable @typescript-eslint/no-unsafe-return */
import firebase from '../firebase';

const db = firebase();

interface SortParams {
  type?: 'for_sale' | 'for_rent' | string;
  min?: number;
  max?: number;
  location?: string;
  rooms?: string;
  bathrooms?: string;
  amenitites?: string[];
}

const filterListings = async ({ type, min, max, location, rooms, bathrooms }: SortParams) => {
  const minValue = min && min > 0 ? min : 0;
  const maxValue = max && max > 0 ? max : 10000000000000;

  if (location !== 'Any') {
    const data: any[] = [];
    const querySnapshot = await db
      .collection('listing')
      .where('type', '==', type)
      .where('price', '>=', minValue)
      .where('price', '<=', maxValue)
      .where('address_area', '==', location)
      .get();
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  } else if (rooms !== 'Any') {
    const data: any[] = [];
    const querySnapshot = await db
      .collection('listing')
      .where('type', '==', type)
      .where('price', '>=', minValue)
      .where('price', '<=', maxValue)
      // .where('address_area', '==', location !== 'Any' ? location : 'lusaka')
      .where('rooms', '==', rooms)
      .get();
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  } else if (bathrooms !== 'Any') {
    const data: any[] = [];
    const querySnapshot = await db
      .collection('listing')
      .where('type', '==', type)
      .where('price', '>=', minValue)
      .where('price', '<=', maxValue)
      .where('address_area', '==', location)
      .where('rooms', '==', rooms)
      .where('bathrooms', '==', bathrooms)
      .get();
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  } else {
    const data: any[] = [];
    const querySnapshot = await db
      .collection('listing')
      .where('type', '==', type)
      .where('price', '>=', minValue)
      .where('price', '<=', maxValue)
      .get();
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  }
};

export default {
  filterListings,
};
