import styles from './AddPlaceModal.module.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, Button, Select, Radio } from '@/components/UI';
import { UserType, User } from '@/types';

/** The add place modal */
const AddPlaceModal = ({
  userId,
  username,
  hasTicket,
  teamMembersWithoutTicket,
  onQuit,
}: {
  /** The user id */
  userId: string;
  /** The user username */
  username: string;
  /** If the user has a ticket */
  hasTicket: boolean;
  /** The team members without ticket */
  teamMembersWithoutTicket: User[];
  /** The function to call when the user quits the modal */
  onQuit: (placeFor: string, placeId: string) => void;
}) => {
  // Either 'me' or 'other'
  const [placeFor, setPlaceFor] = useState('');
  // The id of the person.
  const [placeId, setPlaceId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!hasTicket) {
      setPlaceFor('me');
    } else if (teamMembersWithoutTicket.length) {
      setPlaceFor('other');
    } else {
      // We should never get there. But imagine there is a bug on the website... just imagine...
      toast.info("Tous les membres de l'équipe ont déjà une place !");
      onQuit('', '');
      return;
    }
  }, []);

  const canPayTo = () => {
    const canPayTo = [];
    if (!hasTicket) canPayTo.push({ value: 'me', name: `Moi-même (${username})` });
    if (teamMembersWithoutTicket.length) canPayTo.push({ value: 'other', name: 'Autre utilisateur' });
    return canPayTo;
  };

  useEffect(() => {
    if (!placeFor) return;
    if (placeFor === 'me') {
      setPlaceId(userId);
    } else if (placeFor === 'other') {
      if (!teamMembersWithoutTicket.length) {
        toast.warn("Une erreur inattendue s'est produite. Si elle se produit en continue, contacte le support");
        setPlaceFor('me');
        return;
      }
      setPlaceId(teamMembersWithoutTicket[0].id);
    }
  }, [placeFor]);

  if (!placeFor || placeId === undefined) return null;

  const nextStep = async () => {
    return addPlace();
  };

  const addPlace = async () => {
    onQuit(placeFor, placeId as string);
  };

  return (
    <Modal
      title="Ajouter une place"
      className={styles.addPlaceModal}
      visible={true}
      onCancel={() => onQuit('', '')}
      buttons={
        <Button primary onClick={nextStep}>
          Ajouter
        </Button>
      }>
      <Radio
        label="Pour"
        name="for"
        options={canPayTo()}
        value={placeFor}
        onChange={setPlaceFor}
        className={styles.addPlaceInput}
      />
      {placeFor === 'other' && (
        <Select
          label="Membre"
          options={teamMembersWithoutTicket.map((member) => ({
            value: member.id,
            label: `${member.username} (${member.type === UserType.player ? 'Joueur' : 'Coach'})`,
          }))}
          value={placeId as string}
          onChange={setPlaceId}
          className={styles.addPlaceModal}
        />
      )}
    </Modal>
  );
};

export default AddPlaceModal;
