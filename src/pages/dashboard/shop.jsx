import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchItems } from '../../modules/items';
import { cartPay } from '../../modules/cart';
import { fetchCurrentTeam } from '../../modules/team';
import { Table, Input, Button, Title, Modal, Radio, Select } from '../../components/UI';
import { API } from '../../utils/api';
import { toast } from 'react-toastify';

const ticketColumns = [
  {
    title: '',
    key: 'type',
  },
  {
    title: 'Email',
    key: 'email',
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
  const { email, id: userId, type, hasPaid, username } = useSelector((state) => state.login.user);
  // The list of all items available
  const items = useSelector((state) => state.items.items);
  const team = useSelector((state) => state.team.team);
  // The members of the team are the players and the coaches
  const [teamMembers, setTeamMembers] = useState([]);
  const [addPlaceVisible, setAddPlaceVisible] = useState(false);
  const [place, setPlace] = useState(userId);
  /* Structure of the cart :
  {
    supplements: [
      {
        item: {
          id: string,
          image: string,
          infos: string,
          name: string,
          price: int,
          attributes: [] // represents the list of available attributes for this item
        },
        quantity: int,
        attribute: string | null
      },
    ]
    tickets: [
      {
        for: string,
        item: {
          attribute: string | null,
          category: "ticket" | "supplement",  // Should always be "ticket"
          id: string,
          image: string,
          infos: string,
          name: string,
          price: int
        }
      }
    ]
  }
  */
  const cartInitialValue = { tickets: [], supplements: [] };
  const [cart, setCart] = useState(cartInitialValue);
  // Wheather or not the ticket is already paid or in the cart. This is used to make sure users don't buy 2 tickets.
  const [willBePaid, setWillBePaid] = useState(hasPaid);
  const [itemPreview, setItemPreview] = useState(null);
  // The members of the team who didn't buy a ticket
  const [membersWithoutTicket, setMembersWithoutTicket] = useState([]);

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchCurrentTeam());
  }, []);

  // Initializing teamMembers
  useEffect(() => {
    if (!team) {
      return;
    }
    setTeamMembers(team.players.concat(team.coaches));
  }, [team]);

  // Initializing membersWithoutTicket
  useEffect(() => {
    setMembersWithoutTicket(
      teamMembers.filter(
        (member) =>
          !member.hasPaid && member.id !== userId && !cart.tickets.includes((ticket) => ticket.for === member.id),
      ),
    );
  }, [teamMembers]);

  if (!items) {
    return null;
  }

  const addPlace = async () => {
    // Get user id
    let ticketType = undefined;
    if (place === userId) {
      setWillBePaid(true);
      ticketType = type;
    } else {
      ticketType = membersWithoutTicket.splice(
        membersWithoutTicket.findIndex((user) => user.id === place),
        1,
      )[0].type;
    }
    const item = items.find((item) => item.id === `ticket-${ticketType}`);
    const newCartTicket = {
      item,
      for: place,
    };
    setCart({ ...cart, tickets: [...cart.tickets, newCartTicket] });
    setAddPlaceVisible(false);
    let newPlace = undefined;
    if (hasPaid || willBePaid || place === userId) {
      if (membersWithoutTicket.length) {
        newPlace = membersWithoutTicket[0].id;
      }
    } else {
      newPlace = userId;
    }
    setPlace(newPlace);
  };

  const ticketRows = cart.tickets.map((ticket) => {
    return {
      type:
        `${ticket.item.name} | ` +
        (ticket.for === userId
          ? `Vous (${username})`
          : teamMembers.find((member) => member.id === ticket.for).username),
      price: `${(ticket.item.price / 100).toFixed(2)}€`,
      delete: (
        <Button
          onClick={() => {
            const updatedCartTickets = cart.tickets;
            const index = updatedCartTickets.indexOf(ticket);
            if (ticket.for === userId) {
              setWillBePaid(false);
              // If we don't change that, next time we will add another place,
              // the default value in the modal will not be our place
            } else {
              const newPlayersWithoutTicket = membersWithoutTicket;
              newPlayersWithoutTicket.push(teamMembers.find((member) => member.id === ticket.for));
              setMembersWithoutTicket(newPlayersWithoutTicket);
            }
            updatedCartTickets.splice(index, 1);
            setCart({ ...cart, cartTickets: updatedCartTickets });
          }}
          rightIcon="fas fa-trash-alt"
          className="delete-button"
          noStyle
        />
      ),
    };
  });

  const getOptions = () => {
    const options = [];
    if (!hasPaid && !willBePaid) {
      options.push({
        name: `Moi-même (${username})`,
        value: 'me',
      });
    }
    if (membersWithoutTicket.length) {
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
  const supplementRows = supplementTypes.slice(2).map((supplement, i) => {
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
            if (cartSupplement.quantity) {
              cartSupplement.attribute = value;
              const newCartSupplements = cart.supplements.map((supplement) =>
                supplement.item.id === cartSupplement.item.id ? cartSupplement : supplement,
              );
              setCart({ ...cart, supplements: newCartSupplements });
            }
          }}
          value={undefined}
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
          max={100}
          className="shop-input"
        />
      ),
    };
  });

  // Compute total price
  const totalPrice =
    cart.tickets.reduce((acc, cartTicket) => acc + cartTicket.item.price, 0) +
    cart.supplements.reduce((acc, cartSupplement) => acc + cartSupplement.quantity * cartSupplement.item.price, 0);

  return (
    <div id="dashboard-shop">
      <div className="shop-section">
        <Title level={4}>Places</Title>
        <Table columns={ticketColumns} dataSource={ticketRows} className="shop-table" />
        <Button
          onClick={() => {
            if ((hasPaid || willBePaid) && !membersWithoutTicket.length) {
              toast.info("Tous les membres de l'équipe ont déjà une place !");
              return;
            }
            if (hasPaid || willBePaid) {
              setPlace(membersWithoutTicket[0].id);
            } else {
              setPlace(userId);
            }
            setAddPlaceVisible(true);
          }}>
          Ajouter une place
        </Button>
      </div>
      <div className="scoup">
        <a href="https://www.weezevent.com/utt-arena-2019" target="_blank" rel="noopener noreferrer">
          <img src="/scoupbanner.png" alt="" />
        </a>
      </div>
      <div className="shop-section">
        <Title level={4}>Accessoires</Title>
        <Table columns={supplementColumns} dataSource={supplementRows} className="shop-table" />
      </div>
      <div className="shop-footer">
        <strong>Total : {(totalPrice / 100).toFixed(2)}€</strong>
        <Button
          primary
          rightIcon="fas fa-shopping-cart"
          className="shop-button"
          onClick={() => dispatch(cartPay(cart))}
          disabled={!totalPrice}>
          Payer
        </Button>
      </div>
      <Modal
        title="Ajouter une place"
        className="add-place-modal"
        visible={addPlaceVisible}
        onCancel={() => setAddPlaceVisible(false)}
        buttons={
          <Button primary onClick={addPlace}>
            Ajouter
          </Button>
        }>
        <Radio
          label="Pour"
          name="for"
          options={getOptions()}
          value={place === userId ? 'me' : 'other'}
          onChange={(v) => {
            setPlace(v === 'me' ? userId : membersWithoutTicket[0].id);
          }}
          className="add-place-input"
        />
        {place !== userId && (
          <Select
            label="Membre"
            options={membersWithoutTicket.map((member) => ({
              value: member.id,
              label: `${member.username} (${member.type === 'player' ? 'Joueur' : 'Coach'})`,
            }))}
            value={place}
            onChange={(v) => {
              setPlace(v);
            }}
            className="add-place-input"
          />
        )}
      </Modal>
      <Modal
        visible={!!itemPreview}
        onCancel={() => setItemPreview(null)}
        buttons={null}
        containerClassName="item-preview-modal-container">
        {itemPreview && <img src={`/assets/${itemPreview}`} className="item-preview-image" />}
      </Modal>
    </div>
  );
};

export default Shop;
