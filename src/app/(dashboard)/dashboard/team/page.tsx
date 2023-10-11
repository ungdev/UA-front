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
  const { id, teamId } = useAppSelector((state) => state.login.user || { id: '', teamId: null });
  const team = useAppSelector((state) => state.team.team);
  const slotsTournament = useAppSelector((state) => state.tournament.slots);

  const isCaptain = team && team.captainId === id;
  const isSolo = team && team.name.includes('solo-team');
  const tournaments: Tournament[] | null = useAppSelector((state) => state.tournament.tournaments);

  useEffect(() => {
    isShopAllowed || dispatch(fetchSettings() as unknown as Action);
  }, []);

  useEffect(() => {
    if (!team && teamId) {
      dispatch(fetchCurrentTeam() as unknown as Action);
    } else {
      const interval = setInterval(() => dispatch(fetchCurrentTeam() as unknown as Action), 120000);
      return () => clearInterval(interval);
    }
  }, [team]);

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

  if (!team || !tournaments) {
    return null;
  }

  const tournament = team && tournaments && tournaments.filter((tournament) => tournament.id === team.tournamentId)[0];
  const tournamentName = tournament && tournament.name;

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
    <Button onClick={() => dispatch(acceptUser(user) as unknown as Action)} primary disabled={teamFull}>
      Accepter
    </Button>
  );

  const refuseUserButton = (user: User) => (
    <Button
      className={styles.refuseButton}
      onClick={() =>
        setModal({
          visible: true,
          onOk: () => {
            dispatch(refuseUser(user) as unknown as Action);
            setModal(initialModal);
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
        onClick={() =>
          setModal({
            visible: true,
            onOk: () => {
              dispatch(setCaptain(user.id) as unknown as Action);
              setModal(initialModal);
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
        onClick={() =>
          setModal({
            visible: true,
            onOk: () => {
              dispatch(kickUser(user.id) as unknown as Action);
              setModal(initialModal);
            },
            content: "Confirme l'exclusion du coach / manager",
            title: 'Exclure un coach / manager',
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
        {user.id === team.captainId && <Icon name={IconName.Crown} />}
      </>
    ),
    role: userTypeToString(user.type) + (asking ? ' en attente' : ''),
    hasPaid: user.hasPaid ? <Icon name={IconName.Tick} /> : <Icon name={IconName.Cross} />,
    action: isCaptain ? actionsForUser(user, asking) : undefined,
  });

  const members = team.players
    .concat(team.coaches)
    .map((user) => getRow(user, false))
    .concat(team.askingUsers.map((user) => getRow(user, true)));

  const confirmDeleteTeamModal = () =>
    setModal({
      visible: true,
      onOk: () => {
        dispatch(deleteTeam() as unknown as Action);
        setModal(initialModal);
      },
      content: "Es-tu sûr de vouloir dissoudre l'équipe ?",
      title: "Dissoudre l'équipe",
    });

  const confirmLeaveTeamModal = () =>
    setModal({
      visible: true,
      onOk: () => {
        dispatch(kickUser(id) as unknown as Action);
        setModal(initialModal);
      },
      content: "Es-tu sûr de vouloir quitter l'équipe ?",
      title: "Quitter l'équipe",
    });

  return (
    <div id="dashboard-team" className={styles.dashboardTeam}>
      <Title level={1} align="center" className={styles.primaryTitle}>
        Équipe
      </Title>
      <Title level={2} type={2} className={styles.secondaryTitle}>
        Description
      </Title>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <div>
            {!isSolo && (
              <div>
                <strong>Mon équipe :</strong>
                <div className={styles.descriptionValue}>{team.name}</div>
              </div>
            )}
            <div>
              <strong>Tournoi :</strong>
              <div className={styles.descriptionValue}>{tournamentName}</div>
            </div>
          </div>
          <div>
            {isShopAllowed && (
              <>
                <div>
                  <strong>Statut :</strong>
                  <Helper>
                    Pour être inscrite, une équipe doit être complète, tous les membres de l'équipe doivent avoir payé
                    leur place et l'équipe doit être verrouillée.
                  </Helper>
                  {team.lockedAt ? (
                    <>
                      <Icon name={IconName.Tick} className={styles.iconTick} />
                      <div className={styles.descriptionValue}>Inscrit</div>
                    </>
                  ) : (
                    <>
                      <Icon name={IconName.Caution} className={styles.iconCaution} />
                      <div className={styles.descriptionValue}>Non inscrit</div>
                    </>
                  )}
                </div>
                {slotsTournament && (
                  <div>
                    <strong> {isSolo ? 'Places' : 'Equipes'} occupées :</strong>{' '}
                    <div
                      className={
                        slotsTournament[team.tournamentId].available == slotsTournament[team.tournamentId].total
                          ? styles.teamCompleted
                          : styles.descriptionValue
                      }>
                      {slotsTournament[team.tournamentId].available} / {slotsTournament[team.tournamentId].total}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div onClick={() => document.location.reload()}>
          <Icon name={IconName.Refresh} />
        </div>
      </div>
      <div className={styles.playersList}>
        <Title level={2} type={2} className={styles.secondaryTitle}>
          Membres
        </Title>
        <Table
          columns={isCaptain ? memberColumnsForCaptain : memberColumns}
          dataSource={members}
          alignRight
          className={styles.tablePlayers}
        />
      </div>
      <div className={styles.buttonRow}>
        <Button onClick={isCaptain ? confirmDeleteTeamModal : confirmLeaveTeamModal}>
          {isCaptain ? "Dissoudre l'équipe" : "Quitter l'équipe"}
        </Button>
      </div>
      <Modal
        onOk={modal.onOk}
        onCancel={() => setModal({ ...initialModal, visible: false })}
        visible={modal.visible}
        title={modal.title}>
        {modal.content}
      </Modal>
    </div>
  );
};

export default Page;
