'use client';
import { notFound, useParams } from 'next/navigation';
import { Button, Icon, Title } from "@/components/UI";
import BoxContainer from '@/components/landing/BoxContainer';
import FillingBar from '@/components/UI/FillingBar';
import { tournaments } from '@/lib/tournaments';
import Link from 'next/link';

export default function TournamentInformation() {
  const { id } = useParams();
  const tournament = tournaments.find((tournament) => tournament.id === id);
  if (!tournament) return notFound();
  document.documentElement.style.setProperty('--background-image', `url("${tournament.backgroundImage}")`);

  return (
    <div className="tournament-container">
      <Link href="/tournaments" className="back">
        <Button>
          <Icon name="chevron-left" fill={false} strokeWidth={3}></Icon>
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
          Casteur : {tournament.caster}
        </BoxContainer>
      </div>
      <Title level={1} align="center" className="enrolled-teams">
        Équipes inscrites : {tournament.enrolledTeams} / {tournament.maxPlayers / tournament.playersPerTeam}
      </Title>
      <FillingBar fullness={(tournament.enrolledTeams * tournament.playersPerTeam) / tournament.maxPlayers} />
    </div>
  );
}
