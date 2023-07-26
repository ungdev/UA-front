'use client';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Modal from './UI/Modal';
import Button from './UI/Button';
import Input from './UI/Input';
import { API } from '@/utils/api';
import { toast } from 'react-toastify';

/**
 * A modal component for resetting a user's password.
 * @param {string} resetToken - The reset token for the user's password.
 * @returns {JSX.Element} - The ResetModal component.
 */
function ResetModal({ resetToken }: { resetToken: string }) {
  const { replace } = useRouter();
  const pathname = usePathname();
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
            return;
          }
          await API.post(`auth/reset-password/${resetToken}`, { password: newPassword });
          toast.success('Le mot de passe a été réinitialisé, tu peux maintenant te connecter.');
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
}

ResetModal.defaultProps = {
  resetToken: '',
};

export default ResetModal;
