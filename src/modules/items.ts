import { API } from '@/utils/api';
import { Item } from '@/types';

export const fetchItems = async (): Promise<Item[]> => {
  const res = await API.get('items');
  return res.map((item: Item & { availableFrom: string; availableUntil: string }) => ({
    ...item,
    availableFrom: item.availableFrom ? new Date(item.availableFrom) : undefined,
    availableUntil: item.availableUntil ? new Date(item.availableUntil) : undefined,
  }));
};
