import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setUserModalVisible, validatePay, saveUser, refundCart, connectAs } from '../modules/userEntry';
import { fetchTournaments } from '../modules/tournament';
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
  const isAdmin = useSelector(
    (state) => state.login.user && state.login.user.permissions && state.login.user.permissions.includes('admin'),
  );
  let hasEntryPermission = useSelector(
    (state) => state.login.user && state.login.user.permissions && state.login.user.permissions.includes('entry'),
  );
  hasEntryPermission = isAdmin || hasEntryPermission;
  const [permissions, setPermissions] = useState([]);
  const [place, setPlace] = useState('');
  const [type, setType] = useState(searchUser.type);
  const [age, setAge] = useState(searchUser.age);
  const [discordId, setDiscordId] = useState(searchUser.discordId);

  const addPermission = (permission) => {
    const permissionsUpdated = Array.from(permissions);
    permissionsUpdated.push(permission);
    setPermissions(permissionsUpdated);
  };

  const removePermission = (permission) => {
    const permissionsUpdated = Array.from(permissions);
    permissionsUpdated.splice(
      permissions.findIndex((p) => p === permission),
      2,
    );
    setPermissions(permissionsUpdated);
  };

  const displayCarts = () => {
    return searchUser.carts.map((cart) => {
      const cartItems = cart.cartItems.map((cartItem) => (
        <li key={cartItem.id}>
          {cartItem.quantity}x {cartItem.itemId /*item.name*/}{' '}
          {cartItem.attribute ? `(${cartItem.attribute.label})` : ''}
          <br />
          (Pour{' '}
          <a
            className="link-to-seller"
            onClick={async () => {
              const res = await API.get(`admin/users?page=1&username=${cartItem.forUser.username}`);
              if (res.data.users.length !== 1) {
                if (res.data.users.length) {
                  toast.error('Plusieurs utilisateurs ont ce pseudo');
                } else {
                  toast.error("Cet utilisateur n'existe pas");
                }
              }
              //searchUser = res.data;
              searchUser.username = 'salut !';
            }}>
            {cartItem.forUser.username}
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
                <strong>Prix :</strong> {cart.price}€<br />
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
            <Button onClick={() => dispatch(validatePay(searchUser.id))}>Valider le paiement</Button>
          )}
          {isAdmin && (
            <Button
              primary
              onClick={() => {
                const body = { permissions, type, discordId, age };
                if (place) {
                  body.place = place;
                }
                dispatch(saveUser(searchUser.id, body, searchUser.username));
              }}>
              Enregistrer
            </Button>
          )}
          {isAdmin && (
            <Button primary onClick={() => dispatch(connectAs(searchUser.id))}>
              Se connecter en tant que cet utilisateur
            </Button>
          )}
        </>
      }
      containerClassName="user-modal">
      <>
        <p>
          <strong>Nom :</strong> {searchUser && searchUser.lastname}
        </p>
        <p>
          <strong>Prénom :</strong> {searchUser && searchUser.firstname}
        </p>
        <p>
          <strong>Pseudo :</strong> {searchUser && searchUser.username}
        </p>
        <p>
          <strong>Email :</strong> {searchUser && searchUser.email}
        </p>
        <p>
          <strong>Équipe :</strong> {searchUser && searchUser.team && searchUser.team.name}
        </p>
        <p>
          <strong>Tournoi :</strong> {searchUser && searchUser.team && searchUser.team.tournament.name}
        </p>
        <p>(Place payée par : pas encore implémenté)</p>
        {/*searchUser && !!searchUser.forUser.length && <p>(Place payée par : {searchUser.forUser[0].userCart.email})</p>*/}
        {isAdmin && (
          <>
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
                options={permissionOptions}
              />
            ))}
            <Radio label="Type" name="type" row options={typeOptions} value={type} onChange={setType}></Radio>
            <Radio label="Âge" name="age" row options={ageOptions} value={age} onChange={setAge}></Radio>
            <Input label="Place" value={place} onChange={setPlace} />
            <Input label="Discord Id" value={discordId} onChange={setDiscordId}></Input>
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
    permissions: PropTypes.string,
    hasPaid: PropTypes.bool,
    place: PropTypes.string,
    discordId: PropTypes.string,
    team: PropTypes.object,
    forUser: PropTypes.object,
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
