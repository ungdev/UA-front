import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchItems } from '../../modules/items';
import { fetchDraftCart, deleteCartItem, updateCartItem, createCartItem, cartPay } from '../../modules/cart';
import { Table, Input, Button, Title, Select } from '../../components/UI';

import './shop.css';

const ticketColumns = [
  {
    title: '',
    key: 'type',
  },
  {
    title: 'Pour',
    key: 'for',
  },
  {
    title: 'Prix',
    key: 'price',
  },
];

const itemColumns = [
  {
    title: '',
    key: 'name',
  },
  {
    title: 'Prix unitaire',
    key: 'price',
  },
  {
    title: 'Attributs',
    key: 'attributes',
  },
  {
    title: 'Quantité',
    key: 'quantity',
  },
];

const Shop = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const { cart, cartItems } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchDraftCart());
  }, []);

  if(!items || !cart || !cartItems) {
    return null;
  }

  // Get ticket rows
  const ticketRows = items.slice(0, 2).map((ticket) => {
    return {
      type: ticket.name,
      price: `${ticket.price}€`,
    };
  });

  // Get item rows
  const itemRows = items.slice(2).map((item) => {
    const quantity = cartItems[item.key] && cartItems[item.key].quantity;
    let attribute = { value: null, id: undefined };
    if (item.attributes.length) {
      attribute = (cartItems[item.key] && cartItems[item.key].attribute) ?
      cartItems[item.key].attribute :
      { value: item.attributes[2].value, id: 3 };
    }
    return {
      name: item.name,
      price: `${item.price}€`,
      attributes: item.attributes.length ?
      <Select
        options={item.attributes}
        label=''
        onChange={(value) => {
          const newAttribute = item.attributes.filter((attribute) => attribute.value === value)[0];
          if (quantity) {
            dispatch(updateCartItem(cart.id, cartItems[item.key], item.key, quantity, newAttribute));
          }
        }}
        value={attribute.value} /> : '',
      quantity: (
        <Input
          type="number"
          value={quantity || 0}
          onChange={(strQuantity) => {
            const quantity = parseInt(strQuantity, 10);
            if (Number.isInteger(quantity)) {
              if (quantity === 0) {
                dispatch(deleteCartItem(cart.id, cartItems[item.key], item.key));
              }
              else if (cartItems[item.key]) {
                dispatch(updateCartItem(cart.id, cartItems[item.key], item.key, quantity, attribute));
              }
              else {
                dispatch(createCartItem(cart.id, item, quantity, attribute.id));
              }
            }
          }}
          min={0}
          className="shop-input"
        />
      ),
    };
  });

  // Compute total price
  const totalPrice = Object.values(cartItems).reduce(
    (previousValue, cartItem) => previousValue += cartItem.quantity * cartItem.item.price
    , 0);


  return (
    <div id="dashboard-shop">
      <Title level={4}>Places</Title>
      <Table columns={ticketColumns} dataSource={ticketRows} className="shop-table" />

      <Title level={4}>Accessoires</Title>
      <Table columns={itemColumns} dataSource={itemRows} className="shop-table" />

      <div className="shop-footer">
        <strong>Total : {totalPrice}€</strong>
        <Button
          primary
          rightIcon="fas fa-shopping-cart"
          className="shop-button"
          onClick={() => dispatch(cartPay(cart.id))}
        >
          Payer
        </Button>
      </div>
    </div>
  );
};

export default Shop;