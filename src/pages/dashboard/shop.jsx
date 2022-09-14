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
  // If the user already paid for his attendant, or the place is in the current cart. If the user is an adult, this value should not be used.
  const [hasAttendant, setHasAttendant] = useState(false);
  // The structure of the cart is the same as the one we pass to the route POST /users/current/carts
  const cartInitialValue = { tickets: {userIds: [], attendant: undefined}, supplements: [] };
  const [cart, setCart] = useState(cartInitialValue);
  // Wheather or not the ticket is already paid or in the cart. This is used to make sure users don't buy 2 tickets.
  const [isPlaceInCart, setIsPlaceInCart] = useState(hasPaid);
  const [itemPreview, setItemPreview] = useState(null);
  // The members of the team who didn't buy a ticket
  const [teamMembersWithoutTicket, setTeamMembersWithoutTicket] = useState([]);
  // The supplements sorted by type. In this array, there are ONLY supplements, there aren't any tickets.
  // If two items have the name {something}-{attribute_item_1} and {something}-{attribute_item_2}, then they are of the same type
  const [supplementTypes, setSupplementTypes] = useState([]);
  // The currently selected attribute for each item that has attributes.
  // This is an object. Keys are the item ids, and values are the current attributes.
  const [selectedAttributes, setSelectedAttributes] = useState({});

  // Fetch items, team and checks if user already have an intendant.
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

  // Fills supplementTypes
  useEffect(() => {
    if (!items) return;
    const newSupplementTypes = []
    items.forEach((item) => {
      if (item.category === 'supplement') {
        // Every item that contains an attribute has an id that matches the syntax ${itemId}-${attribute}.
        // So to get the item type id, we just remove the end of the id, by replacing it with an empty string.
        // If the item has no attribute, then the regex `-${item.attribute}$` will not match, so nothing will be replaced, we will keep the item id
        const itemId = item.id.replace(new RegExp(`-${item.attribute}$`), '');
        const supplementType = newSupplementTypes.find((supplement) => supplement.id === itemId);
        if (!supplementType) {
          const newSupplementType = { ...item, id: itemId, attributes: [] };
          delete newSupplementType.attribute;
          delete newSupplementType.category;
          if (item.attribute) {
            newSupplementType.attributes = [item.attribute];
          }
          newSupplementTypes.push(newSupplementType);
        } else {
          supplementType.attributes.push(item.attribute);
        }
      }
    });
    setSupplementTypes(newSupplementTypes);
  }, [items])

  // Fills selectedAttributes
  useEffect(() => {
    let newSelectedAttributes = {};
    supplementTypes.forEach(supplement => {
      if (supplement.attributes.length) {
        newSelectedAttributes[supplement.id] = supplement.attributes[0];
      }
    });
    setSelectedAttributes(newSelectedAttributes);
  }, [supplementTypes])

  if (!items) {
    return null;
  }

  // Does the user have a discount on his ticket ? (Is he in a UT school ?)
  const hasDiscount = email.endsWith('@utt.fr') || email.endsWith('@utc.fr') || email.endsWith('@utbm.fr');

  // Returns a supplement id according to the supplement and the attribute given to the function.
  // Supplement.id should be the id of the supplement type of the item. You should call this with a supplementType, not an item
  // If attribute is undefined, then it simply returns supplement.id
  // If it isn't, it returns `${supplement.id}-${attribute}`
  const getSupplementId = (supplement, attribute) => {
    return `${supplement.id}` + (attribute ? `-${attribute}` : '');
  }

  // When the user removes a ticket.
  // 'user' is either a user object, or undefined if it is the ticket of an attendant
  // 'ticketIndex' is the index of the ticket in the cart if user is not undefined
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

  // We display the supplementTypes
  const supplementRows = supplementTypes.map((supplement) => {
    // The id we have to find in the cart
    let supplementFullId = getSupplementId(supplement, selectedAttributes[supplement.id]);
    // Get cart supplement we are managing
    let cartSupplement = cart.supplements.find((cartSupplement) => cartSupplement.itemId === supplementFullId);
    if (!cartSupplement) {
      cartSupplement = {
        item: supplementFullId,
        quantity: 0,
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
            const previousSupplementId = getSupplementId(supplement, selectedAttributes[supplement.id]);
            const newSupplementId = getSupplementId(supplement, value);
            let newCartSupplements = cart.supplements.map(cartSupplement => {
              let newCartSupplement = {...cartSupplement};
              if (newCartSupplement.itemId === previousSupplementId) {
                newCartSupplement.itemId = newSupplementId;
              }
              return newCartSupplement;
            });
            setCart({...cart, supplements: newCartSupplements});
            let newSelectedAttributes = {...selectedAttributes};
            newSelectedAttributes[supplement.id] = value;
            setSelectedAttributes(newSelectedAttributes)
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
            // If the parse result is NaN, then quantity defaults to 0
            let quantity = parseInt(strQuantity, 10) || 0;
            let newCartSupplements = [...cart.supplements]
            if (cartSupplement.quantity) {
              if (quantity) {
                newCartSupplements.forEach(cartSupplement => cartSupplement.quantity = cartSupplement.itemId === supplementFullId ? quantity : cartSupplement.quantity);
              } else {
                newCartSupplements = cart.supplements.filter(cartSupplement => cartSupplement.itemId !== supplementFullId);
              }
              setCart({...cart, supplements: newCartSupplements});
            } else if (quantity !== 0) {
              const newSupplement = {
                itemId: supplementFullId,
                quantity: quantity
              }
              setCart({...cart, supplements: [...cart.supplements, newSupplement]});
            }
          }}
          min={0}
          max={supplementFullId === 'discount-switch-ssbu' ? 1 : supplement.left ? supplement.left : 30}
          className="shop-input"
        />
      ),
    };
  });

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
      const item = items.find(item => item.id == cartSupplement.itemId);
      if (!item) {
        toast.warn("Une erreur s'est produite lors du calcul du prix. Le prix affiché n'est peut-être pas exact. Si ce problème se reproduit, contacte le support");
        return acc;
      }
      return acc + cartSupplement.quantity * item.price;
    }, 0) +
    (cart.tickets.attendant ? items.find(item => item.id === 'ticket-attendant').price : 0);

  const onAddPlaceModalQuit = (placeFor, placeId) => {
    setAddPlaceVisible(false);
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
          onChange={setIsCgvAccepted}
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
          username={username}
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
