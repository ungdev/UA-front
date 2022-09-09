import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchItems } from '../../modules/items';
import { cartPay } from '../../modules/cart';
import { fetchCurrentTeam } from '../../modules/team';
import { Table, Input, Button, Title, Modal, Radio, Select, Checkbox } from '../../components/UI';
import AddPlaceModal from '../../components/AddPlaceModal';
import { API } from '../../utils/api';
import { toast } from 'react-toastify';

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

const supplementColumns = [
  {
    title: '',
    key: 'name',
  },
  {
    title: 'Prix unitaire',
    key: 'price',
  },
  {
    title: '',
    key: 'attributes',
  },
  {
    title: 'Quantité',
    key: 'quantity',
  },
];

const Shop = () => {
  const dispatch = useDispatch();
  const { id: userId, type, hasPaid, username, age, email } = useSelector((state) => state.login.user);
  // The list of all items available
  const items = useSelector((state) => state.items);
  const team = useSelector((state) => state.team);
  // The members of the team are the players and the coaches
  const [teamMembers, setTeamMembers] = useState([]);
  const [isCgvAccepted, setIsCgvAccepted] = useState(false);
  const [addPlaceVisible, setAddPlaceVisible] = useState(false);
  const [place, setPlace] = useState(userId);
  // If the user already paid for his attendant, or the place is in the current cart
  const [hasAttendant, setHasAttendant] = useState(false);
  // The structure of the cart is the same as the one we pass to the route POST /users/current/carts
  const cartInitialValue = { tickets: {userIds: [], attendant: undefined}, supplements: [] };
  const [cart, setCart] = useState(cartInitialValue);
  // Wheather or not the ticket is already paid or in the cart. This is used to make sure users don't buy 2 tickets.
  const [isPlaceInCart, setIsPlaceInCart] = useState(hasPaid);
  const [itemPreview, setItemPreview] = useState(null);
  const [placeFor, setPlaceFor] = useState(hasPaid ? 'other' : 'me');
  // The members of the team who didn't buy a ticket
  const [teamMembersWithoutTicket, setTeamMembersWithoutTicket] = useState([]);

  console.log(`isPlaceInCart=${isPlaceInCart}`);
  useEffect(() => {
    dispatch(fetchItems());
    if (type !== 'spectator') {
      dispatch(fetchCurrentTeam());
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

  // verify if an attendant ticket has been paid
  useEffect(() => {
    API.get('/users/current/carts').then((res) => {
      res.data.map((paidCart) => {
        paidCart.cartItems.map((cartItem) => {
          cartItem.itemId === 'ticket-attendant' && setHasAttendant(true);
        });
      });
    });
  }, []);

  if (!items) {
    return null;
  }

  const hasDiscount = email.endsWith('@utt.fr') || email.endsWith('@utc.fr') || email.endsWith('@utbm.fr');

  // When the user removes a ticket.
  // 'user' is either a user object, or undefined if it is the ticket of an attendant
  // 'ticketIndex' is the index of the ticket in the cart
  const onRemoveTicket = (user, ticketIndex) => {
    if (user === undefined) {
      setHasAttendant(false);
      setCart({ ...cart, tickets: {...cart.tickets, attendant: undefined }});
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
      setCart({ ...cart, tickets: {...cart.tickets, userIds: updatedCartTickets }});
    }
  }

  const getTicketRows = () => {
    let ticketRows = cart.tickets.userIds.map((ticket, i) => {
      let user = teamMembers.find(member => member.id === ticket);
      let ticketItem = items.find(ticket => ticket.id === `ticket-${user.type}`);
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
        type:
          `${ticketItem.name} | ` +
          (ticket.for === userId ? `Toi (${username})` : user.username),
        price: price,
        delete: (
          <Button
            onClick={() => { onRemoveTicket(user, i); }}
            rightIcon="fas fa-trash-alt"
            className="delete-button"
            noStyle
          />
        ),
      };
    })
    if (cart.tickets.attendant) {
      ticketRows.push({
        type: `Place accompagnateur | ${cart.tickets.attendant.firstname} ${cart.tickets.attendant.lastname}`,
        price: '12.00€',
        delete: (
          <Button
            onClick={() => { onRemoveTicket(undefined, 0); }}
            rightIcon="fas fa-trash-alt"
            className="delete-button"
            noStyle
          />
        ),
      });
    }
    return ticketRows;
  }

  const getPeopleWhoNeedPlace = () => {
    const people = [];
    people['me'] = (!hasPaid && !isPlaceInCart) ? username : '';
    people['attendant'] = (age === 'child' && !cart.attendant && !hasAttendant)
    people['other'] = teamMembersWithoutTicket;
    return people;
  }

  const getOptions = () => {
    const options = [];
    if (!hasPaid && !isPlaceInCart) {
      options.push({
        name: `Moi-même (${username})`,
        value: 'me',
      });
    }
    if (age === 'child' && !cart.attendant && !hasAttendant) {
      options.push({
        name: 'Un accompagnateur (majeur)',
        value: 'attendant',
      });
    }
    if (teamMembersWithoutTicket.length) {
      options.push({
        name: 'Autre utilisateur',
        value: 'other',
      });
    }
    return options;
  };

  // In the database, every t-shirt size has it's own entry.
  // We need to display all of the woman t-shirts in a single row, and all of the man t-shirts in an other row.
  // So we need to know which items must be rendered in the same row.
  // We need to create supplement types, which are normal items, except :
  //  * they don't have an attribute field, instead they have a list of attributes that the supplement type can take.
  //  * they don't have category (because they must be supplements)
  // This list will display instead of the items list.
  const supplementTypes = [];
  items &&
    items.forEach((item) => {
      if (item.category === 'supplement') {
        // Every item that contains an attribute has an id that matches the syntax ${itemId}-${attribute}.
        // So to get the item type id, we just remove the end of the id, by replacing it with an empty string.
        // If the item has no attribute, then the regex `-${item.attribute}$` will not match, so nothing will be replaced, we will keep the item id
        const itemId = item.id.replace(new RegExp(`-${item.attribute}$`), '');
        const supplementType = supplementTypes.find((supplement) => supplement.id === itemId);
        if (!supplementType) {
          const newSupplementType = { ...item, id: itemId, attributes: [] };
          delete newSupplementType.attribute;
          delete newSupplementType.category;
          if (item.attribute) {
            newSupplementType.attributes = [item.attribute];
          }
          supplementTypes.push(newSupplementType);
        } else {
          supplementType.attributes.push(item.attribute);
        }
      }
    });

  // We display the supplementTypes we have just defined, and not the items
  const supplementRows = supplementTypes.map((supplement) => {
    // Get cart supplement we are managing
    let cartSupplement = cart.supplements.find(
      (cartSupplement) => cartSupplement.item && cartSupplement.item.id === supplement.id,
    );
    if (cartSupplement === undefined) {
      cartSupplement = {
        item: supplement,
        quantity: 0,
        attribute: supplement.attributes.length ? supplement.attributes[0] : null,
      };
    }
    // Get attributes
    const availableAttributes = [];
    supplement.attributes.forEach((attribute) => {
      availableAttributes.push({ value: attribute, label: attribute.toUpperCase() });
    });

    // Return the row
    return {
      name: (
        <>
          {supplement.name}
          {supplement.image && (
            <Button
              className="item-preview-button"
              onClick={() => setItemPreview(supplement.image)}
              leftIcon="far fa-image"
              noStyle>
              Voir le design
            </Button>
          )}
          <div className="item-description">{supplement.infos}</div>
        </>
      ),
      price: `${(supplement.price / 100).toFixed(2)}€`,
      attributes: supplement.attributes.length ? (
        <Select
          options={availableAttributes}
          onChange={(value) => {
            cartSupplement.attribute = value;
            const newCartSupplements = cart.supplements.map((supplement) =>
              supplement.item.id === cartSupplement.item.id ? cartSupplement : supplement,
            );
            setCart({ ...cart, supplements: newCartSupplements });
          }}
          value={cartSupplement.quantity ? cartSupplement.attribute : undefined}
          className="shop-input"
        />
      ) : (
        ''
      ),
      quantity: (
        <Input
          type="number"
          placeholder="0"
          value={cartSupplement.quantity}
          onChange={(strQuantity) => {
            let quantity = parseInt(strQuantity, 10);
            if (strQuantity === '') {
              quantity = 0;
            }
            if (Number.isInteger(quantity)) {
              const previousQuantity = cartSupplement.quantity;
              cartSupplement.quantity = quantity;
              if (cartSupplement.quantity) {
                if (previousQuantity) {
                  const newCartSupplements = cart.supplements.map((previousCartSupplement) =>
                    previousCartSupplement.item.id === supplement.id ? cartSupplement : previousCartSupplement,
                  );
                  setCart({ ...cart, supplements: newCartSupplements });
                } else {
                  setCart({ ...cart, supplements: [...cart.supplements, cartSupplement] });
                }
              } else {
                const newCartSupplements = cart.supplements;
                const index = newCartSupplements.findIndex(
                  (previousCartSupplement) => previousCartSupplement.item.id === supplement.id,
                );
                if (index !== -1) {
                  newCartSupplements.splice(index, 1);
                  setCart({ ...cart, supplements: newCartSupplements });
                }
              }
            }
          }}
          min={0}
          max={supplement.id === 'discount-switch-ssbu' ? 1 : supplement.left ? supplement.left : 30}
          className="shop-input"
        />
      ),
    };
  });

  const onAddPlace = () => {
    if (!hasPaid && !isPlaceInCart) {
      setPlaceFor('me');
    } else if (teamMembersWithoutTicket.length) {
      setPlaceFor('other');
    } else if (age === 'child' && !cart.attendant & !hasAttendant) {
      setPlaceFor('attendant');
    } else {
      toast.info("Tous les membres de l'équipe ont déjà une place !");
      return;
    }
    if (hasPaid || isPlaceInCart) {
      setPlace(teamMembersWithoutTicket.length ? teamMembersWithoutTicket[0].id : undefined);
    } else {
      setPlace(userId);
    }
    setAddPlaceVisible(true);
  }

  // Compute total price
  const totalPrice =
    cart.tickets.userIds.reduce((acc, cartTicket) => {
      if (cartTicket === userId && type !== 'coach' && hasDiscount) {
        return acc + (type === 'player' ? 1500 : 1000);
      }
      let userType = (cartTicket === userId ? type : teamMembers.find((member) => member.id === cartTicket).type);
      return acc + items.find(item => item.id === `ticket-${userType}`).price;
    }, 0) +
    cart.supplements.reduce((acc, cartSupplement) => {
      return acc + cartSupplement.quantity * cartSupplement.item.price;
    }, 0) +
    (cart.attendant ? items.find(item => item.id === 'ticket-attendant').price : 0);

  const onAddPlaceModalQuit = (placeFor, placeId) => {
    setAddPlaceVisible(false);
    console.log('dans le callback');
    console.log(placeFor);
    console.log(placeId);
    if (placeFor === undefined)
      return;
    if (placeFor === 'me') {
      setCart({...cart, tickets: {...cart.tickets, userIds: [...cart.tickets.userIds, userId]}});
      setIsPlaceInCart(true);
    } else if (placeFor === 'other') {
      setCart({...cart, tickets: {...cart.tickets, userIds: [...cart.tickets.userIds, placeId]}});
      setTeamMembersWithoutTicket(teamMembersWithoutTicket.filter(member => member.id !== placeId));
    } else {
      setCart({...cart, tickets: {...cart.tickets, attendant: placeId}});
      setHasAttendant(true);
    }
  }

  console.log(`addPlaceModalVisible : ${addPlaceVisible}`)

  return (
    <div id="dashboard-shop">
      <div className="shop-section">
        <Title level={4}>Places</Title>
        <Table columns={ticketColumns} dataSource={getTicketRows()} className="shop-table" />
        <Button onClick={onAddPlace}>Ajouter une place</Button>
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
        <Title level={4}>Accessoires</Title>
        <Table columns={supplementColumns} dataSource={supplementRows} className="shop-table" />
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
          onChange={(value) => setIsCgvAccepted(value)}
        />
        <br />
        <strong>Total : {(totalPrice / 100).toFixed(2)}€</strong>
        <Button
          primary
          rightIcon="fas fa-shopping-cart"
          className="shop-button"
          onClick={() => dispatch(cartPay(cart))}
          disabled={!totalPrice || !isCgvAccepted}>
          Payer
        </Button>
      </div>
      {addPlaceVisible &&
        <AddPlaceModal
          userId={userId}
          hasTicket={isPlaceInCart}
          teamMembersWithoutTicket={teamMembersWithoutTicket}
          needsAttendant={age === 'child' && !hasAttendant}
          onQuit={onAddPlaceModalQuit} />}
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
