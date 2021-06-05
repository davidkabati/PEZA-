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
  SortResult: { sortParam: string };
};
