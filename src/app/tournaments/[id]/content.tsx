'use client';
import styles from './style.module.scss';
import { Button, Icon, Title } from '@/components/UI';
import BoxContainer from '@/components/landing/BoxContainer';
import FillingBar from '@/components/UI/FillingBar';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TournamentSwitcherAnimation from '@/components/landing/TournamentSwitcherAnimation';
import { useState } from 'react';
import { useAppSelector } from '@/lib/hooks';
import Table from '@/components/UI/Table';
import { getTournamentBackgroundLink, getTournamentRulesLink } from '@/utils/uploadLink';
import { IconName } from '@/components/UI/Icon';
import logoUA from '@/../public/images/logo-notext.png';

export function TournamentInformation({ tournamentId, animate = true }: { tournamentId: string; animate?: boolean }) {
  const [goBack, setGoBack] = useState(false);
  const tournaments = useAppSelector((state) => state.tournament.tournaments);
  const loginAllowed = useAppSelector((state) => state.settings.login);

  if (!tournaments) return null;

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
            <Icon name={IconName.ChevronLeft} strokeWidth={3}></Icon>
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
          <Link href={getTournamentRulesLink(tournament.id)} target="_blank">
            <Button primary>Voir les règles</Button>
          </Link>
        </div>
        <div className={styles.information}>
          <BoxContainer className={styles.boxContainer} title="cashprize.txt" padding={false}>
            <div className={styles.boxContent}>{tournament.cashprizeDetails ?? 'Annonce à venir'}</div>
          </BoxContainer>
          <BoxContainer
            title="format.txt"
            padding={false}
            color="blue"
            className={`${styles.boxContainer} ${styles.onTop}`}>
            <div className={styles.boxContent}>{tournament.maxPlayers / tournament.playersPerTeam} équipes</div>
          </BoxContainer>
          <BoxContainer className={styles.boxContainer} title="infos.txt" padding={false}>
            <div className={styles.boxContent}>
              Casteur :{' '}
              {tournament.casters === undefined || tournament.casters === null
                ? 'À venir'
                : tournament.casters.length === 0
                ? 'Aucun caster pour ce tournoi'
                : tournament.casters?.map((caster) => caster.name + ' ')}
            </div>
          </BoxContainer>
        </div>
        <Title level={3} type={1} align="center" className={styles.enrolledTeams}>
          {tournament.playersPerTeam === 1 ? 'Joueurs inscrits' : 'Équipes inscrites'} : {tournament.lockedTeamsCount} /{' '}
          {tournament.maxPlayers / tournament.playersPerTeam}
        </Title>
        <FillingBar
          fullness={animate ? (tournament.lockedTeamsCount * tournament.playersPerTeam) / tournament.maxPlayers : 0}
          className={styles.fillingBar}
        />
        {loginAllowed && (
          <Table
            className={styles.table}
            columns={[
              { key: 'name', title: 'Nom' },
              { key: 'players', title: 'Joueurs' },
            ]}
            dataSource={tournament.teams
              .filter((team) => team.lockedAt)
              .map((team) => ({
                name: team.name,
                players: team.players.map((player) => (
                  <>
                    {player.username}
                    <br />
                  </>
                )),
              }))}
          />
        )}
      </div>
    </TournamentSwitcherAnimation>
  );
}
