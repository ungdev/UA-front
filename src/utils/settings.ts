import { API } from './api';
import { Settings } from '../types';

// Request the API to know if login is allowed
export const isLoginAllowed = async (): Promise<boolean> => {
  try {
    // Fetch the settings
    const response = await API.get<Settings>('/settings');

    return response.data.login;
  } catch (error) {
    return false;
  }
};

// Request the API to know if shop is allowed
export const isShopAllowed = async (): Promise<boolean> => {
  try {
    // Fetch the settings
    const response = await API.get<Settings>('/settings');

    return response.data.shop;
  } catch (error) {
    return false;
  }
};
