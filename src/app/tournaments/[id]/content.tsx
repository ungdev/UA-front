import { Button, Icon, Title } from '@/components/UI';
import BoxContainer from '@/components/landing/BoxContainer';
import FillingBar from '@/components/UI/FillingBar';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TournamentSwitcherAnimation from '@/components/landing/TournamentSwitcherAnimation';
import { useState } from 'react';
import { useAppSelector } from '@/lib/hooks';
import Table from '@/components/UI/Table';
import { getTournamentBackgroundLink } from '@/utils/uploadLink';

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
      <div className="tournament-container">
        <Link href="" className="back">
          <Button onClick={() => setGoBack(true)}>
            <Icon name="chevron-left" strokeWidth={3}></Icon>
            Retour aux tournois
          </Button>
        </Link>
        <Title level={1} className="tournament-name">
          {tournament.name}
        </Title>
        <div className="information">
          <BoxContainer className="cashprize-box" title="cashprize.txt" padding={false}>
            1ere place : 1500€ <br />
            1ere place : 1500€ <br />
            1ere place : 1500€
          </BoxContainer>
          <BoxContainer title="format.txt" padding={false} color="blue" className="on-top">
            {tournament.maxPlayers / tournament.playersPerTeam} équipes
          </BoxContainer>
          <BoxContainer title="infos.txt" padding={false}>
            Casteur : {tournament.casters?.map((caster) => caster.name + ' ')}
          </BoxContainer>
        </div>
        <Title level={1} align="center" className="enrolled-teams">
          Équipes inscrites : {tournament.lockedTeamsCount} / {tournament.maxPlayers / tournament.playersPerTeam}
        </Title>
        <FillingBar
          fullness={animate ? (tournament.lockedTeamsCount * tournament.playersPerTeam) / tournament.maxPlayers : 0}
        />
        {loginAllowed && <Table
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
        /> }
      </div>
    </TournamentSwitcherAnimation>
  );
}
