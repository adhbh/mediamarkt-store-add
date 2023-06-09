export enum DeliveryStatus {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
}

export interface ParcelDeliveryType {
  carrierId: string;
  status: DeliveryStatus;
}

export interface ParcelType {
  id: string;
  items: string[];
  pickupDate: string;
  deliveryDate: string;
  deliveryAddress: string;
  pickupAddress: string;
  itemsCount: number;
  deliveryInfo: ParcelDeliveryType;
}

export interface ParcelListType {
  pickupDate: string;
  parcels: ParcelType[];
}
