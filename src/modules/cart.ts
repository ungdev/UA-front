import { createSlice } from '@reduxjs/toolkit';
import { API } from '@/utils/api';
import { Cart, CartItem, CartPost } from '@/types';

interface CartAction {
  cart: Cart | null;
  cartItems: CartItem[] | null;
}

const initialState: CartAction = {
  cart: null,
  cartItems: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const { setCart, setCartItems } = cartSlice.actions;

export const cartPay = async (cart: CartPost) => {
  const res = await API.post(`users/current/carts`, cart);
  return res.checkoutSecret as string;
};

export const saveCart = (cart: CartPost) => {
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
  const cart = { tickets: { userIds: [], attendant: undefined }, supplements: [] } as unknown as CartPost;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('cart.')) {
      switch (key) {
        case 'cart.tickets':
          cart.tickets.userIds = (localStorage.getItem(key)!.match(/.{6}/g) || []) as string[];
          break;
        case 'cart.attendant.firstname':
          cart.tickets.attendant = {
            ...cart.tickets.attendant!,
            firstname: localStorage.getItem('cart.attendant.firstname')!,
          };
          break;
        case 'cart.attendant.lastname':
          cart.tickets.attendant = {
            ...cart.tickets.attendant!,
            lastname: localStorage.getItem('cart.attendant.lastname')!,
          };
          break;
        default:
          cart.supplements.push({ itemId: key.substring(5), quantity: parseInt(localStorage.getItem(key)!) });
      }
    }
  }
  return cart;
};

export const deleteCart = () => {
  // Remove every value that starts with 'cart.'
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key!.startsWith('cart.')) {
      localStorage.removeItem(key!);
      // We removed an item, so we don't want to move forward : the next item took the index we are currently at
      i--;
    }
  }
  return { tickets: { userIds: [], attendant: undefined }, supplements: [] };
};

export default cartSlice.reducer;
