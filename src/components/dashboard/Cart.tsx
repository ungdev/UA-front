import styles from './Cart.module.scss';
import { User, Item, CartPost } from '@/types';
import CartItem from './CartItem';
import { Button } from '@/components/UI';

/** The cart */
const Cart = ({
  cart,
  tickets,
  items,
  teamMembers,
  onItemRemoved,
  onTicketRemoved,
  onCartReset,
}: {
  /** The cart */
  cart: CartPost;
  /** The tickets */
  tickets: { [userId: string]: any };
  /** The items */
  items: Item[];
  /** The team members */
  teamMembers: User[];
  /** The function to call when an item is removed */
  onItemRemoved: ((itemId: string) => void) | null;
  /** The function to call when a ticket is removed */
  onTicketRemoved: ((user: User | undefined, i: number | undefined) => void) | null;
  /** The function to call when the cart is reset */
  onCartReset: (() => void) | null;
}) => {
  const attendantTicket = items.find((ticket) => ticket.id === 'ticket-attendant');
  return (
    <div className={styles.cart}>
      <div className={styles.cartHeader}>
        <h2 className={styles.mainTitle}>
          {!onItemRemoved && !onTicketRemoved && !onCartReset ? 'Recapitulatif Panier' : 'Panier'}
        </h2>
        {onCartReset && (
          <Button primary outline onClick={onCartReset}>
            Vider le panier
          </Button>
        )}
      </div>
      {Object.entries(tickets).map(([userId, ticket]) => {
        const i = cart.tickets.userIds.findIndex((id: string) => id === userId);
        const user = teamMembers.find((user) => user.id === userId);
        return (
          <CartItem
            key={`${ticket.id}|${userId}`}
            itemName={`${ticket.name} (${user!.username})`}
            quantity={1}
            unitPrice={ticket.price}
            reducedUnitPrice={ticket.reducedPrice}
            onRemove={onTicketRemoved ? () => onTicketRemoved(user!, i) : null}
          />
        );
      })}
      {cart.tickets.attendant && (
        <CartItem
          key={attendantTicket!.id}
          itemName={`${attendantTicket!.name} (${cart.tickets.attendant.firstname} ${cart.tickets.attendant.lastname})`}
          quantity={1}
          unitPrice={attendantTicket!.price}
          onRemove={onTicketRemoved ? () => onTicketRemoved(undefined, undefined) : null}
        />
      )}
      {cart.supplements.map((supplement) => {
        const item = items.find((item) => item.id === supplement.itemId);
        return (
          <CartItem
            key={item!.id}
            // NOTE : For the moment, only t-shirts have attributes, but that may change in the future
            itemName={item!.name + (item!.attribute ? ` - Taille ${item!.attribute.toUpperCase()}` : '')}
            quantity={supplement.quantity}
            unitPrice={item!.price}
            onRemove={onItemRemoved ? () => onItemRemoved(item!.id) : null}
          />
        );
      })}

      {cart.tickets.userIds.length === 0 && cart.tickets.attendant === undefined && cart.supplements.length === 0 && (
        <p className={styles.emptyCart}>Ton panier est vide</p>
      )}
    </div>
  );
};

export default Cart;
