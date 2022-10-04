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

export const saveCart = (cart) => {
  deleteCart();
  // Every user id is a 6 characters long string, we just chain every user ids, without separators
  if (cart.tickets.userIds) {
    localStorage.setItem(
      'cart.tickets',
      cart.tickets.userIds.reduce((prev, id) => {
        return prev + id;
      }, ''),
    );
  }
  if (cart.tickets.attendant) {
    localStorage.setItem('cart.attendant.firstname', cart.tickets.attendant.firstname);
    localStorage.setItem('cart.attendant.lastname', cart.tickets.attendant.lastname);
  }
  cart.supplements.forEach((supplement) => {
    localStorage.setItem('cart.' + supplement.itemId, '' + supplement.quantity);
  });
};

export const loadCart = () => {
  let cart = { tickets: { userIds: [], attendant: undefined }, supplements: [] };
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.startsWith('cart.')) {
      switch (key) {
        case 'cart.tickets':
          cart.tickets.userIds = localStorage.getItem(key).match(/.{6}/g) || [];
          break;
        case 'cart.attendant.firstname':
          cart.tickets.attendant = {
            ...cart.tickets.attendant,
            firstname: localStorage.getItem('cart.attendant.firstname'),
          };
          break;
        case 'cart.attendant.lastname':
          cart.tickets.attendant = {
            ...cart.tickets.attendant,
            lastname: localStorage.getItem('cart.attendant.lastname'),
          };
          break;
        default:
          cart.supplements.push({ itemId: key.substring(5), quantity: parseInt(localStorage.getItem(key)) });
      }
    }
  }
  return cart;
};

export const deleteCart = () => {
  // Remove every value that starts with 'cart.'
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.startsWith('cart.')) {
      localStorage.removeItem(key);
    }
  }
  return { tickets: { userIds: [], attendant: undefined }, supplements: [] };
};

export default carts;
