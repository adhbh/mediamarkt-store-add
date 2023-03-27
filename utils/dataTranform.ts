import { ParcelType } from '../types/ParcelList';

export const parcelsDataToParcelLists = (parcelsData: ParcelType[]) => {
  const uniquePickupDates = [
    ...new Set(parcelsData.map((item) => item.pickupDate)),
  ];
  const parcelListData = uniquePickupDates.map((pickupDate) => {
    return {
      pickupDate,
      parcels: parcelsData.filter(
        (parcel) => parcel.pickupDate === pickupDate
      ),
    };
  });

  return parcelListData;
};
