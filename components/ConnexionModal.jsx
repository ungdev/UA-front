import React from 'react';
import Modal from './UI/Modal';
import Button from './UI/Button';

const ConnexionModal = ({ onClose, isVisible }) => (
  <Modal
    title="Connexion"
    visible={isVisible}
    onCancel={onClose}
    footer={<Button primary onClick={onClose}>Fermer</Button>}
  >
    Les inscriptions ouvriront bientôt,
    suivez-nous sur les réseaux sociaux pour ne rien rater !
  </Modal>
);

export default ConnexionModal;
