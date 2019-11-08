import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setUserModalVisible, validatePay } from '../modules/userEntry';
import { Modal, Button, Radio, Input } from './UI';

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
  const [permission, setPermission] = useState('none');
  const [place, setPlace] = useState('');
  useEffect(() => {
    if (searchUser) {
      setPermission(searchUser.permissions || 'none');
      setPlace(searchUser.place || '');
    }
  }, [searchUser]);
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
        <p><strong>Equipe:</strong> {searchUser && searchUser.team && searchUser.team.name}</p>
        <p><strong>Tournoi:</strong> {searchUser && searchUser.team && searchUser.team.tournament.shortName}</p>
        { isAdmin && (
          <>
            <Radio
              label="Permission"
              name="permission"
              row
              options={options}
              value={permission}
              onChange={setPermission}
            />
            <Input
              label="Place"
              value={place}
              onChange={setPlace}
            />
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
