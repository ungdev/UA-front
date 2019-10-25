import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setUserModalVisible } from '../modules/userEntry';
import { Modal } from './UI';

const ModalUser = ({ isVisible }) => {
  const dispatch = useDispatch();
  return (
    <Modal
      visible={isVisible}
      title="Utilisateur"
      onCancel={() => dispatch(setUserModalVisible(false))}
      buttons={null}
    >
      TEST
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
