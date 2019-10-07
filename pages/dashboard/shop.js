import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchItems } from '../../modules/items';
import { Table, Input, Button, Title } from '../../components/UI';

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
    title: 'Quantité',
    key: 'quantity',
  },
];

const Shop = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const [cart, setCart] = useState({});

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  if(!items) {
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
    return {
      name: item.name,
      price: `${item.price}€`,
      quantity: (
        <Input
          type="number"
          value={cart[item.key] || 0}
          onChange={(quantity) => setCart({ ...cart, [item.key]: quantity })}
          min={0}
          className="shop-input"
        />
      ),
    };
  });

  // Compute total price
  let totalPrice = 0;
  items.forEach((item) => {
    totalPrice += cart[item.key] ? cart[item.key] * item.price : 0;
  });

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
        >
          Payer
        </Button>
      </div>
    </div>
  );
};

export default Shop;