import { User, Item, CartPost } from '@/types';
import CartItem from './CartItem';
import { Button, Icon } from './../UI';

const Cart = ({
  cart,
  tickets,
  items,
  teamMembers,
  onItemRemoved,
  onTicketRemoved,
  onCartReset,
}: {
  cart: CartPost;
  tickets: { [userId: string]: any };
  items: Item[];
  teamMembers: User[];
  onItemRemoved: (itemId: string) => void;
  onTicketRemoved: (user: User | undefined, i: number | undefined) => void;
  onCartReset: () => void;
}) => {
  const attendantTicket = items.find((ticket) => ticket.id === 'ticket-attendant');
  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Panier</h2>
        <Button onClick={onCartReset}>
          {/* TODO: Make it red */}
          <Icon name="trash" fill={true}></Icon>
        </Button>
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
            onRemove={() => onTicketRemoved(user!, i)}
          />
        );
      })}
      {cart.tickets.attendant && (
        <CartItem
          key={attendantTicket!.id}
          itemName={`${attendantTicket!.name} (${cart.tickets.attendant.firstname} ${cart.tickets.attendant.lastname})`}
          quantity={1}
          unitPrice={attendantTicket!.price}
          onRemove={() => onTicketRemoved(undefined, undefined)}
        />
      )}
      {cart.supplements.map((supplement) => {
        const item = items.find((item) => item.id == supplement.itemId);
        return (
          <CartItem
            key={item!.id}
            // NOTE : For the moment, only t-shirts have attributes, but that may change in the future
            itemName={item!.name + (item!.attribute ? ` - Taille ${item!.attribute.toUpperCase()}` : '')}
            quantity={supplement.quantity}
            unitPrice={item!.price}
            onRemove={() => onItemRemoved(item!.id)}
          />
        );
      })}
    </div>
  );
};

export default Cart;
