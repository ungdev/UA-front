import { API } from '../utils/api';

export const SET_CART = 'cart/SET_CART';
export const SET_CARTITEMS = 'cart/SET_CARTITEMS';

const initialState = {
  cart: null,
  cartItems: null,
};

const carts = (state = initialState, action) => {
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

export const cartPay = (cart) => async () => {
  const res = await API.post(`users/current/carts`, cart);
  window.location = res.data.url;
};

export default carts;
