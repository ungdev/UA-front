import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import Modal from './UI/Modal';
import Button from './UI/Button';
import Input from './UI/Input';
import { API } from '../utils/api';
import { toast } from 'react-toastify';

const ResetModal = ({ resetToken }) => {
  const { pathname, replace } = useRouter();
  const [newPassword, setResetPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

  return (
    <Modal
      title="Réinitialiser le mot de passe"
      visible={true}
      buttons={null}
      onCancel={() => replace(pathname)}
      className="reset-password-modal">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (newPassword !== newPasswordConfirmation) {
            toast.error('Les deux mots de passe ne sont pas identiques.');
          }
          await API.post(`auth/reset-password/${resetToken}`, { password: newPassword });
          toast.success('Le mot de passe a été réinitialisé, vous pouvez maintenant vous connecter.');
          replace(pathname);
        }}>
        <Input
          label="Mot de passe"
          value={newPassword}
          onChange={setResetPassword}
          type="password"
          autocomplete="password"
        />
        <Input
          label="Confirmer le mot de passe"
          value={newPasswordConfirmation}
          onChange={setNewPasswordConfirmation}
          type="password"
          autocomplete="new-password"
        />

        <Button className="new-password-modal-button" primary type="submit">
          Envoyer
        </Button>
      </form>
    </Modal>
  );
};

ResetModal.propTypes = {
  resetToken: PropTypes.string.isRequired,
};

export default ResetModal;
