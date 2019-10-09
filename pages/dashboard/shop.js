import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { fetchItems } from '../../modules/items';
import { fetchDraftCart, deleteCartItem, updateCartItem, createCartItem, cartPay } from '../../modules/cart';
import { Table, Input, Button, Title, Modal, Radio, Select } from '../../components/UI';
import { API } from '../../utils';

import './shop.css';

const placeInitialValue = {
  type: 'player',
  for: 'me',
  forUsername: '',
};

const ticketColumns = [
  {
    title: '',
    key: 'type',
  },
  {
    title: 'Nom d\'utilisateur',
    key: 'username',
  },
  {
    title: 'Prix',
    key: 'price',
  },
];

const itemColumns = [
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
  const userId = useSelector((state) => state.login.user.id);
  const username = useSelector((state) => state.login.user.username);
  const items = useSelector((state) => state.items.items);
  const { cart, cartItems } = useSelector((state) => state.cart);

  const [addPlaceVisible, setAddPlaceVisible] = useState(false);
  const [place, setPlace] = useState(placeInitialValue);

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchDraftCart());
  }, []);

  if(!items || !cart || !cartItems) {
    return null;
  }

  const addPlace = async () => {
    // Get user id
    let placeForId = userId;
    if(place.for !== 'me') {
      const users = await API().get(`/users?exact&or&username=${place.forUsername || ''}&email=${place.forUsername || ''}`);

      if(users.data.length !== 1 || place.forUsername === '') {
        toast.error('Impossible de trouver cet utilisateur');
        return;
      }
      else {
        placeForId = users.data[0].id;
      }
    }

    const item = items.find((item) => item.key === place.type);
    dispatch(createCartItem(cart.id, item, 1, undefined, placeForId));
    setAddPlaceVisible(false);
    setPlace(placeInitialValue);
  };

  // Get ticket rows
  const ticketRows = items.slice(0, 2).map((ticket) => {
    return {
      type: ticket.name,
      price: `${ticket.price}€`,
    };
  });

  // Get item rows
  const itemRows = items.slice(2).map((item) => {
    const quantity = cartItems[item.key] && cartItems[item.key].quantity;
    let attribute = {
      value: null,
      id: undefined,
    };
    if (item.attributes.length) {
      if (cartItems[item.key] && cartItems[item.key].attribute) {
        attribute = cartItems[item.key].attribute;
      }
      else {
        attribute = {
          value: item.attributes[2].value,
          id: 3,
        };
      }
    }

    return {
      name: item.name,
      price: `${item.price}€`,
      attributes: item.attributes.length
      ? <Select
          options={item.attributes}
          onChange={(value) => {
            const newAttribute = item.attributes.filter((attribute) => attribute.value === value)[0];
            if (quantity) {
              dispatch(updateCartItem(cart.id, cartItems[item.key], item.key, quantity, newAttribute));
            }
          }}
          value={attribute.value}
          disabled={!quantity}
          className="shop-input"
        />
      : '',
      quantity: (
        <Input
          type="number"
          value={quantity || 0}
          onChange={(strQuantity) => {
            const quantity = parseInt(strQuantity, 10);
            if (Number.isInteger(quantity)) {
              if (quantity === 0) {
                dispatch(deleteCartItem(cart.id, cartItems[item.key], item.key));
              }
              else if (cartItems[item.key]) {
                dispatch(updateCartItem(cart.id, cartItems[item.key], item.key, quantity, attribute));
              }
              else {
                dispatch(createCartItem(cart.id, item, quantity, attribute.id));
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
  const totalPrice = Object.values(cartItems)
    .reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.item.price, 0);

  return (
    <div id="dashboard-shop">
      <div className="shop-section">
        <Title level={4}>Places</Title>
        <Table columns={ticketColumns} dataSource={ticketRows} className="shop-table" />
        <Button onClick={() => setAddPlaceVisible(true)}>Ajouter une place</Button>
      </div>

      <div className="shop-section">
        <Title level={4}>Accessoires</Title>
        <Table columns={itemColumns} dataSource={itemRows} className="shop-table" />
      </div>

      <div className="shop-footer">
        <strong>Total : {totalPrice}€</strong>
        <Button
          primary
          rightIcon="fas fa-shopping-cart"
          className="shop-button"
          onClick={() => dispatch(cartPay(cart.id))}
        >
          Payer
        </Button>
      </div>

      <Modal
        title="Ajouter une place"
        className="add-place-modal"
        visible={addPlaceVisible}
        onCancel={() => setAddPlaceVisible(false)}
        buttons={<Button primary onClick={addPlace}>Ajouter</Button>}
      >
        <Radio
          label="Type de place"
          name="type"
          options={[
            {
              name: 'Joueur',
              value: 'player',
            },
            {
              name: 'Coach / manager / accompagnateur',
              value: 'visitor',
            },
          ]}
          value={place.type}
          onChange={(v) => setPlace({ ...place, type: v })}
          className="add-place-input"
        />

        <Radio
          label="Pour"
          name="for"
          options={[
            {
              name: `Moi-même (${username})`,
              value: 'me',
            },
            {
              name: 'Autre utilisateur',
              value: 'other',
            },
          ]}
          value={place.for}
          onChange={(v) => setPlace({ ...place, for: v })}
          className="add-place-input"
        />

        { place.for === 'other' &&
          <Input
            label="Pseudo ou email du compte"
            value={place.forUsername}
            onChange={(v) => setPlace({ ...place, forUsername: v })}
            className="add-place-input"
          />
        }
      </Modal>
    </div>
  );
};

export default Shop;