import PropTypes from 'prop-types';

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
      {Object.entries(tickets).map(([userId, ticket]) => {
        let i = cart.tickets.userIds.findIndex((id) => id === userId);
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

Cart.propTypes = {
  /**
   * The cart to display. This has the same shape as the cart in the POST /users/current/carts route
   */
  cart: PropTypes.object.isRequired,
  /**
   * The ticket items that are currently in the cart
   * The keys are the user ids, and the values are the items returned by the route GET /users/{userId}/ticket
   */
  tickets: PropTypes.object.isRequired,
  /**
   * The items, as they are returned by the route GET /items
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      category: PropTypes.string,
      attribute: PropTypes.string,
      price: PropTypes.number,
      infos: PropTypes.string,
      image: PropTypes.string,
      left: PropTypes.number,
    }),
  ).isRequired,
  /**
   * The members of the team the user is in
   * It should be the concatenation of the players and coaches fields in the response of route GET /teams/current
   */
  teamMembers: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Called when a supplement is removed
   * The "item" parameter represents the item's id
   */
  onItemRemoved: PropTypes.func.isRequired,
  /**
   * Called when a ticket is removed.
   * "user" parameter is an object containing a user (the same as in the teamMembers)
   * "ticketIndex" parameter is the index of the ticket in the ticket list of the cart (cart.tickets.userIds)
   */
  onTicketRemoved: PropTypes.func.isRequired,
  /**
   * Called when the cart is reset
   */
  onCartReset: PropTypes.func.isRequired,
};

export default Cart;
