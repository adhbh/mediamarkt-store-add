import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeliveryStatus, ParcelType } from '../../types/ParcelList';

export const storeDefaultData = async () => {
  await AsyncStorage.setItem('@parcelsData', JSON.stringify([]));
};

export const getParcelsData = async (): Promise<ParcelType[]> => {
  const stringifiedData = await AsyncStorage.getItem('@parcelsData');
  if (stringifiedData) {
    return JSON.parse(stringifiedData);
  }
  return [];
};

export const addToParcelsData = async (
  parcel: ParcelType,
  carrierId: string
): Promise<ParcelType[] | null> => {
  const stringifiedData = await AsyncStorage.getItem('@parcelsData');

  if (stringifiedData) {
    const existingData = JSON.parse(stringifiedData);

    const newParcelsData: ParcelType[] = [
      ...existingData,
      {
        ...parcel,
        carrierId,
        deliveryInfo: {
          status: DeliveryStatus.PENDING
        }
      },
    ];

    await AsyncStorage.setItem('@parcelsData', JSON.stringify(newParcelsData));
  }
  return getParcelsData();
};

export const getParcelById = async (parcelId: string): Promise<ParcelType | null> => {
  const stringifiedData = await AsyncStorage.getItem('@parcelsData');
  if (stringifiedData) {
    const allParcels: ParcelType[] = JSON.parse(stringifiedData);

    const parcel = allParcels.find(parcel => parcel.id === parcelId)

    if(parcel) {
      return parcel
    }
  }
  return null;
};


export const updateParcelById = async (
  parcelId: string,
  parcelData: ParcelType,
): Promise<ParcelType | null> => {
  const stringifiedData = await AsyncStorage.getItem('@parcelsData');

  if (stringifiedData) {
    const existingData: ParcelType[] = JSON.parse(stringifiedData);
    const newParcelsData: ParcelType[] = existingData.map(parcel => {
      if(parcel.id === parcelId) {
        return parcelData
      }
      return parcel
    });
    await AsyncStorage.setItem('@parcelsData', JSON.stringify(newParcelsData));
  }
  return getParcelById(parcelId);
};
