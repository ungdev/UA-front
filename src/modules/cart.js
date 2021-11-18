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

export const cartPay = (cart) => async (dispatch, getState) => {
  const sendableCart = {
    tickets: {
      userIds: [],
      //attendant: {},
    },
    supplements: [],
  };
  cart.tickets.forEach((ticket) => {
    sendableCart.tickets.userIds.push(ticket.for);
  });
  if (cart.attendant) sendableCart.tickets.attendant = cart.attendant;
  cart.supplements.forEach((supplement) => {
    const itemId = supplement.attribute ? `${supplement.item.id}-${supplement.attribute}` : supplement.item.id;
    sendableCart.supplements.push({ itemId, quantity: supplement.quantity });
  });
  const res = await API.post(`users/current/carts`, sendableCart);
  window.location = res.data.url;
};

export default carts;
