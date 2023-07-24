import { API } from '../utils/api';

export const fetchItems = async () => {
  const res = await API.get('items');
  return res;
};
