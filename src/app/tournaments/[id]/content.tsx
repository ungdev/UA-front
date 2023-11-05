'use client';
import styles from './style.module.scss';
import { Button, Icon, Table, Title } from '@/components/UI';
import BoxContainer from '@/components/landing/BoxContainer';
// import FillingBar from '@/components/UI/FillingBar';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TournamentSwitcherAnimation from '@/components/landing/TournamentSwitcherAnimation';
import { useState } from 'react';
import { useAppSelector } from '@/lib/hooks';
// import Table from '@/components/UI/Table';
import { getTournamentBackgroundLink, getTournamentRulesLink } from '@/utils/uploadLink';
import { IconName } from '@/components/UI/Icon';
import logoUA from '@/../public/images/logo-notext.png';
import FillingBar from '@/components/UI/FillingBar';

export function TournamentInformation({ tournamentId, animate = true }: { tournamentId: string; animate?: boolean }) {
  const [goBack, setGoBack] = useState(false);
  const tournaments = useAppSelector((state) => state.tournament.tournaments);
  const loginAllowed = useAppSelector((state) => state.settings.login);
  const status = useAppSelector((state) => state.login.status);
  const team = useAppSelector((state) => state.team.team);

  if (!tournaments) return null;
  // TODO: Remove next line
  if (animate === undefined) animate = true;

  const tournament = tournaments!.find((tournament) => tournament.id === tournamentId);
  if (!tournament) return notFound();
  document.documentElement.style.setProperty(
    '--background-image',
    `url("${getTournamentBackgroundLink(tournament.id)}")`,
  );

  return (
    <TournamentSwitcherAnimation nextPage={goBack ? '' : undefined} previousPage={tournamentId}>
      <div className={styles.tournamentContainer}>
        <Link href="" className={styles.back}>
          <Button onClick={() => setGoBack(true)} className={styles.button}>
            <Icon name={IconName.ChevronLeft}></Icon>
            Retour aux tournois
          </Button>
        </Link>
        <div className={styles.headerContainer}>
          <div className={styles.title}>
            <img src={logoUA.src} alt="Logo UA23" />
            <Title level={1} type={1} className={styles.tournamentName}>
              {tournament.name}
            </Title>
          </div>
          {loginAllowed && (
            <Link href={getTournamentRulesLink(tournament.id)} target="_blank">
              <Button primary>Voir les règles</Button>
            </Link>
          )}
        </div>
        <div className={styles.information}>
          <BoxContainer
            className={styles.boxContainer}
            contentClassName={styles.boxContent}
            title="cashprize.txt"
            padding={false}>
            {tournament.cashprizeDetails?.split('\n').map(function (item, idx) {
              return (
                <span key={idx}>
                  {item}
                  <br />
                </span>
              );
            }) ?? (
              <>
                <strong>Cashprize :</strong> À venir
              </>
            )}
          </BoxContainer>
          <BoxContainer
            title="format.txt"
            padding={false}
            color="blue"
            className={`${styles.boxContainer} ${styles.onTop}`}
            contentClassName={styles.boxContent}>
            {tournament.maxPlayers / tournament.playersPerTeam}{' '}
            {tournament.playersPerTeam === 1 ? 'joueurs' : 'équipes'}
          </BoxContainer>
          <BoxContainer
            className={styles.boxContainer}
            contentClassName={styles.boxContent}
            title="infos.txt"
            padding={false}>
            <strong>Casteurs :</strong>{' '}
            {tournament.casters === undefined || tournament.casters === null
              ? 'À venir'
              : tournament.casters.length === 0
              ? 'Aucun caster pour ce tournoi'
              : tournament.casters?.map((caster) => caster.name + ' ')}
          </BoxContainer>
        </div>
        <Title level={3} type={1} align="center" className={styles.enrolledTeams}>
          {tournament.playersPerTeam === 1 ? 'Joueurs inscrits' : 'Équipes inscrites'} : {tournament.lockedTeamsCount} /{' '}
          {tournament.maxPlayers / tournament.playersPerTeam}
        </Title>
        {loginAllowed && status.login && status.team && (team?.lockedAt || team?.positionInQueue) && (
          <>
            <FillingBar
              fullness={animate ? (tournament.lockedTeamsCount * tournament.playersPerTeam) / tournament.maxPlayers : 0}
              className={styles.fillingBar}
            />
            <Table
              className={styles.table}
              columns={
                tournament.playersPerTeam > 1
                  ? [
                      { key: 'name', title: 'Nom de l\'équipe' },
                      // Commented for security reasons
                      //
                      // { key: 'players', title: 'Joueurs' },
                    ]
                  : [{ key: 'players', title: 'Joueurs' }]
              }
              dataSource={tournament.teams
                .filter((team) => team.lockedAt)
                .map((team) =>
                  tournament.playersPerTeam > 1
                    ? {
                        name: team.name,
                        // Commented for security reasons
                        //
                        // players: team.players.map((player) => (
                        //   <>
                        //     {player.username}
                        //     <br />
                        //   </>
                        // )),
                      }
                    : {
                        players: team.players.map((player) => (
                          <>
                            {player.username}
                            <br />
                          </>
                        )),
                      },
                )}
            />
          </>
        )}
      </div>
    </TournamentSwitcherAnimation>
  );
}
