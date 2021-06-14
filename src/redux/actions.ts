/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IListingFavorite } from '../types/listing.type';
import favoritesApi from '../firebase/favorite';

export const ADD_FAVORITE_ITEM = 'ADD_FAVORITE_ITEM';
export const REMOVE_FAVORITE_ITEM = 'REMOVE_FAVORITE_ITEM';

export const addFavorite = (favorite: Omit<IListingFavorite, 'id'>) => async (dispatch: any) => {
  const id = await favoritesApi.addFavorite(favorite);

  dispatch({
    type: ADD_FAVORITE_ITEM,
    payload: {
      id,
      ...favorite,
    },
  });
};

export const removeFavorite = (favorite_id: string) => async (dispatch: any) => {
  await favoritesApi.deleteFavorite(favorite_id);

  dispatch({
    type: REMOVE_FAVORITE_ITEM,
    payload: favorite_id,
  });
};
