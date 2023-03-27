import AsyncStorage from '@react-native-async-storage/async-storage';
import { ParcelsDefaultData } from '../mocks/parcelListData';
import { ParcelType } from '../../types/ParcelList';

export const storeDefaultData = async () => {
  await AsyncStorage.setItem('@parcelsData', JSON.stringify([]));
};

export const getParcelListsData = async (): Promise<ParcelType[] | null> => {
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

    const newParcelsData = [
      ...existingData,
      {
        ...parcel,
        carrierId,
      },
    ];

    await AsyncStorage.setItem('@parcelsData', JSON.stringify(newParcelsData));
  }
  return getParcelListsData();
};
