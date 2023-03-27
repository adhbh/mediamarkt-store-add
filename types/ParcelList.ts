export interface ParcelType {
  id: string;
  items: string[];
  pickupDate: string;
  deliveryData: string;
  deliveryAddress: string;
  pickupAddress: string;
  itemsCount: number;
  carrierId?: string;
}

export interface ParcelListType {
  pickupDate: string;
  parcels: ParcelType[];
}
