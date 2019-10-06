import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchItems } from '../../modules/items';
import { Table, Input, Button, Title } from '../../components/UI';

import './shop.css';

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

  const columns = [
    {
      title: '',
      key: 'name',
    },
    {
      title: 'Prix',
      key: 'price',
    },
    {
      title: 'Quantité',
      key: 'quantity',
    },
  ];

  const ticketRows = items.slice(0, 2);

  const itemRows = items.slice(2).map((item) => (
    {
      name: item.name,
      price: `${item.price}€`,
      quantity: (
        <Input
          type="number"
          value={cart[item.key] || 0}
          onChange={(v) => setCart({ ...cart, [item.key]: v })}
          min={0}
          className="shop-input"
        />
      ),
    }
  ));

  return (
    <div id="dashboard-shop">
      <Title level={4}>Places</Title>
      <Table columns={columns} dataSource={ticketRows} className="shop-table" />

      <Title level={4}>Accessoires</Title>
      <Table columns={columns} dataSource={itemRows} className="shop-table" />

      <Button primary rightIcon="fas fa-shopping-cart">Payer</Button>
    </div>
  );
};

export default Shop;