'use client';
import styles from './style.module.scss';
import { useEffect, useState } from 'react';

import { acceptUser, deleteTeam, fetchCurrentTeam, kickUser, refuseUser, setCaptain } from '@/modules/team';

import { fetchSettings } from '@/modules/settings';
import { fetchSlots, fetchTournaments } from '@/modules/tournament';
import { Button, Helper, Icon, Modal, Table, Title } from '@/components/UI';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import type { Action } from '@reduxjs/toolkit';
import { Tournament, User, UserType } from '@/types';
import { IconName } from '@/components/UI/Icon';
import Tooltip from '@/components/UI/Tooltip';
import Link from 'next/link';
import { getTournamentRulesLink } from '@/utils/uploadLink';

const memberColumns = [
  { title: 'Pseudo', key: 'username' },
  { title: 'Role', key: 'role' },
  { title: 'A payé', key: 'hasPaid' },
];

const memberColumnsForCaptain = [...memberColumns, { title: 'Action', key: 'action' }];

const initialModal = { onOk: () => {}, visible: false, content: '', title: '' };

const Page = () => {
  const [modal, setModal] = useState(initialModal);
  const dispatch = useAppDispatch();
  const isShopAllowed = useAppSelector((state) => state.settings.shop);
  const { id, type } = useAppSelector((state) => state.login.user || { id: '', teamId: null, type: null });
  const team = useAppSelector((state) => state.team.team);
  const slotsTournament = useAppSelector((state) => state.tournament.slots);

  const isCaptain = team && team.captainId === id;
  const isSolo = team && team.name.includes('solo-team');
  const tournaments: Tournament[] | null = useAppSelector((state) => state.tournament.tournaments);

  useEffect(() => {
    isShopAllowed || dispatch(fetchSettings() as unknown as Action);
  }, []);

  useEffect(() => {
    dispatch(fetchCurrentTeam() as unknown as Action);
    const interval = setInterval(() => dispatch(fetchCurrentTeam() as unknown as Action), 120000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (team && !slotsTournament) {
      dispatch(fetchSlots() as unknown as Action);
    }
  }, [team]);

  useEffect(() => {
    if (team && !tournaments) {
      dispatch(fetchTournaments() as unknown as Action);
    }
  }, [team]);

  if (!team || !tournaments || !slotsTournament) {
    return null;
  }

  const tournament = team && tournaments && tournaments.filter((tournament) => tournament.id === team.tournamentId)[0];
  const tournamentName = tournament && tournament.name;

  const closeModal = () => setModal({ ...modal, visible: false });

  const userTypeToString = (type: UserType) => {
    switch (type) {
      case 'player':
        return 'Joueur';
      case 'coach':
        return 'Coach / Manager';
      default:
        return 'Rôle inconnu';
    }
  };

  const acceptUserButton = (user: User, teamFull: boolean) => (
    <Tooltip enabled={teamFull} tooltip={`L'équipe est déjà pleine.`}>
      <Button onClick={() => dispatch(acceptUser(user) as unknown as Action)} secondary outline disabled={teamFull}>
        Accepter
      </Button>
    </Tooltip>
  );

  const refuseUserButton = (user: User) => (
    <Button
      primary
      outline
      onClick={() =>
        setModal({
          visible: true,
          onOk: () => {
            dispatch(refuseUser(user) as unknown as Action);
            closeModal();
          },
          content: `Veux-tu refuser ${user.username} ?`,
          title: 'Refuser un joueur',
        })
      }>
      Refuser
    </Button>
  );

  const promoteUserButton = (user: User) => {
    return (
      <Button
        secondary
        outline
        onClick={() =>
          setModal({
            visible: true,
            onOk: () => {
              dispatch(setCaptain(user.id) as unknown as Action);
              closeModal();
            },
            content: "Confirme le nouveau chef d'équipe",
            title: "Changer de chef d'équipe",
          })
        }>
        Designer comme chef
      </Button>
    );
  };

  const kickUserButton = (user: User) => {
    return (
      <Button
        primary
        outline
        onClick={() =>
          setModal({
            visible: true,
            onOk: () => {
              dispatch(kickUser(user.id) as unknown as Action);
              closeModal();
            },
            content: `Confirme l'exclusion du ${
              user.type === 'player' ? 'joueur. Cette action fera perdre sa place à ton équipe.' : 'coach / manager'
            }`,
            title: `Exclure un ${user.type === 'player' ? 'joueur' : 'coach / manager'}`,
          })
        }>
        Exclure
      </Button>
    );
  };

  const actionsForUser = (user: User, asking: boolean) => {
    if (!isCaptain) return;
    if (user.id === id) return;
    const isFull = tournament!.playersPerTeam === team.players.length;
    if (asking) {
      return [acceptUserButton(user, isFull), refuseUserButton(user)];
    }
    return [promoteUserButton(user), kickUserButton(user)];
  };

  const getRow = (user: User, asking: boolean) => ({
    username: (
      <>
        {user.username}
        {user.id === team.captainId && <Icon name={IconName.Crown} className={styles.crown} fill={true} />}
      </>
    ),
    role: userTypeToString(user.type) + (asking ? ' en attente' : ''),
    hasPaid: user.hasPaid ? (
      <Icon name={IconName.Tick} className={styles.iconTick} />
    ) : (
      <Icon name={IconName.Cross} className={styles.iconCross} />
    ),
    action: isCaptain ? actionsForUser(user, asking) : undefined,
  });

  const members: Array<{ [key: string]: unknown }> = team.players
    .concat(team.coaches)
    .map((user) => getRow(user, false))
    .concat(team.askingUsers.map((user) => getRow(user, true)));

  if (team.askingUsers.length) {
    members[team.players.length + team.coaches.length]['_separation'] = true;
  }

  const confirmDeleteTeam = () =>
    setModal({
      visible: true,
      onOk: () => {
        dispatch(deleteTeam() as unknown as Action);
        closeModal();
      },
      content: "Es-tu sûr de vouloir dissoudre l'équipe ? Ton équipe perdra sa place.",
      title: "Dissoudre l'équipe",
    });

  const confirmLeaveTeam = () =>
    setModal({
      visible: true,
      onOk: () => {
        dispatch(kickUser(id) as unknown as Action);
        closeModal();
      },
      content:
        "Es-tu sûr de vouloir quitter l'équipe ?" + (type === UserType.player ? ' Ton équipe perdra sa place.' : ''),
      title: "Quitter l'équipe",
    });

  return (
    <div id="dashboard-team" className={styles.dashboardTeam}>
      <div className={styles.titleHeader}>
        <Title level={1} className={styles.primaryTitle}>
          Équipe
        </Title>
        <div>
          <Icon name={IconName.Refresh} className={styles.refresh} onClick={() => document.location.reload()} />
          <Link href={getTournamentRulesLink(tournament.id)} target="_blank">
            <Button primary>Voir les règles</Button>
          </Link>
        </div>
      </div>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          {!isSolo && (
            <div className={styles.singleInfo}>
              <strong>Mon équipe :</strong>
              <span className={styles.descriptionValue}>{team.name}</span>
            </div>
          )}
          <div className={styles.singleInfo}>
            <strong>Tournoi :</strong>
            <span className={styles.descriptionValue}>{tournamentName}</span>
          </div>
          <div className={styles.singleInfo}>
            <strong>Statut :</strong>
            <Helper>
              Pour être inscrite, une équipe doit être complète, tous les membres de l'équipe doivent avoir payé leur
              place et l'équipe doit être verrouillée.
            </Helper>
            {team.lockedAt ? (
              <>
                <Icon name={IconName.Tick} className={styles.iconTick} />
                <span className={`${styles.descriptionValue} ${styles.iconTick}`}>Inscrit</span>
              </>
            ) : team.positionInQueue ? (
              <>
                <Icon name={IconName.Caution} className={styles.iconInQueue} />
                <span className={`${styles.descriptionValue} ${styles.iconInQueue}`}>
                  Dans la file d'attente, position {team.positionInQueue}
                </span>
              </>
            ) : (
              <>
                <Icon name={IconName.Caution} className={styles.iconCaution} />
                <span className={`${styles.descriptionValue} ${styles.iconCaution}`}>Non inscrit</span>
              </>
            )}
          </div>
          <div className={styles.singleInfo}>
            <strong> {isSolo ? 'Places' : 'Equipes'} libres :</strong>{' '}
            <div
              className={
                slotsTournament[team.tournamentId].available == slotsTournament[team.tournamentId].total
                  ? styles.teamCompleted
                  : styles.descriptionValue
              }>
              {slotsTournament[team.tournamentId].available} / {slotsTournament[team.tournamentId].total}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.members}>
        <Table
          columns={isCaptain ? memberColumnsForCaptain : memberColumns}
          dataSource={members}
          alignRight
          className={styles.table}
        />
      </div>
      <div className={styles.buttonRow}>
        <Button onClick={isCaptain ? confirmDeleteTeam : confirmLeaveTeam}>
          {isCaptain ? "Dissoudre l'équipe" : "Quitter l'équipe"}
        </Button>
      </div>
      <Modal onOk={modal.onOk} onCancel={closeModal} visible={modal.visible} title={modal.title}>
        {modal.content}
      </Modal>
    </div>
  );
};

export default Page;
