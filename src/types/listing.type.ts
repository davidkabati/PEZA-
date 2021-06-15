export default interface IListing {
  id: string;
  agent_id: string;
  title: string;
  description: string;
  address_area: string;
  address: string;
  features: string[];
  type: 'for_sale' | 'for_rent' | string;
  rooms: string;
  baths: string;
  area: string;
  on_sale: boolean;
  price: number;
  sale_price: string;
  images: string[];
  amenities: string[];
  property_type: string;
  verified: boolean;
  created_at: string;
  furnish: boolean;
  floors: string;
  build_year: string;
}

export type IAddListing = Omit<IListing, 'id'>;

export interface IListingFavorite extends IListing {
  product_id: string;
  user_id: string;
}
