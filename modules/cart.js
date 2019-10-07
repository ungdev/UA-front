import { toast } from 'react-toastify';
import { API } from '../utils';
import errorToString from '../utils/errorToString';

export const SET_CART = 'cart/SET_CART';

export const SET_CARTITEMS = 'cart/SET_CARTITEMS';

const initialState = {
  cart: null,
  cartItems: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.cart,
      };
    case SET_CARTITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      };
    default:
      return state;
  }
};

export const fetchDraftCart = () => async (dispatch, getState) => {
  try {
    const userId = getState().login.user.id;
    let res = await API().get(`users/${userId}/carts/current`);
    if (res.data === null) {
      res = await API().post(`users/${userId}/carts`);
    }
    const formatCartItem = res.data.cartItems ? res.data.cartItems.reduce((previousValue, cartItem) => {
      previousValue[cartItem.item.key] = cartItem;
      return previousValue;
    },{}) : [];
    dispatch({
      type: SET_CART,
      cart: res.data,
    });
    dispatch({
      type: SET_CARTITEMS,
      cartItems: formatCartItem,
    });
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};

export const deleteCartItem = (cartId, cartItem, itemKey) => async (dispatch, getState) => {
  try {
    const cartItems = getState().cart.cartItems;
    await API().delete(`carts/${cartId}/cartItems/${cartItem.id}`);
    delete cartItems[itemKey];
    dispatch({
      type: SET_CARTITEMS,
      cartItems,
    });
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};

export const updateCartItem = (cartId, cartItem, itemKey, quantity) => async (dispatch, getState) => {
  try {
    const cartItems = getState().cart.cartItems;
    await API().put(`carts/${cartId}/cartItems/${cartItem.id}`, { quantity });
    cartItems[itemKey].quantity = quantity;
    dispatch({
      type: SET_CARTITEMS,
      cartItems,
    });
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};

export const createCartItem = (cartId, item, quantity) => async (dispatch, getState) => {
  try {
    const cartItems = getState().cart.cartItems;
    const res = await API().post(`carts/${cartId}/cartItems`, { quantity, itemId: item.id });
    cartItems[item.key] = { ...res.data, item };
    dispatch({
      type: SET_CARTITEMS,
      cartItems,
    });
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};

export const cartPay = (cartId) => async (dispatch, getState) => {
  try {
    const userId = getState().login.user.id;
    const res = await API().post(`/users/${userId}/carts/${cartId}/pay`);
    window.location.replace(res.data.url);
  }
  catch (err) {
    toast.error(errorToString(err.response.data.error));
  }
};