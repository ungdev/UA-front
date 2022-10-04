import CartItem from './CartItem';
import { Button } from './UI';

const Cart = ({ cart, tickets, items, teamMembers, onItemRemoved, onTicketRemoved, onCartReset }) => {
  let attendantTicket = items.find((ticket) => ticket.id === 'ticket-attendant');
  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Panier</h2>
        <Button onClick={onCartReset} rightIcon="fas fa-trash-alt red-icon" noStyle />
      </div>
      {Object.entries(tickets).map(([userId, ticket], i) => {
        let user = teamMembers.find((user) => user.id === userId);
        return (
          <CartItem
            key={`${ticket.id}|${userId}`}
            itemName={`${ticket.name} (${user.username})`}
            quantity={1}
            unitPrice={ticket.price}
            reducedUnitPrice={ticket.reducedPrice}
            onRemove={() => onTicketRemoved(user, i)}
          />
        );
      })}
      {cart.tickets.attendant && (
        <CartItem
          key={attendantTicket.id}
          itemName={`${attendantTicket.name} (${cart.tickets.attendant.firstname} ${cart.tickets.attendant.lastname})`}
          quantity={1}
          unitPrice={attendantTicket.price}
          onRemove={() => onTicketRemoved(undefined, undefined)}
        />
      )}
      {cart.supplements.map((supplement) => {
        let item = items.find((item) => item.id == supplement.itemId);
        return (
          <CartItem
            key={item.id}
            itemName={item.name + (item.attribute ? `- ${item.attribute.toUpperCase()}` : '')}
            quantity={supplement.quantity}
            unitPrice={item.price}
            onRemove={() => onItemRemoved(item.id)}
          />
        );
      })}
    </div>
  );
};

export default Cart;
