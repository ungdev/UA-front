import styles from './AddPlaceModal.module.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, Button, Input, Select, Radio } from '../UI';
import { useAppSelector } from '@/lib/hooks';
import { UserType, AttendantInfo, User } from '@/types';

/** The add place modal */
const AddPlaceModal = ({
  userId,
  username,
  hasTicket,
  teamMembersWithoutTicket,
  needsAttendant,
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
  /** If the user needs an attendant */
  needsAttendant: boolean;
  /** The function to call when the user quits the modal */
  onQuit: (placeFor: string, placeId: string | AttendantInfo) => void;
}) => {
  // Either 'me', 'other' or 'attendant'
  const [placeFor, setPlaceFor] = useState('');
  // The id of the person.
  // If placeFor is 'attendant', then placeId is an object with 2 values : 'firstname' and 'lastname'
  const [placeId, setPlaceId] = useState<AttendantInfo | string | undefined>(undefined);
  // The place step 0 for regular modal, 1 for text confirmation modal
  const [step, setStep] = useState(0);
  // The user type
  const userType = useAppSelector((state) => state.login.user && state.login.user.type);

  useEffect(() => {
    if (!hasTicket) {
      setPlaceFor('me');
    } else if (needsAttendant) {
      setPlaceFor('attendant');
    } else if (teamMembersWithoutTicket.length) {
      setPlaceFor('other');
    } else {
      toast.info("Tous les membres de l'équipe ont déjà une place !");
      onQuit('', '');
      return;
    }
  }, []);

  const canPayTo = () => {
    const canPayTo = [];
    if (!hasTicket) canPayTo.push({ value: 'me', name: `Moi-même (${username})` });
    if (needsAttendant) canPayTo.push({ value: 'attendant', name: 'Un accompagnateur (majeur)' });
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
    } else {
      setPlaceId({ firstname: '', lastname: '' });
    }
  }, [placeFor]);

  if (!placeFor || placeId === undefined) return null;

  const nextStep = async () => {
    if (!(placeFor === 'me') || userType !== UserType.spectator || step) {
      setStep(0);
      return addPlace();
    }
    setStep(step + 1);
  };

  const addPlace = async () => {
    if (placeFor === 'attendant') {
      if ((placeId as AttendantInfo).firstname == '' || (placeId as AttendantInfo).lastname == '') {
        toast.error('Tu dois renseigner le prénom et le nom de ton accompagnateur.');
        return;
      }
    }
    onQuit(placeFor, placeId);
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
      {!step ? (
        <>
          <Radio
            label="Pour"
            name="for"
            options={canPayTo()}
            value={placeFor}
            onChange={setPlaceFor}
            className={styles.addPlaceInput}
          />
          {placeFor === 'attendant' && (
            <>
              <Input
                label="Prénom"
                value={(placeId as AttendantInfo).firstname}
                onChange={(value) => setPlaceId({ ...(placeId as AttendantInfo), firstname: value })}
              />
              <Input
                label="Nom"
                value={(placeId as AttendantInfo).lastname}
                onChange={(value) => setPlaceId({ ...(placeId as AttendantInfo), lastname: value })}
              />
            </>
          )}
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
        </>
      ) : (
        <>
          En prenant une place spectateur, vous acceptez de devoir quitter l'enceinte de l'UTT Arena du samedi 3
          décembre à 23h59 au dimanche 4 décembre à 9h, et de pouvoir accéder à tous les espaces de l'UTT Arena, excepté
          les espaces reservés aux joueurs.
        </>
      )}
    </Modal>
  );
};

export default AddPlaceModal;
