import { toast } from 'react-toastify';

import { API } from '../utils/api';

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
  const userId = getState().login.user.id;
  let res = await API.get(`users/${userId}/carts/current`);
  if (res.data === null) {
    res = await API.post('carts');
    res.data.cartItems = [];
  }
  dispatch({
    type: SET_CART,
    cart: res.data,
  });
};

export const saveCart = (cart, displayToast) => async (dispatch, getState) => {
  const forUserId = getState().login.user.id;
  const modifiedCartItems = cart.cartItems.reduce(
    (previous, cartItem) => {
      const isNew = !cartItem.id;
      if (isNew && cartItem.quantity !== 0) {
        previous.new.push({ ...cartItem, forUserId: cartItem.forUserId || forUserId });
      } else if (cartItem.isUpdated && cartItem.quantity !== 0) {
        previous.updated.push(cartItem);
      } else if (cartItem.quantity === 0) {
        previous.deleted.push(cartItem);
      }
      return previous;
    },
    {
      updated: [],
      new: [],
      deleted: [],
    },
  );

  await Promise.all(
    modifiedCartItems.new.map(async ({ quantity, item, attribute, forUserId }) => {
      await API.post(`carts/${cart.id}/add`, { quantity, itemId: item.id, attributeId: attribute.id, forUserId });
    }),
  );
  await Promise.all(
    modifiedCartItems.updated.map(async ({ id, quantity, attribute }) => {
      await API.put(`carts/${cart.id}/cartItems/${id}`, { quantity, attributeId: attribute.id });
    }),
  );
  await Promise.all(
    modifiedCartItems.deleted.map(async ({ id }) => {
      await API.delete(`carts/${cart.id}/cartItems/${id}`);
    }),
  );

  if (displayToast) {
    toast.success('Panier sauvegardé');
  }
};

export const cartPay = (cart) => async (dispatch, getState) => {
  await dispatch(saveCart(cart, false));
  const userId = getState().login.user.id;
  const res = await API.post(`/users/${userId}/carts/${cart.id}/pay`);
  window.location = res.data.url;
};
