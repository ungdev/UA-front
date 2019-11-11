import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setUserModalVisible, validatePay, saveUser } from '../modules/userEntry';
import { Modal, Button, Radio, Input, Card } from './UI';
import moment from 'moment';

const options = [
  { name: 'Aucune', value: 'none' },
  { name: 'Entrée', value: 'entry' },
  { name: 'Animation', value: 'anim' },
  { name: 'Admin', value: 'admin' },
];

const ModalUser = ({ isVisible }) => {
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
        <li key={cartItem}>{cartItem.quantity}x {cartItem.item.name} {cartItem.refunded && '(remboursé)'}</li>
      ));
      const date = new Date(cart.paidAt);
      return <Card
        key={cart.transactionId}
        content={
          <>
            <p>#{cart.transactionId} {moment(date).format('DD/MM HH:mm')}</p>
            <ul>
              { cartItems }
            </ul>
            <Button>Rembourser</Button>
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
        { searchUser && !searchUser.isPaid &&
          <Button onClick={() => dispatch(validatePay(searchUser.id))}>Valider le paiement</Button>
        }
        { isAdmin && <Button primary onClick={() => dispatch(saveUser(searchUser.id, { permissions, place }, searchUser.username))}>Enregistrer</Button>}
      </>}
    >
      <>
        <p><strong>Nom:</strong> {searchUser && searchUser.lastname}</p>
        <p><strong>Prénom:</strong> {searchUser && searchUser.firstname}</p>
        <p><strong>Prénom:</strong> {searchUser && searchUser.username}</p>
        <p><strong>Email:</strong> {searchUser && searchUser.email}</p>
        <p><strong>Equipe:</strong> {searchUser && searchUser.team && searchUser.team.name}</p>
        <p><strong>Tournoi:</strong> {searchUser && searchUser.team && searchUser.team.tournament.shortName}</p>
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

ModalUser.propTypes = {
  /**
   * Is the modal visible ?
   */
  isVisible: PropTypes.bool.isRequired,
};

export default ModalUser;
