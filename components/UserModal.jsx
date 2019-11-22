import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setUserModalVisible, validatePay, saveUser, refundCart } from '../modules/userEntry';
import { Modal, Button, Radio, Input, Card } from './UI';
import moment from 'moment';

import './UserModal.css';

const options = [
  { name: 'Aucune', value: 'none' },
  { name: 'Entrée', value: 'entry' },
  { name: 'Animation', value: 'anim' },
  { name: 'Admin', value: 'admin' },
];

const UserModal = ({ isVisible }) => {
  const dispatch = useDispatch();
  const searchUser = useSelector((state) => state.userEntry.searchUser);
  const isAdmin = useSelector((state) => state.login.user && state.login.user.permissions && state.login.user.permissions.includes('admin'));
  const [permissions, setPermissions] = useState('none');
  const [place, setPlace] = useState('');

  useEffect(() => {
    if (searchUser) {
      setPermissions(searchUser.permissions || 'none');
      setPlace(searchUser.place || '');
    }
  }, [searchUser]);

  const displayCarts = () => {
    return searchUser.carts.map((cart) => {
      const cartItems = cart.cartItems.map((cartItem) => (
        <li key={cartItem.id}>
            {cartItem.quantity}x {cartItem.item.name}<br />
            (Pour {cartItem.forUser.email})
        </li>
      ));
      const date = new Date(cart.paidAt);
      let transactionState = '';
      if (cart.transactionState === 'paid') transactionState = 'payé';
      if (cart.transactionState === 'refunded') transactionState = 'remboursé';
      if (cart.transactionState === 'canceled') transactionState = 'annulé';
      if (cart.transactionState === 'refused') transactionState = 'refusé';

      return <Card
        key={cart.transactionId}
        content={
          <>
            <p>
              <strong>Statut :</strong> {transactionState}<br />
              <strong>Date : </strong>{moment(date).format('DD/MM/YY [à] HH:mm')}<br />
              {cart.transactionId && `Transaction n° ${cart.transactionId}`}
            </p>
            <ul>
              { cartItems }
            </ul>
            {cart.transactionState === 'paid' && <p><Button onClick={() => dispatch(refundCart(cart.id))}>Rembourser</Button></p>}
          </>
        }
      />;
    });
  };

  return (
    <Modal
      visible={isVisible}
      title="Utilisateur"
      onCancel={() => dispatch(setUserModalVisible(false))}
      buttons={<>
        { isAdmin && searchUser && !searchUser.isPaid &&
          <Button onClick={() => dispatch(validatePay(searchUser.id))}>Valider le paiement</Button>
        }
        { isAdmin && <Button primary onClick={() => dispatch(saveUser(searchUser.id, { permissions, place }, searchUser.username))}>Enregistrer</Button>}
      </>}
      containerClassName="user-modal"
    >
      <>
        <p><strong>Nom :</strong> {searchUser && searchUser.lastname}</p>
        <p><strong>Prénom :</strong> {searchUser && searchUser.firstname}</p>
        <p><strong>Pseudo :</strong> {searchUser && searchUser.username}</p>
        <p><strong>Email :</strong> {searchUser && searchUser.email}</p>
        <p><strong>Équipe :</strong> {searchUser && searchUser.team && searchUser.team.name}</p>
        <p><strong>Tournoi :</strong> {searchUser && searchUser.team && searchUser.team.tournament.shortName}</p>
        { searchUser && !!searchUser.forUser.length &&
        <p>(Place payée par : {searchUser.forUser[0].userCart.email})</p>}
        { isAdmin && (
          <>
            <Radio
              label="Permission"
              name="permission"
              row
              options={options}
              value={permissions}
              onChange={setPermissions}
            />
            <Input
              label="Place"
              value={place}
              onChange={setPlace}
            />
            { searchUser && displayCarts() }
          </>
        )}
      </>
    </Modal>
  );
};

UserModal.propTypes = {
  /**
   * Is the modal visible ?
   */
  isVisible: PropTypes.bool.isRequired,
};

export default UserModal;
