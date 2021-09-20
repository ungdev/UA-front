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
  const { push } = useRouter();
  const { email, id: userId, type, isPaid } = useSelector((state) => state.login.user);
  const items = useSelector((state) => state.items.items);
  const placeInitialValue = { for: isPaid ? 'other' : 'me', forEmail: '' };
  const [addPlaceVisible, setAddPlaceVisible] = useState(false);
  const [place, setPlace] = useState(placeInitialValue);
  const cartInitialValue = { tickets: [], supplements: [] };
  const [cart, setCart] = useState(cartInitialValue);
  const [willBePaid, setWillBePaid] = useState(isPaid);
  const [itemPreview, setItemPreview] = useState(null);

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchDraftCart());
  }, []);

  if (!items) {
    return null;
  }

  const addPlace = async () => {
    // Get user id
    let placeForId = userId;
    let currentType = type;
    if (place.for !== 'me') {
      const user = await API.get(`users?search=${place.forEmail || ''}`);
      placeForId = user.data.id;
      currentType = user.data.type;
    } else {
      setWillBePaid(true);
    }

    const item = items.find((item) => item.id === 'ticket-' + currentType);
    const newCartTicket = {
      item,
      forUserId: placeForId,
      forEmail: place.forEmail,
    };
    setCart({ ...cart, tickets: [...cart.tickets, newCartTicket] });
    setAddPlaceVisible(false);
    setPlace(placeInitialValue);
  };

  const ticketRows = cart.tickets.map((ticket) => {
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
            const updatedCartTickets = cart.tickets;
            const index = updatedCartTickets.indexOf(ticket);
            if (ticket.forUserId === userId && willBePaid) {
              setWillBePaid(false);
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

  const supplementTypes = [];
  for (let i = 0; i < items.length; i++) {
    if (items[i].category === 'supplement') {
      const itemId = items[i].id.replace(new RegExp(`-${items[i].attribute}$`, ''));
      const supplementType = supplementTypes.find((supplement) => supplement.id === itemId);
      if (!supplementType) {
        const newSupplementType = { ...items[i], id: itemId, attributes: [] };
        delete newSupplementType.attribute;
        if (items[i].attribute) {
          newSupplementType.attributes = [items[i].attribute];
        }
        supplementTypes.push(newSupplementType);
      } else {
        supplementType.attributes.push(items[i].attribute);
      }
    }
  }
  const supplementRows = supplementTypes.slice(2).map((supplement) => {
    const cartSupplement = cart.supplements.find(
      (cartSupplement) => cartSupplement.item && cartSupplement.item.key === supplement.key,
    );
    const quantity = cartSupplement ? cartSupplement.quantity : 0;
    const availableAttributes = [];
    supplement.attributes.forEach((attribute) => {
      availableAttributes.push({ value: attribute, label: attribute.toUpperCase() });
    });
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
            if (quantity) {
              cartSupplement.quantity = quantity;
              cartSupplement.attribute = value;
              const newCartSupplements = cart.supplements;
              newCartSupplements.forEach((previousCartSupplements) => {
                if (previousCartSupplements.item.id === supplement.id) {
                  previousCartSupplements.attribute = value;
                }
              });
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
          value={quantity}
          onChange={(strQuantity) => {
            let quantity = parseInt(strQuantity, 10);
            if (strQuantity === '') {
              quantity = 0;
            }
            if (Number.isInteger(quantity)) {
              if (cartSupplement) {
                cartSupplement.quantity = quantity;
                cartSupplement.isUpdated = true;
                const newCartSupplements = cart.supplements.map((previousCartSupplement) =>
                  previousCartSupplement.item.id === supplement.id ? cartSupplement : previousCartSupplement,
                );
                setCart({ ...cart, supplements: newCartSupplements });
              } else {
                const newCartSupplements = {
                  item: supplement,
                  quantity,
                };
                setCart({ ...cart, supplements: [...cart.supplements, newCartSupplements] });
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
        <Button onClick={() => setAddPlaceVisible(true)}>Ajouter une place</Button>
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
          onClick={() => alert('faites péter la carte bleue !') /*() => dispatch(cartPay(cart))*/}
          disabled={!totalPrice}>
          Payer
        </Button>
        <br />
        <Button
          rightIcon="fas fa-save"
          onClick={() => {
            //dispatch(saveCart(cart, true));
            //push('/dashboard');
            alert("c'est save !");
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
