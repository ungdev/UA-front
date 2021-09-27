import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes, { instanceOf, string } from 'prop-types';

import Modal from './UI/Modal';
import Button from './UI/Button';
import Input from './UI/Input';
import { API } from '../utils/api';

const ActionParameterModal = ({ action, value }) => {
  const { pathname, replace } = useRouter();
  const [newPassword, setResetPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

  const body = {
    'pwd-reset': {
      id: 'reset-password-modal',
      isValueCorrect: () => value && value.match(/^[A-Z]{6}$/),
      title: 'Réinitialiser le mot de passe',
      content: (
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            if (newPassword !== newPasswordConfirmation) {
              toast.error('Les deux mots de passe ne sont pas identiques.');
            }
            await API.post(`auth/reset-password/${value}`, { password: newPassword });
            toast.success('Le mot de passe a été réinitialisé, vous pouvez maintenant vous connecter.');
            if (!isLoading) {
              replace(pathname);
            }
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
      ),
    },
  };

  if (!body[action] || !body[action].isValueCorrect()) {
    if (action) {
      //replace(pathname);
    }
    return null;
  }

  return (
    <Modal
      title={body[action].title}
      visible={true}
      buttons={null}
      onCancel={() => replace(pathname)}
      className={body[action].id}>
      {body[action].content}
    </Modal>
  );
};

ActionParameterModal.propTypes = {
  action: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default ActionParameterModal;
