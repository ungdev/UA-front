import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { validatePay, saveUser, refundCart, lookupUser } from '../modules/users';
import { connectAs } from '../modules/login';
import { Modal, Button, Radio, Checkbox, Input, Card } from './UI';
import moment from 'moment';
import { API } from '../utils/api';
import { toast } from 'react-toastify';

const permissionOptions = [
  { name: 'Stream', value: 'stream' },
  { name: 'Entrée', value: 'entry' },
  { name: 'Animation', value: 'anim' },
  { name: 'Admin', value: 'admin' },
];

const typeOptions = [
  { name: 'Joueur', value: 'player' },
  { name: 'Organisateur', value: 'orga' },
  { name: 'Coach', value: 'coach' },
  { name: 'Spectateur', value: 'spectator' },
  { name: 'Accompagnateur', value: 'attendant' },
];

const ageOptions = [
  { name: 'Mineur', value: 'child' },
  { name: 'Majeur', value: 'adult' },
];

const UserModal = ({ searchUser, onClose }) => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.login.user?.permissions?.includes?.('admin'));
  let hasEntryPermission = useSelector((state) => state.login.user?.permissions?.includes?.('entry')) || isAdmin;
  const [permissions, setPermissions] = useState([]);
  const [place, setPlace] = useState('');
  const [type, setType] = useState();
  const [age, setAge] = useState();
  const [discordId, setDiscordId] = useState('');

  useEffect(() => {
    setPermissions(searchUser.permissions);
    setPlace(searchUser.place || '');
    setType(searchUser.type);
    setAge(searchUser.age);
    setDiscordId(searchUser.discordId || '');
  }, [searchUser]);

  const addPermission = (permission) => {
    const permissionsUpdated = Array.from(permissions);
    permissionsUpdated.push(permission);
    setPermissions(permissionsUpdated);
  };

  const removePermission = (permission) => {
    const permissionsUpdated = Array.from(permissions);
    permissionsUpdated.splice(permissionsUpdated.indexOf(permission), 1);
    setPermissions(permissionsUpdated);
  };

  const displayCarts = () => {
    return searchUser.carts.map((cart) => {
      const cartItems = cart.cartItems.map((cartItem) => (
        <li key={cartItem.id}>
          {cartItem.quantity}x {cartItem.item.name} {cartItem.attribute ? `(${cartItem.attribute.label})` : ''}
          <br />
          (Pour{' '}
          <a
            className="link-to-seller"
            onClick={async () => {
              const res = await API.get(`admin/users?userId=${cartItem.forUser.id}`);
              if (res.data.users.length !== 1) return toast.error("Cet utilisateur n'existe pas");
              const [targetUser] = res.data.users;
              return dispatch(lookupUser(targetUser));
            }}>
            {cartItem.forUser.username ?? `${searchUser.attendant.firstname} ${searchUser.attendant.lastname}`}
          </a>
          )
        </li>
      ));
      const date = new Date(cart.paidAt);
      let transactionState = '';
      if (cart.transactionState === 'paid') transactionState = 'payé';
      if (cart.transactionState === 'refunded') transactionState = 'remboursé';
      if (cart.transactionState === 'canceled') transactionState = 'annulé';
      if (cart.transactionState === 'refused') transactionState = 'refusé';

      return (
        <Card
          className={`cart-${cart.transactionState}`}
          key={cart.transactionId}
          content={
            <>
              <p>
                <strong>Statut :</strong> {transactionState} (
                {cart.transactionId ? `#${cart.transactionId}` : 'Paiement validé manuellement'})<br />
                {(cart.transactionState === 'paid' || cart.transactionState === 'refunded') && (
                  <>
                    <strong>Date :</strong> {moment(date).format('DD/MM/YY [à] HH:mm')}
                    <br />
                  </>
                )}
                <strong>Prix :</strong>{' '}
                {(cart.totalPrice / 100).toLocaleString(undefined, {
                  style: 'currency',
                  currency: 'EUR',
                })}
                <br />
              </p>
              <ul className="cart-items">{cartItems}</ul>
              {cart.transactionState === 'paid' && (
                <p>
                  <Button onClick={() => dispatch(refundCart(cart.id))}>Rembourser</Button>
                </p>
              )}
            </>
          }
        />
      );
    });
  };

  return (
    <Modal
      visible={true}
      title="Utilisateur"
      onCancel={onClose}
      buttons={
        <>
          {hasEntryPermission && searchUser && !searchUser.hasPaid && (
            <Button
              onClick={() => {
                dispatch(validatePay(searchUser.id));
                API.get(`admin/users/${searchUser.id}/carts`).then((res) => {
                  searchUser.carts = res.data;
                });
              }}>
              Valider le paiement
            </Button>
          )}
          {isAdmin && (
            <Button
              primary
              onClick={() => {
                const body = { permissions, type, discordId: discordId || null, age, place: place || null };
                dispatch(saveUser(searchUser.id, body, searchUser.username ?? searchUser.firstname));
              }}>
              Enregistrer
            </Button>
          )}
          {isAdmin && (
            <Button
              primary
              onClick={() => dispatch(connectAs(searchUser.id))}
              disabled={searchUser.type === 'attendant'}>
              Se connecter en tant que cet utilisateur
            </Button>
          )}
        </>
      }
      containerClassName="user-modal">
      <>
        <p>
          <strong>Nom :</strong> {searchUser?.lastname}
        </p>
        <p>
          <strong>Prénom :</strong> {searchUser?.firstname}
        </p>
        {searchUser.type !== 'attendant' && (
          <>
            <p>
              <strong>Pseudo :</strong> {searchUser?.username}
            </p>
            <p>
              <strong>Email :</strong> {searchUser?.email}
            </p>
            <p>
              <strong>Équipe :</strong>{' '}
              {searchUser?.team?.name ?? (
                <>
                  <em className="default">N'a pas encore d'équipe</em>
                </>
              )}
            </p>
            <p>
              <strong>Tournoi :</strong>{' '}
              {searchUser?.team?.tournament?.name ?? (
                <>
                  <em className="default">N'est pas encore inscrit à un tournoi</em>
                </>
              )}
            </p>
            {searchUser.attendant && (
              <>
                <p>
                  <strong>Accompagnateur :</strong> {searchUser.attendant.firstname} {searchUser.attendant.lastname}
                </p>
              </>
            )}
          </>
        )}
        {isAdmin && (
          <>
            <div className="row">
              <div className="key">Permissions :</div>
              <div className="checkbox-container">
                {permissionOptions.map((option) => (
                  <Checkbox
                    key={option.value}
                    label={option.name}
                    value={permissions.find((permission) => permission === option.value)}
                    onChange={(v) => {
                      if (v) {
                        addPermission(option.value);
                      } else {
                        removePermission(option.value);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
            <Radio
              label="Type"
              name="type"
              row
              options={typeOptions}
              value={type}
              onChange={setType}
              disabled={searchUser.type === 'attendant'}></Radio>
            <Radio
              label="Âge"
              name="age"
              row
              options={ageOptions}
              value={age}
              onChange={setAge}
              disabled={
                searchUser.type === 'attendant' ||
                (searchUser.hasPaid && searchUser.age === 'child' && searchUser.attendant != null)
              }></Radio>
            {searchUser.type !== 'attendant' && (
              <>
                <Input label="Place" value={place} onChange={setPlace} />
                <Input label="Discord Id" value={discordId} onChange={setDiscordId}></Input>
              </>
            )}
            {searchUser && displayCarts()}
          </>
        )}
      </>
    </Modal>
  );
};

UserModal.propTypes = {
  /**
   * The user we have to display information about
   */
  searchUser: PropTypes.shape({
    id: PropTypes.string,
    lastname: PropTypes.string,
    firstname: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    type: PropTypes.string,
    age: PropTypes.string,
    attendant: PropTypes.object,
    permissions: PropTypes.arrayOf(PropTypes.string),
    hasPaid: PropTypes.bool,
    place: PropTypes.string,
    discordId: PropTypes.string,
    team: PropTypes.object,
    carts: PropTypes.object,
  }).isRequired,
  /**
   * The callback function to call when the modal is closed
   */
  onClose: PropTypes.func,
};

UserModal.defaultProps = {
  onClose: undefined,
};

export default UserModal;
