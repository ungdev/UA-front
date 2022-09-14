import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal, Button, Input, Select, Radio } from './UI'

const AddPlaceModal = ({userId, username, hasTicket, teamMembersWithoutTicket, needsAttendant, onQuit}) => {
  
  // Either 'me', 'other' or 'attendant'
  const [placeFor, setPlaceFor] = useState('');
  // The id of the person.
  // If placeFor is 'attendant', then placeId is an object with 2 values : 'firstname' and 'lastname'
  const [placeId, setPlaceId] = useState(undefined);
  
  useEffect(() => {
    if (!hasTicket) {
      setPlaceFor('me');
    } else if (teamMembersWithoutTicket.length) {
      setPlaceFor('other');
    } else if (needsAttendant) {
      setPlaceFor('attendant');
    } else {
      toast.info("Tous les membres de l'équipe ont déjà une place !");
      onQuit(undefined, undefined);
      return;
    }
  }, [])

  const canPayTo = () => {
    let canPayTo = [];
    if (!hasTicket)
      canPayTo.push({value: 'me', name: `Moi-même (${username})`});
    if (needsAttendant)
      canPayTo.push({value: 'attendant', name: 'Un accompagnateur (majeur)'});
    if (teamMembersWithoutTicket.length)
      canPayTo.push({value: 'other', name: 'Autre utilisateur'});
    return canPayTo;
  }

  useEffect(() => {
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
      setPlaceId({firstname: '', lastname: ''});
    }
  }, [placeFor]);

  if (!placeFor || placeId === undefined)
    return null;

  const addPlace = async () => {
    if (placeFor === 'attendant') {
      if (placeId.firstname == '' || placeId.lastname == '') {
        toast.error('Tu dois renseigner le prénom et le nom de ton accompagnateur.');
        return;
      }
    }
    onQuit(placeFor, placeId);
  }

	return (
    <Modal
      title="Ajouter une place"
      className="add-place-modal"
      visible={true}
      onCancel={() => onQuit(undefined, undefined)}
      buttons={<Button primary onClick={addPlace}>Ajouter</Button>}>
      <Radio
        label="Pour"
        name="for"
        options={canPayTo()}
        value={placeFor}
        onChange={setPlaceFor}
        className="add-place-input"
      />
      {placeFor === 'attendant' && (
        <>
          <Input
            label="Prénom"
            value={placeId.firstname}
            onChange={(value) => setPlaceId({...placeId, firstname: value})}
          />
          <Input
            label="Nom"
            value={placeId.lastname}
            onChange={(value) => setPlaceId({ ...placeId, lastname: value})}
          />
        </>
      )}
      {placeFor === 'other' && (
        <Select
          label="Membre"
          options={teamMembersWithoutTicket.map((member) => ({
            value: member.id,
            label: `${member.username} (${member.type === 'player' ? 'Joueur' : 'Coach'})`,
          }))}
          value={placeId}
          onChange={setPlaceId}
          className="add-place-input"
        />
      )}
    </Modal>
	)
}

export default AddPlaceModal;