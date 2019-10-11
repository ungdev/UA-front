import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Table, Card, Title } from '../../components/UI';
import { fetchAllCarts } from '../../modules/carts';
import './purchases.css';

const columns = [
  { title: '', key: 'name' },
  { title: 'Quantité', key: 'quantity' },
  { title: 'Prix unitaire', key: 'price' },
  { title: 'Sous total', key: 'total' },
];

const Purchases = () => {

  const dispatch = useDispatch();
  const carts = useSelector((state) => state.carts.allCarts.filter((cart) => cart.transactionState === 'paid'));
  useEffect(() => {
    dispatch(fetchAllCarts());
  }, []);

  const displayCarts = carts.map((cart) => {
    const dataSource = cart.cartItems.map((cartItem) => ({
      name: cartItem.item.name,
      quantity: cartItem.quantity,
      price: `${cartItem.item.price} €`,
      total: `${cartItem.quantity * cartItem.item.price} €`,
      totalInt: cartItem.quantity * cartItem.item.price,
    }));
    const date = new Date(cart.paidAt);

    const total = dataSource.reduce((previousValue, data) => previousValue += data.totalInt, 0);
    return (
      <Card className="card-cart" key={cart.id} content={
        <>
          <p>Date: {moment(date).format('DD/MM/YYYY')}</p>
          <Table columns={columns} dataSource={dataSource}/>
          <p className="cart-total"><strong>Total: {total} €</strong></p>
        </>
      }/>
    );
  });



  return (
    <div id="dashboard-purchases">
      { carts.length ? displayCarts : <Title level={4}>Aucun achat</Title>}
    </div>
  );
};

export default Purchases;
