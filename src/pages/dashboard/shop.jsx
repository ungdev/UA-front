import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchItems } from '../../modules/items';
import { cartPay, deleteCart, loadCart, saveCart } from '../../modules/cart';
import { fetchCurrentTeam } from '../../modules/team';
import { Table, Button, Title, Modal, Checkbox } from '../../components/UI';
import AddPlaceModal from '../../components/AddPlaceModal';
import { API } from '../../utils/api';
import { toast } from 'react-toastify';
import SupplementList from '../../components/SupplementList';

// Hello there ! This is a big file, I commented it as well as I could, hope you'll understand :)

// These reprensent the columns of the tables that list tickets and columns in the current cart.
// The 'title' field is what is displayed, and 'key' is the internal name of the column.
const ticketColumns = [
  {
    title: 'Bénéficiaire',
    key: 'type',
  },
  {
    title: 'Prix',
    key: 'price',
  },
  {
    title: '',
    key: 'delete',
  },
];

const Shop = () => {
  const dispatch = useDispatch();
  // Informations about the user
  const { id: userId, type, hasPaid, username, age, email } = useSelector((state) => state.login.user);
  // The list of all items available
  const items = useSelector((state) => state.items);
  // The team the player is in
  const team = useSelector((state) => state.team);
  // The members of the team are the players and the coaches
  const [teamMembers, setTeamMembers] = useState([]);
  // If the CGV case is checked or not
  const [isCgvAccepted, setIsCgvAccepted] = useState(false);
  // If the modal to add a place is visible
  const [addPlaceVisible, setAddPlaceVisible] = useState(false);
  // If the user already paid for his attendant, or the place is in the current cart. If the user is an adult, this value should not be used.
  const [hasAttendant, setHasAttendant] = useState(false);
  // The structure of the cart is the same as the one we pass to the route POST /users/current/carts
  //const cartInitialValue = { tickets: { userIds: [], attendant: undefined }, supplements: [] };
  // The content of the current cart. The API doesn't know about this before the player clicks on the pay button
  const [cart, setCart] = useState(loadCart());
  // Wheather or not the ticket is already paid or in the cart. This is used to make sure users don't buy 2 tickets.
  const [isPlaceInCart, setIsPlaceInCart] = useState(hasPaid);
  // The item that is beeing previewed. This is a string containing the relative path to the image, starting from public/
  // If itemPreview is null, then there is nothing to preview, and thus the modal for the preview is not displayed
  const [itemPreview, setItemPreview] = useState(null);
  // The members of the team who didn't buy a ticket
  const [teamMembersWithoutTicket, setTeamMembersWithoutTicket] = useState([]);

  // This is used to avoid users to be able to send multiple requests when paying :
  // if they click multiple times, they could send multiple requests
  const [hasRequestedPayment, setHasRequestedPayment] = useState(false);

  // Fetch items, team and checks if user already have an intendant
  useEffect(() => {
    dispatch(fetchItems());
    if (type !== 'spectator') {
      dispatch(fetchCurrentTeam());
    }
    if (age === 'child') {
      API.get('/users/current/carts').then((res) => {
        res.data.map((paidCart) => {
          paidCart.cartItems.map((cartItem) => {
            cartItem.itemId === 'ticket-attendant' && setHasAttendant(true);
          });
        });
      });
      if (cart.tickets.userIds.find((id) => id === userId)) {
        setIsPlaceInCart(true);
      }
      if (cart.tickets.attendant) {
        setHasAttendant(true);
      }
    }
  }, []);

  // Initializing teamMembers
  useEffect(() => {
    if (!team) {
      return;
    }
    setTeamMembers(team.players.concat(team.coaches));
  }, [team]);

  // Initializing teamMembersWithoutTicket
  useEffect(() => {
    setTeamMembersWithoutTicket(
      teamMembers.filter(
        (member) =>
          !member.hasPaid && member.id !== userId && !cart.tickets.includes((ticket) => ticket.for === member.id),
      ),
    );
  }, [teamMembers]);

  // Save the cart everytime it is modified
  useEffect(() => {
    if (cart) {
      saveCart(cart);
    }
  }, [cart]);

  if (!items) {
    return null;
  }

  // Does the user have a discount on his ticket ? (Is he in a UT school ?)
  const hasDiscount = email.endsWith('@utt.fr') || email.endsWith('@utc.fr') || email.endsWith('@utbm.fr');

  // When the user removes a ticket.
  // 'user' is either a user object, or undefined if it is the ticket of an attendant
  // 'ticketIndex' is the index of the ticket in the cart if user is not undefined
  const onRemoveTicket = (user, ticketIndex) => {
    if (user === undefined) {
      setHasAttendant(false);
      setCart({ ...cart, tickets: { ...cart.tickets, attendant: undefined } });
    } else {
      // Modify the states
      if (user.id === userId) {
        setIsPlaceInCart(false);
      } else {
        const newMembersWithoutTicket = teamMembersWithoutTicket;
        newMembersWithoutTicket.push(user);
        setTeamMembersWithoutTicket(newMembersWithoutTicket);
      }
      // Modify the cart
      const updatedCartTickets = cart.tickets.userIds;
      updatedCartTickets.splice(ticketIndex, 1);
      setCart({ ...cart, tickets: { ...cart.tickets, userIds: updatedCartTickets } });
    }
  };

  // Returns an object that contains information about how to display each ticket.
  const getTicketRows = () => {
    let ticketRows = cart.tickets.userIds.map((ticket, i) => {
      // If the user is a spectator, he is not in a team. To avoid accessing the team, we simply use informations we already have
      let user = ticket === userId ? { type, username } : teamMembers.find((member) => member.id === ticket);
      let ticketItem = items.find((ticket) => ticket.id === `ticket-${user.type}`);
      let price = `${(ticketItem.price / 100).toFixed(2)}€`;
      if (ticket === userId && type !== 'coach' && hasDiscount) {
        // NOTE : the value there is hardcoded. It would probably be better to have a route that gives us the discount
        price = (
          <>
            {type === 'player' ? '15.00€' : '10.00€'} <span className="reducted-price">{price}</span>
          </>
        );
      }
      return {
        type: `${ticketItem.name} | ` + (ticket.for === userId ? `Toi (${username})` : user.username),
        price: price,
        delete: (
          <Button
            onClick={() => {
              onRemoveTicket(user, i);
            }}
            rightIcon="fas fa-trash-alt"
            className="delete-button"
            noStyle
          />
        ),
      };
    });
    if (cart.tickets.attendant) {
      ticketRows.push({
        type: `Place accompagnateur | ${cart.tickets.attendant.firstname} ${cart.tickets.attendant.lastname}`,
        price: '12.00€',
        delete: (
          <Button
            onClick={() => {
              onRemoveTicket(undefined, 0);
            }}
            rightIcon="fas fa-trash-alt"
            className="delete-button"
            noStyle
          />
        ),
      });
    }
    return ticketRows;
  };

  // Compute total price
  // It is computed in 3 parts : player tickets, the attendant ticket, and supplements
  const totalPrice =
    cart.tickets.userIds.reduce((acc, cartTicket) => {
      if (cartTicket === userId && type !== 'coach' && hasDiscount) {
        return acc + (type === 'player' ? 1500 : 1000);
      }
      let userType = cartTicket === userId ? type : teamMembers.find((member) => member.id === cartTicket).type;
      return acc + items.find((item) => item.id === `ticket-${userType}`).price;
    }, 0) +
    (cart.tickets.attendant ? items.find((item) => item.id === 'ticket-attendant').price : 0) +
    cart.supplements.reduce((acc, cartSupplement) => {
      const item = items.find((item) => item.id == cartSupplement.itemId);
      if (!item) {
        toast.warn(
          "Une erreur s'est produite lors du calcul du prix. Le prix affiché n'est peut-être pas exact. Si ce problème se reproduit, contacte le support",
        );
        return acc;
      }
      return acc + cartSupplement.quantity * item.price;
    }, 0);

  // When the AddPlaceModal is exited.
  // If it was exited by clicking out of the window or by quiting, then placeFor is undefined.
  // If it was exited by adding a ticket, then placeFor is either 'me', 'other' or 'attendant', and placeId is the id of the player
  // (or an object containing the firstnam and the second name of the person if the ticket is for an attendant)
  const onAddPlaceModalQuit = (placeFor, placeId) => {
    setAddPlaceVisible(false);
    if (placeFor === undefined) return;
    if (placeFor === 'me') {
      setCart({ ...cart, tickets: { ...cart.tickets, userIds: [...cart.tickets.userIds, userId] } });
      setIsPlaceInCart(true);
    } else if (placeFor === 'other') {
      setCart({ ...cart, tickets: { ...cart.tickets, userIds: [...cart.tickets.userIds, placeId] } });
      setTeamMembersWithoutTicket(teamMembersWithoutTicket.filter((member) => member.id !== placeId));
    } else {
      setCart({ ...cart, tickets: { ...cart.tickets, attendant: placeId } });
      setHasAttendant(true);
    }
  };

  // Callback of SupplementList. It is called when the user changes its cart (the supplement part)
  // supplementCart is the new value of cart.supplements
  const onSupplementCartChanges = (supplementCart) => {
    setCart({ ...cart, supplements: supplementCart });
  };

  // Callback of SupplementList. It is called when the user wants to preview an item
  // newItemPreview is the new value of itemPreview.
  const onItemPreview = (newItemPreview) => {
    setItemPreview(newItemPreview);
  };

  // Called when the user clicks on the pay button
  // Sets hasRequestedPayment to true to disable the pay button, and requests the payment to the API
  const onPay = () => {
    setHasRequestedPayment(true);
    dispatch(cartPay(cart));
    setCart(deleteCart());
  };

  return (
    <div id="dashboard-shop">
      <div className="shop-section">
        <Title level={4}>Places</Title>
        <Table columns={ticketColumns} dataSource={getTicketRows()} className="shop-table" />
        <Button onClick={() => setAddPlaceVisible(true)}>Ajouter une place</Button>
      </div>
      <div className="scoup">
        <img src="/scoup.jpg" alt="" />
        <p>
          Notre partenaire Scoup Esport{' '}
          <a href="https://www.weezevent.com/utt-arena-2" target="_blank" rel="noreferrer noopener">
            loue du matériel
          </a>{' '}
          supplémentaire pendant l'UTT Arena.
        </p>
      </div>
      <div className="shop-section">
        <SupplementList
          initialSupplementCart={cart.supplements}
          onSupplementCartChanges={onSupplementCartChanges}
          onItemPreview={onItemPreview}
        />
      </div>
      <div className="shop-footer">
        {cart.attendant && (
          <>
            <div className="attendant-warning">
              <span className="fas fa-exclamation-triangle red-icon"></span> Si tu cliques sur payer, tu ne pourras plus
              modifier ton accompagnateur.
            </div>
          </>
        )}
        <Checkbox
          className="cgvCheckbox"
          label={
            <>
              J'accepte les{' '}
              <a href="/legal#CGV" target="_blank">
                Conditions Générales de Vente
              </a>
            </>
          }
          value={isCgvAccepted}
          onChange={setIsCgvAccepted}
        />
        <br />
        <strong>Total : {(totalPrice / 100).toFixed(2)}€</strong>
        <Button
          primary
          rightIcon="fas fa-shopping-cart"
          className="shop-button"
          onClick={onPay}
          disabled={!totalPrice || !isCgvAccepted || hasRequestedPayment}>
          Payer
        </Button>
      </div>
      {addPlaceVisible && (
        <AddPlaceModal
          userId={userId}
          username={username}
          hasTicket={isPlaceInCart}
          teamMembersWithoutTicket={teamMembersWithoutTicket}
          needsAttendant={age === 'child' && !hasAttendant}
          onQuit={onAddPlaceModalQuit}
        />
      )}
      <Modal
        visible={!!itemPreview}
        onCancel={() => setItemPreview(null)}
        buttons={null}
        containerClassName="item-preview-modal-container">
        {itemPreview && <img alt="Preview image" src={`/${itemPreview}`} className="item-preview-image" />}
      </Modal>
    </div>
  );
};

export default Shop;
