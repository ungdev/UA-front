import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { fetchItems } from '../../modules/items';
import { fetchDraftCart, saveCart, cartPay } from '../../modules/cart';
import { Table, Input, Button, Title, Modal, Radio, Select } from '../../components/UI';
import { API } from '../../utils/api';

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
  const { email, id: userId, type, isPaid } = useSelector((state) => state.login.user);
  const items = useSelector((state) => state.items.items);
  const cartStore = useSelector((state) => state.cart);
  const placeInitialValue = { for: isPaid ? 'other' : 'me', forEmail: '' };
  const [addPlaceVisible, setAddPlaceVisible] = useState(false);
  const [place, setPlace] = useState(placeInitialValue);
  const [cart, setCart] = useState(null);
  const [willBePaid, setWillBePaid] = useState(isPaid);
  const [itemPreview, setItemPreview] = useState(null);

  useEffect(() => {
    setCart(cartStore.cart);
  }, [cartStore]);

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchDraftCart());
  }, []);

  if (!items || !cart) {
    return null;
  }

  const addPlace = async () => {
    // Get user id
    let placeForId = userId;
    let currentType = type;
    if (place.for !== 'me') {
      const user = await API.get(`users?email=${place.forEmail || ''}`);
      placeForId = user.data.id;
      currentType = user.data.type;
    } else {
      setWillBePaid(true);
    }

    const item = items.find((item) => item.key === currentType);
    const newCartItem = {
      item,
      quantity: 1,
      forUserId: placeForId,
      forEmail: place.forEmail,
      attribute: {
        value: null,
        id: undefined,
      },
    };
    setCart({ ...cart, cartItems: [...cart.cartItems, newCartItem] });
    setAddPlaceVisible(false);
    setPlace(placeInitialValue);
  };

  const tickets = cart.cartItems.filter(
    (cartItem) => cartItem.item && ['player', 'visitor'].includes(cartItem.item.key) && cartItem.quantity > 0,
  );
  const ticketRows = tickets.map((ticket) => {
    if (ticket.forUserId === userId && !willBePaid) {
      setWillBePaid(true);
    }
    return {
      type: ticket.item.name,
      email: ticket.forUserId === userId ? email : ticket.forEmail,
      price: `${ticket.item.price}€`,
      delete: (
        <Button
          onClick={() => {
            const updatedCartItem = cart.cartItems.map((cartItem) => {
              const isTicket = ['player', 'visitor'].includes(cartItem.item.key);
              const forSameUser = cartItem.forUserId === ticket.forUserId;
              if (forSameUser && cartItem.forUserId === userId && willBePaid) {
                setWillBePaid(false);
              }
              return isTicket && forSameUser ? { ...cartItem, quantity: 0 } : cartItem;
            });
            setCart({ ...cart, cartItems: updatedCartItem });
          }}
          rightIcon="fas fa-trash-alt"
          className="delete-button"
          noStyle
        />
      ),
    };
  });

  const getOptions = () => {
    if (isPaid || willBePaid) {
      return [
        {
          name: 'Autre utilisateur',
          value: 'other',
        },
      ];
    }
    return [
      {
        name: `Moi-même (${email})`,
        value: 'me',
      },
      {
        name: 'Autre utilisateur',
        value: 'other',
      },
    ];
  };

  const itemRows = items.slice(2).map((item) => {
    const cartItem = cart.cartItems
      ? cart.cartItems.filter((cartItem) => cartItem.item && cartItem.item.key === item.key)
      : [];
    const quantity = cartItem.length ? cartItem[0].quantity : 0;
    const initialAttribute = item.attributes.length
      ? {
          value: item.attributes[1].value,
          id: 3,
        }
      : {
          value: null,
          id: undefined,
        };
    const attribute = cartItem.length && cartItem[0].attribute ? cartItem[0].attribute : initialAttribute;

    return {
      name: (
        <>
          {item.name}
          {item.image && (
            <Button
              className="item-preview-button"
              onClick={() => setItemPreview(item.image)}
              leftIcon="far fa-image"
              noStyle>
              Voir le design
            </Button>
          )}
          <div className="item-description">{item.infos}</div>
        </>
      ),
      price: `${item.price}€`,
      attributes: item.attributes.length ? (
        <Select
          options={item.attributes}
          onChange={(value) => {
            const newAttribute = item.attributes.filter((attribute) => attribute.value === value)[0];
            if (quantity) {
              cartItem[0].quantity = quantity;
              cartItem[0].attribute = newAttribute;
              cartItem[0].isUpdated = true;
              const newCartItems = cart.cartItems.map((previousCartItem) =>
                previousCartItem.item.key === item.key ? cartItem[0] : previousCartItem,
              );
              setCart({ ...cart, cartItems: newCartItems });
            } else {
              const newCartItems = [
                ...cart.cartItems,
                {
                  item,
                  quantity: 1,
                  attribute: newAttribute,
                },
              ];
              setCart({ ...cart, cartItems: newCartItems });
            }
          }}
          value={attribute.value}
          className="shop-input"
        />
      ) : (
        ''
      ),
      quantity: (
        <Input
          type="number"
          placeholder="0"
          value={quantity || ''}
          onChange={(strQuantity) => {
            let quantity = parseInt(strQuantity, 10);
            if (strQuantity === '') {
              quantity = 0;
            }
            if (Number.isInteger(quantity)) {
              if (cartItem.length) {
                cartItem[0].quantity = quantity;
                cartItem[0].isUpdated = true;
                cartItem[0].attribute = cartItem[0].attribute || initialAttribute;
                const newCartItems = cart.cartItems.map((previousCartItem) =>
                  previousCartItem.item.key === item.key ? cartItem[0] : previousCartItem,
                );
                setCart({ ...cart, cartItems: newCartItems });
              } else {
                const newCartItems = [
                  ...cart.cartItems,
                  {
                    attribute,
                    item,
                    quantity,
                  },
                ];
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
  const totalPrice = cart.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.item.price, 0);

  return (
    <div id="dashboard-shop">
      <div className="shop-section">
        <Title level={4}>Places</Title>
        <Table columns={ticketColumns} dataSource={ticketRows} className="shop-table" />
        <Button onClick={() => setAddPlaceVisible(true)}>Ajouter une place</Button>
      </div>
      <div className="scoup">
        <a href="https://www.weezevent.com/utt-arena-2019" target="_blank" rel="noopener noreferrer">
          <img src="/scoupbanner.png" alt="" />
        </a>
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
          onClick={() => dispatch(cartPay(cart))}
          disabled={!totalPrice}>
          Payer
        </Button>
        <br />
        <Button
          rightIcon="fas fa-save"
          onClick={() => {
            dispatch(saveCart(cart, true));
            push('/dashboard');
          }}>
          Sauvegarder
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
          value={place.for}
          onChange={(v) => setPlace({ ...place, for: v })}
          className="add-place-input"
        />

        {place.for === 'other' && (
          <Input
            label="Email du compte"
            value={place.forEmail}
            onChange={(v) => setPlace({ ...place, forEmail: v })}
            className="add-place-input"
          />
        )}
      </Modal>

      <Modal
        visible={itemPreview !== null}
        onCancel={() => setItemPreview(null)}
        buttons={null}
        containerClassName="item-preview-modal-container">
        {itemPreview && <img src={`/assets/${itemPreview}`} className="item-preview-image" />}
      </Modal>
    </div>
  );
};

export default Shop;
