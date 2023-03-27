import AsyncStorage from '@react-native-async-storage/async-storage';
import { ParcelListDefaultData } from '../mocks/parcelListData';
import { ParcelListType } from '../../types/ParcelList';

export const storeDefaultData = async () => {
  await AsyncStorage.setItem(
    '@parcelListsData',
    JSON.stringify(ParcelListDefaultData)
  );
};

export const getParcelListsData = async (): Promise<ParcelListType[] | null> => {
  const stringifiedData = await AsyncStorage.getItem('@parcelListsData')
  if(stringifiedData) {
    return JSON.parse(stringifiedData)
  }
  return null
};
