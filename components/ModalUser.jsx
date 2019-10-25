import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setUserModalVisible } from '../modules/userEntry';
import { Modal, Button } from './UI';

const ModalUser = ({ isVisible }) => {
  const dispatch = useDispatch();
  const searchUser = useSelector((state) => state.userEntry.searchUser);
  return (
    <Modal
      visible={isVisible}
      title="Utilisateur"
      onCancel={() => dispatch(setUserModalVisible(false))}
      buttons={<Button primary>Valider paiement</Button>}
    >
      <>
        <p><strong>Nom:</strong> {searchUser && searchUser.lastname}</p>
        <p><strong>Prénom:</strong> {searchUser && searchUser.firstname}</p>
        <p><strong>Email:</strong> {searchUser && searchUser.email}</p>
        <p><strong>Equipe:</strong> {searchUser && searchUser.team.name}</p>
        <p><strong>Tournoi:</strong> {searchUser && searchUser.team.tournament.name}</p>
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
