import { ItemsData } from '../mocks/items';
import { ItemType } from '../../types/Item';

export const getItemsDetailsByIds = (itemIds: string[]): ItemType[] => {
  const filteredItems =  ItemsData.filter(item => itemIds.includes(item.id.$oid))

  return filteredItems.map((item) => {
    return {
      id:item.id.$oid,
      type: item.type,
      weight: item.weight,
      model: item.model,
      price: item.price
    }
  })
}
