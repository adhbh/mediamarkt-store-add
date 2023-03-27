import { Carrier } from '../../types/Carrier';
import { CarriersData } from '../mocks/carriers';

const getCarriers = async (): Promise<Carrier[]> => {
  return CarriersData.map(carrier => ({
    id: carrier.id.$oid,
    companyName: carrier.companyName,
    driver: carrier.driver,
    licensePlate: carrier.licensePlate,
    centerAddress: carrier.centerAddress
  }))
}
