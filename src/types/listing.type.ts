export default interface IListing {
  id: number;
  title: string;
  description: string;
  address_area: string;
  address: string;
  features: string[];
  type: 'for_sale' | 'for_rent';
  rooms: string;
  baths: string;
  area: string;
  on_sale: boolean;
  price: string;
  sale_price: string;
  images: any[];
  amenities?: string[];
}
