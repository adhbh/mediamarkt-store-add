import { ParcelListType, ParcelType } from './ParcelList';

export type RootStackParamList = {
  ParcelLists: undefined;
  ParcelList: { title: string; parcelList: ParcelListType };
  Scanner: undefined;
  CarrierParcelList: { title: string; parcel: ParcelType, parcelList: ParcelListType };
};
