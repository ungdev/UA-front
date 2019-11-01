import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setUserModalVisible, validatePay } from '../modules/userEntry';
import { Modal, Button } from './UI';

const ModalUser = ({ isVisible }) => {
  const dispatch = useDispatch();
  const searchUser = useSelector((state) => state.userEntry.searchUser);
  const isAdmin = useSelector((state) => state.login.user && state.login.user.permissions && state.login.user.permissions.includes('admin'));
  return (
    <Modal
      visible={isVisible}
      title="Utilisateur"
      onCancel={() => dispatch(setUserModalVisible(false))}
      buttons={<>
        <Button onClick={() => dispatch(validatePay(searchUser.id))}>Valider le paiement</Button>
        { isAdmin && <Button primary>Enregistrer</Button>}
      </>}
    >
      <>
        <p><strong>Nom:</strong> {searchUser && searchUser.lastname}</p>
        <p><strong>Prénom:</strong> {searchUser && searchUser.firstname}</p>
        <p><strong>Prénom:</strong> {searchUser && searchUser.username}</p>
        <p><strong>Email:</strong> {searchUser && searchUser.email}</p>
        <p><strong>Equipe:</strong> {searchUser && searchUser.team.name}</p>
        <p><strong>Tournoi:</strong> {searchUser && searchUser.team.tournament.shortName}</p>
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
