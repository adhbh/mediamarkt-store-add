export interface ParcelType {
  id: string;
  items: string[];
  pickupDate: string;
  deliveryDate: string;
  deliveryAddress: string;
  pickupAddress: string;
  itemsCount: number;
  carrierId?: string;
}

export interface ParcelListType {
  pickupDate: string;
  parcels: ParcelType[];
}
