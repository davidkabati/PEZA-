export default interface IListing {
  id: number;
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
  price: string;
  sale_price: string;
  images: string[];
  amenities: string[];
  property_type: string;
  verified: boolean;
  created_at: string;
}

export type IAddListing = Omit<IListing, 'id'>;
