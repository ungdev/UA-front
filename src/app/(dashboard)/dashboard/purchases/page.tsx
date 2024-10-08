'use client';
import styles from './style.module.scss';
import { useEffect, useState } from 'react';

import { Table, Title } from '@/components/UI';
import { fetchItems } from '@/modules/items';
import { useAppSelector } from '@/lib/hooks';
import { Item, TransactionState } from '@/types';

const columns = [
  { title: '', key: 'name' },
  { title: 'Quantité', key: 'quantity' },
  { title: 'Prix unitaire', key: 'price' },
  { title: 'Sous total', key: 'total' },
];

const Purchases = () => {
  const { id: userId } = useAppSelector((state) => state.login.user)!;
  const carts = useAppSelector((state) =>
    state.carts.allCarts.filter(
      (cart) =>
        cart.transactionState === TransactionState.paid || cart.transactionState === TransactionState.processing,
    ),
  );
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
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
                <span className={styles.reductedPrice}>{(cartItem.price / 100).toFixed(2)}€</span>
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
          <div
            className={`${styles.cardCart} ${
              cart.transactionState === TransactionState.processing ? styles.authorization : ''
            }`}
            key={cart.id}>
            <>
              <Title level={2} type={3} align="center" className={styles.primaryTitle}>
                Achat #{cart.id}
              </Title>
              <p>
                Date: {date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric' })}{' '}
                {cart.transactionState === TransactionState.processing ? '(Paiement en cours de traitement)' : ''}
              </p>
              <Table columns={columns} dataSource={dataSource} className={styles.cart} />
              <p className={styles.cartTotal}>
                <strong>Total: {(total / 100).toFixed(2)} €</strong>
              </p>
            </>
          </div>
        );
      });

  return (
    <div id="dashboard-purchases" className={styles.dashboardPurchases}>
      <Title level={1} align="center" className={styles.primaryTitle}>
        Mes Achats
      </Title>
      {carts.length ? (
        displayCarts
      ) : (
        <Title type={3} level={3} className={styles.primaryTitle} align="center">
          Aucun achat
        </Title>
      )}
    </div>
  );
};

export default Purchases;
