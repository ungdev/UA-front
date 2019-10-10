import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { fetchItems } from '../../modules/items';
import { fetchDraftCart, saveCart, cartPay } from '../../modules/cart';
import { Table, Input, Button, Title, Modal, Radio, Select } from '../../components/UI';
import { API } from '../../utils';

import './shop.css';
import errorToString from '../../utils/errorToString';

const placeInitialValue = {
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
  {
    title: '',
    key: 'delete',
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
  const { push } = useRouter();
  const { username, user: userId, type, isPaid } = useSelector((state) => state.login.user);
  const items = useSelector((state) => state.items.items);
  const [cart, setCart] = useState(null);
  const cartStore = useSelector((state) => state.cart);
  const [addPlaceVisible, setAddPlaceVisible] = useState(false);
  const [place, setPlace] = useState(placeInitialValue);

  useEffect(() => {
    setCart(cartStore.cart);
  }, [cartStore]);

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchDraftCart());
  }, []);

  if(!items || !cart) {
    return null;
  }

  const addPlace = async () => {
    // Get user id
    let placeForId = userId;
    let currentType = type;
    if(place.for !== 'me') {
      let users = [];
      try {
        users = await API().get(`/users?exact&or&username=${place.forUsername || ''}&email=${place.forUsername || ''}`);
      }
      catch (err) {
        return toast.error(errorToString(err.response.data.error));
      }
      if(users.data.length !== 1 || place.forUsername === '') {
        toast.error('Impossible de trouver cet utilisateur');
        return;
      }
      else {
        placeForId = users.data[0].id;
        currentType = users.data[0].type;
      }
    }

    const item = items.find((item) => item.key === currentType);
    const newCartItem = {
      item,
      quantity: 1,
      forUserId: placeForId,
      forUsername: place.forUsername,
      attribute: {
        value: null,
        id: undefined,
      },
    };
    setCart({ ...cart, cartItems: [...cart.cartItems, newCartItem] });
    setAddPlaceVisible(false);
    setPlace(placeInitialValue);
  };

  const tickets = cart.cartItems.filter((cartItem) => ['player', 'visitor'].includes(cartItem.item.key) && cartItem.quantity > 0);
  const ticketRows = tickets.map((ticket) => ({
    type: ticket.item.name,
    username: ticket.forUserId === userId ? username : (ticket.forUsername || 'Autre'),
    price: `${ticket.item.price}€`,
    delete: (
      <Button
        onClick={() => {
          const updatedCartItem = cart.cartItems.map((cartItem) => {
            const isTicket = ['player', 'visitor'].includes(cartItem.item.key);
            const forSameUser = cartItem.forUserId === ticket.forUserId;
            return isTicket && forSameUser ? { ...cartItem, quantity: 0 } : cartItem;
          });
          setCart({ ...cart, cartItems: updatedCartItem });
        }}
        rightIcon="fas fa-trash-alt"
        className="delete-button"
        noStyle
      />
    ),
  }));

  const getOptions = () => {
    if (isPaid) {
      return [
        {
          name: 'Autre utilisateur',
          value: 'other',
        },
      ];
    }
    return ([
      {
        name: `Moi-même (${username})`,
        value: 'me',
      },
      {
        name: 'Autre utilisateur',
        value: 'other',
      },
    ]);
  };

  const itemRows = items.slice(2).map((item) => {
    const cartItem = cart.cartItems.filter(((cartItem) => cartItem.item.key === item.key));
    const quantity = cartItem.length ? cartItem[0].quantity : 0;
    const initialAttribute = item.attributes.length ? {
      value: item.attributes[2].value,
      id: 3,
    } : {
      value: null,
      id: undefined,
    };
    const attribute = cartItem.length && cartItem[0].attribute ? cartItem[0].attribute : initialAttribute;

    return {
      name: item.name,
      price: `${item.price}€`,
      attributes: item.attributes.length
      ? <Select
          options={item.attributes}
          onChange={(value) => {
            const newAttribute = item.attributes.filter((attribute) => attribute.value === value)[0];
            if (quantity) {
              cartItem[0].quantity = quantity;
              cartItem[0].attribute = newAttribute;
              cartItem[0].isUpdated = true;
              const newCartItems = cart.cartItems.map((previousCartItem) => previousCartItem.item.key === item.key ? cartItem[0] : previousCartItem);
              setCart({ ...cart, cartItems: newCartItems });
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
              if (cartItem.length) {
                cartItem[0].quantity = quantity;
                cartItem[0].isUpdated = true;
                cartItem[0].attribute = initialAttribute;
                const newCartItems = cart.cartItems.map((previousCartItem) => previousCartItem.item.key === item.key ? cartItem[0] : previousCartItem);
                setCart({ ...cart, cartItems: newCartItems });
              }
              else {
                const newCartItems = [...cart.cartItems, {
                  attribute,
                  item,
                  quantity,
                }];
                setCart({ ...cart, cartItems: newCartItems });
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
  const totalPrice = cart.cartItems
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

      <p>
        Pour louer du matériel, rends-toi sur la{' '}
        <a href="https://scoup-esport.fr/reservation/" target="_blank" rel="noopener noreferrer">boutique de notre partenaire Scoup eSport</a>.
      </p>

      <div className="shop-footer">
        <strong>Total : {totalPrice}€</strong>
        <Button
          primary
          rightIcon="fas fa-shopping-cart"
          className="shop-button"
          onClick={() => dispatch(cartPay(cart))}
          disabled={!totalPrice}
        >
          Payer
        </Button>
        <br/>
        <Button
          rightIcon="fas fa-save"
          onClick={() => {
            dispatch(saveCart(cart, true));
            push('/dashboard');
          }}
        >
          Sauvegarder
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
          label="Pour"
          name="for"
          options={getOptions()}
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