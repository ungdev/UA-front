'use client';
import { useEffect, useState } from 'react';

import { Table, Card, Title } from '@/components/UI';
import { fetchAllCarts } from '@/modules/carts';
import { fetchItems } from '@/modules/items';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Item, TransactionState } from '@/types';
import type { Action } from '@reduxjs/toolkit';

const columns = [
  { title: '', key: 'name' },
  { title: 'Quantité', key: 'quantity' },
  { title: 'Prix unitaire', key: 'price' },
  { title: 'Sous total', key: 'total' },
];

const Purchases = () => {
  const dispatch = useAppDispatch();
  const { id: userId } = useAppSelector((state) => state.login.user)!;
  const carts = useAppSelector((state) =>
    state.carts.allCarts.filter(
      (cart) =>
        cart.transactionState === TransactionState.paid || cart.transactionState === TransactionState.authorization,
    ),
  );
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    dispatch(fetchAllCarts() as unknown as Action);

    const setInitialItems = async () => setItems(await fetchItems());
    setInitialItems();
  }, []);

  const displayCarts = !items
    ? []
    : carts.map((cart) => {
        const dataSource = cart.cartItems.map((cartItem) => {
          const item = items.find((item) => cartItem.itemId === item.id);
          let itemName = item!.name;
          const price = cartItem.reducedPrice || item!.price;
          if (item!.id.startsWith('ticket')) {
            itemName =
              `${item!.name} | ` +
              (cartItem.forUser.id === userId ? `Toi (${cartItem.forUser.username})` : cartItem.forUser.username);
          } else if (item!.attribute) {
            itemName += ` - Taille ${item!.attribute.toUpperCase()}`;
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
        const date = new Date(cart.paidAt as Date);

        const total = dataSource.reduce(
          (previousValue: number, data: (typeof dataSource)[0]) => (previousValue += data.totalInt),
          0,
        );
        return (
          <Card
            className={`card-cart${cart.transactionState === TransactionState.authorization ? ' authorization' : ''}`}
            key={cart.id}>
            <>
              <p>
                Date: {date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric' })}{' '}
                {cart.transactionState === TransactionState.authorization ? '(Paiement en cours de traitement)' : ''}
              </p>
              <Table columns={columns} dataSource={dataSource} className="cart" />
              <p className="cart-total">
                <strong>Total: {(total / 100).toFixed(2)} €</strong>
              </p>
            </>
          </Card>
        );
      });

  return <div id="dashboard-purchases">{carts.length ? displayCarts : <Title level={4}>Aucun achat</Title>}</div>;
};

export default Purchases;
