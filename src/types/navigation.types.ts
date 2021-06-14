import IAgent from './agent.type';
import IListing from './listing.type';

export type AppNavParamList = {
  Home: undefined;
  Categories: undefined;
  Favorites: undefined;
  Profile: undefined;
};

export type HomeNavParamList = {
  Home: undefined;
  Search: undefined;
  ListingDetail: { listing: IListing };
  ListingDetailExtra: { listing: IListing };
  AgentDetail: { agent: IAgent };
  // Notifications: undefined;
};

export type SortNavParamList = {
  Sort: undefined;
  SortResult: { listings: any[] };
  ListingDetail: { listing: IListing };
  ListingDetailsExtra: { listing: IListing };
};

export type ProfileNavParamList = {
  Profile: undefined;
  MyListings: undefined;
  EditAccount: undefined;
  ManageListings: undefined;
  NewListingInfo: undefined;
  NewListingSpace: { listing: Partial<IListing> };
  NewListingImg: { listing: Partial<IListing> };
  NewListingFinal: { listing: Partial<IListing> };
  ListingSuccess: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};
