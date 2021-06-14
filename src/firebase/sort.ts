/* eslint-disable @typescript-eslint/no-unsafe-return */
import firebase from '../firebase';

const db = firebase();

interface SortParams {
  type?: 'for_sale' | 'for_rent' | string;
  min?: string;
  max?: string;
  location?: string;
  rooms?: string;
  bathrooms?: string;
  amenitites?: string[];
}

const filterListings = async ({ type, min, max }: SortParams) => {
  const data: any[] = [];
  const querySnapshot = await db.collection('listing').where('type', '==', type).get();
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return data;
};

export default {
  filterListings,
};
