import React, { useEffect, useState } from 'react';
import { validatePay, saveUser, refundCart, lookupUser } from '@/modules/users';
import { connectAs } from '@/modules/login';
import { Modal, Button, Radio, Checkbox, Input, Card, Textarea } from './../UI';

import { API } from '@/utils/api';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  Permission,
  TransactionState,
  UserAge,
  UserType,
  UserWithTeamAndMessageAndTournamentInfoAndCartsAdmin,
} from '@/types';
import type { Action } from '@reduxjs/toolkit';

const permissionOptions = [
  { name: 'Stream', value: Permission.stream.toString() },
  { name: 'Entrée', value: Permission.entry.toString() },
  { name: 'Vestiaire', value: Permission.entry.toString() },
  { name: 'Animation', value: Permission.anim.toString() },
  { name: 'Admin', value: Permission.admin.toString() },
];

const typeOptions = [
  { name: 'Joueur', value: UserType.player.toString() },
  { name: 'Organisateur', value: UserType.orga.toString() },
  { name: 'Coach', value: UserType.coach.toString() },
  { name: 'Spectateur', value: UserType.spectator.toString() },
  { name: 'Accompagnateur', value: UserType.attendant.toString() },
];

const ageOptions = [
  { name: 'Mineur', value: UserAge.child.toString() },
  { name: 'Majeur', value: UserAge.adult.toString() },
];

const UserModal = ({
  searchUser,
  onClose,
}: {
  searchUser: UserWithTeamAndMessageAndTournamentInfoAndCartsAdmin;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector((state) => state.login.user?.permissions?.includes?.(Permission.admin));
  const isAnim = useAppSelector((state) => state.login.user?.permissions?.includes?.(Permission.anim));
  const hasEntryPermission =
    useAppSelector((state) => state.login.user?.permissions?.includes?.(Permission.entry)) || isAdmin;
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [customMessage, setCustomMessage] = useState<string | null | undefined>('');
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [place, setPlace] = useState('');
  const [type, setType] = useState<UserType>();
  const [age, setAge] = useState<UserAge>();
  const [discordId, setDiscordId] = useState('');

  useEffect(() => {
    setLastname(searchUser.lastname);
    setFirstname(searchUser.firstname);
    setUsername(searchUser.username);
    setEmail(searchUser.email);
    setCustomMessage(searchUser.customMessage);
    setPermissions(searchUser.permissions);
    setPlace(searchUser.place || '');
    setType(searchUser.type);
    setAge(searchUser.age);
    setDiscordId(searchUser.discordId || '');
  }, [searchUser]);

  const addPermission = (permission: Permission) => {
    const permissionsUpdated = Array.from(permissions);
    permissionsUpdated.push(permission);
    setPermissions(permissionsUpdated);
  };

  const removePermission = (permission: Permission) => {
    const permissionsUpdated = Array.from(permissions);
    permissionsUpdated.splice(permissionsUpdated.indexOf(permission), 1);
    setPermissions(permissionsUpdated);
  };

  const displayCarts = () => {
    return searchUser.carts.map((cart) => {
      const cartItems = cart.cartItems.map((cartItem) => (
        <li key={cartItem.id}>
          {cartItem.quantity}x {cartItem.item.name}
          {/* {cartItem.attribute ? `(${cartItem.attribute.label})` : ''} */}
          <br />
          (Pour{' '}
          <a
            className="link-to-seller"
            onClick={async () => {
              const res = await API.get(`admin/users?userId=${cartItem.forUser.id}`);
              if (res.data.users.length !== 1) return toast.error("Cet utilisateur n'existe pas");
              const [targetUser] = res.data.users;
              return dispatch(lookupUser(targetUser) as unknown as Action);
            }}>
            {cartItem.forUser.username ?? `${searchUser.attendant.firstname} ${searchUser.attendant.lastname}`}
          </a>
          )
        </li>
      ));
      const date = new Date(cart.paidAt as Date);
      let transactionState = '';
      if (cart.transactionState === TransactionState.paid) transactionState = 'payé';
      if (cart.transactionState === TransactionState.refunded) transactionState = 'remboursé';
      if (cart.transactionState === TransactionState.canceled) transactionState = 'annulé';
      if (cart.transactionState === TransactionState.refused) transactionState = 'refusé';
      if (cart.transactionState === TransactionState.authorization) transactionState = "en cours d'autorisation";

      return (
        <Card
          className={`cart-${cart.transactionState}`}
          key={cart.transactionId}
          content={
            <>
              <p>
                <strong>Statut :</strong> {transactionState} (
                {cart.transactionId
                  ? `#${cart.transactionId}`
                  : cart.transactionState != TransactionState.pending
                  ? 'Paiement validé manuellement'
                  : 'En attente de paiement'}
                )<br />
                {(cart.transactionState === TransactionState.paid ||
                  cart.transactionState === TransactionState.refunded) && (
                  <>
                    <strong>Date :</strong>{' '}
                    {date.toLocaleDateString('fr-FR') +
                      ' à ' +
                      date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    <br />
                  </>
                )}
                <strong>Prix :</strong>{' '}
                {(cart.totalPrice! / 100).toLocaleString(undefined, {
                  style: 'currency',
                  currency: 'EUR',
                })}
                <br />
              </p>
              <ul className="cart-items">{cartItems}</ul>
              {cart.transactionState === TransactionState.paid && (
                <p>
                  <Button onClick={() => dispatch(refundCart(cart.id) as unknown as Action)}>Rembourser</Button>
                </p>
              )}
            </>
          }
        />
      );
    });
  };

  return (
    <Modal
      visible={true}
      title="Utilisateur"
      onCancel={onClose}
      buttons={
        <>
          {hasEntryPermission && searchUser && !searchUser.hasPaid && (
            <Button
              onClick={() => dispatch(validatePay(searchUser.id) as unknown as Action)}
              disabled={!searchUser.type}>
              Valider le paiement
            </Button>
          )}
          {(isAdmin || isAnim) && (
            <Button
              primary
              onClick={() => {
                const body = {
                  discordId: discordId || null,
                  age,
                  place: place || null,
                  username,
                  lastname,
                  firstname,
                  email,
                  customMessage,
                  type: undefined as UserType | undefined,
                  permissions: undefined as Permission[] | undefined,
                };
                if (type) body.type = type;
                if (isAdmin) body.permissions = permissions;
                dispatch(
                  saveUser(searchUser.id, body, searchUser.username ?? searchUser.firstname) as unknown as Action,
                );
              }}>
              Enregistrer
            </Button>
          )}
          {isAdmin && (
            <Button
              primary
              onClick={() => dispatch(connectAs(searchUser.id) as unknown as Action)}
              disabled={searchUser.type === UserType.attendant}>
              Se connecter en tant que cet utilisateur
            </Button>
          )}
        </>
      }
      containerClassName="user-modal">
      <>
        <Input label="Nom" value={lastname} onChange={setLastname} disabled={!isAdmin && !isAnim} />
        <Input label="Prénom" value={firstname} onChange={setFirstname} disabled={!isAdmin && !isAnim} />
        {searchUser.type !== UserType.attendant && (
          <>
            <Input label="Pseudo" value={username} onChange={setUsername} disabled={!isAdmin && !isAnim} />
            <Input label="Email" value={email} onChange={setEmail} disabled={!isAdmin && !isAnim} />
            <Textarea
              label="Infos complémentaires"
              value={customMessage ?? ''}
              onChange={setCustomMessage}
              disabled={!isAdmin && !isAnim}
            />
            <p>
              <strong>Équipe :</strong>{' '}
              {searchUser?.team?.name ?? (
                <>
                  <em className="default">N'a pas encore d'équipe</em>
                </>
              )}
            </p>
            <p>
              <strong>Tournoi :</strong>{' '}
              {searchUser?.team?.tournament?.name ?? (
                <>
                  <em className="default">N'est pas encore inscrit à un tournoi</em>
                </>
              )}
            </p>
            {searchUser.attendant && (
              <>
                <p>
                  <strong>Accompagnateur :</strong> {searchUser.attendant.firstname} {searchUser.attendant.lastname}
                </p>
              </>
            )}
          </>
        )}
        {isAdmin && (
          <>
            <div className="row">
              <div className="key">Permissions :</div>
              <div className="checkbox-container">
                {permissionOptions.map((option) => (
                  <Checkbox
                    key={option.value}
                    label={option.name}
                    value={
                      permissions.find((permission) => permission === (option.value as unknown as Permission)) != null
                    }
                    onChange={(v) => {
                      if (v) {
                        addPermission(option.value as unknown as Permission);
                      } else {
                        removePermission(option.value as unknown as Permission);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        )}
        {(isAnim || isAdmin) && (
          <>
            <Radio
              label="Type"
              name="type"
              row
              options={typeOptions}
              value={type?.toString()}
              onChange={(v) => setType(v as unknown as UserType)}
              disabled={searchUser.hasPaid}></Radio>
            <Radio
              label="Âge"
              name="age"
              row
              options={ageOptions}
              value={age?.toString()}
              onChange={(v) => setAge(v as unknown as UserAge)}
              disabled={
                searchUser.type === UserType.attendant ||
                (searchUser.hasPaid && searchUser.age === UserAge.child && searchUser.attendant != null)
              }></Radio>
            {searchUser.type !== UserType.attendant && (
              <>
                <Input label="Place" value={place} onChange={setPlace} />
                <Input label="Discord Id" value={discordId} onChange={setDiscordId}></Input>
              </>
            )}
          </>
        )}
        {isAdmin && searchUser && displayCarts()}
      </>
    </Modal>
  );
};

UserModal.defaultProps = {
  onClose: undefined,
};

export default UserModal;
