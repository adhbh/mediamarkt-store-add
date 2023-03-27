import { DeliveryStatus, ParcelType } from '../../types/ParcelList';
import { ParcelsData } from '../mocks/parcels';

export const getParcelById = async (
  parcelId: string
): Promise<ParcelType | null> => {
  const parcelDataFromService = ParcelsData.find(
    (item) => item.id.$oid === parcelId
  );

  if (parcelDataFromService) {
    return {
      id: parcelDataFromService.id.$oid,
      deliveryAddress: parcelDataFromService.deliveryAddress,
      deliveryDate: parcelDataFromService.deliveryDate,
      pickupAddress: parcelDataFromService.pickupAddress,
      pickupDate: parcelDataFromService.pickupDate,
      itemsCount: parcelDataFromService.itemsCount,
      items: parcelDataFromService.items.map((item) => item.$oid),
      deliveryInfo: {
        carrierId: '',
        status: DeliveryStatus.PENDING,
      },
    };
  }
  return null;
};
