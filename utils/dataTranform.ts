import { ParcelType } from '../types/ParcelList';
import { Carrier } from '../types/Carrier';

export const parcelsDataToParcelLists = (parcelsData: ParcelType[]) => {
  const uniquePickupDates = [
    ...new Set(parcelsData.map((item) => item.pickupDate)),
  ];
  const parcelListData = uniquePickupDates.map((pickupDate) => {
    return {
      pickupDate,
      parcels: parcelsData.filter((parcel) => parcel.pickupDate === pickupDate),
    };
  });

  return parcelListData;
};

export const findCarrierById = (carriers: Carrier[], carrierId: string) => {
  return carriers.find((carrier) => carrier.id === carrierId);
};

export const findCarrierFromDriverNameAndLicencePlate = (
  carriers: Carrier[],
  driversName: string,
  licensePlate: string
) => {
  return carriers.find(
    (carrier) =>
      carrier.driver === driversName && carrier.licensePlate === licensePlate
  );
};
