import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Table, Card, Title } from '../../components/UI';
import { fetchAllCarts } from '../../modules/carts';
import { fetchItems } from '../../modules/items';

const columns = [
  { title: '', key: 'name' },
  { title: 'Quantité', key: 'quantity' },
  { title: 'Prix unitaire', key: 'price' },
  { title: 'Sous total', key: 'total' },
];

const Purchases = () => {
  const dispatch = useDispatch();
  const { id: userId } = useSelector((state) => state.login.user);
  const carts = useSelector((state) => state.carts.allCarts.filter((cart) => cart.transactionState === 'paid'));
  const items = useSelector((state) => state.items);
  useEffect(() => {
    dispatch(fetchAllCarts());
    dispatch(fetchItems());
  }, []);

  const displayCarts = !items
    ? []
    : carts.map((cart) => {
        const dataSource = cart.cartItems.map((cartItem) => {
          const item = items.find((item) => cartItem.itemId === item.id);
          let itemName = item.name;
          let price = cartItem.reducedPrice || item.price;
          if (item.id.startsWith('ticket')) {
            itemName =
              `${item.name} | ` +
              (cartItem.forUser.id === userId ? `Toi (${cartItem.forUser.username})` : cartItem.forUser.username);
          } else if (item.attribute) {
            itemName += ` - Taille ${item.attribute.toUpperCase()}`;
          }
          return {
            name: itemName,
            quantity: cartItem.quantity,
            price: cartItem.reducedPrice ? (
              <>
                {(cartItem.reducedPrice / 100).toFixed(2)}€
                <span className="reducted-price">{(cartItem.price / 100).toFixed(2)}€</span>
              </>
            ) : (
              `${(cartItem.price / 100).toFixed(2)}€`
            ),
            total: `${((cartItem.quantity * price) / 100).toFixed(2)} €`,
            totalInt: cartItem.quantity * price,
          };
        });
        const date = new Date(cart.paidAt);

        const total = dataSource.reduce((previousValue, data) => (previousValue += data.totalInt), 0);
        return (
          <Card
            className="card-cart"
            key={cart.id}
            content={
              <>
                <p>Date: {moment(date).format('DD/MM/YYYY')}</p>
                <Table columns={columns} dataSource={dataSource} className="cart" />
                <p className="cart-total">
                  <strong>Total: {(total / 100).toFixed(2)} €</strong>
                </p>
              </>
            }
          />
        );
      });

  return <div id="dashboard-purchases">{carts.length ? displayCarts : <Title level={4}>Aucun achat</Title>}</div>;
};

export default Purchases;
