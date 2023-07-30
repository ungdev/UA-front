'use client';
import { useParams } from 'next/navigation';
import Partners from '@/components/Partners';
import { Title } from '@/components/UI';
import BoxContainer from '@/components/landing/BoxContainer';
import FillingBar from '@/components/UI/FillingBar';
import { tournaments } from '@/lib/tournaments';
import constellation1 from '@/../public/images/clouds/constellation-1.png';
import constellation2 from '@/../public/images/clouds/constellation-2.png';
import constellation3 from '@/../public/images/clouds/constellation-3.png';
import cloud3 from '@/../public/images/clouds/cloud-3.png';

export default function TournamentInformation() {
  const { id } = useParams();
  const tournament = tournaments.find((tournament) => tournament.id === id);
  if (!tournament) return <div>404</div>;
  return (
    <div
      id="tournament-information"
      style={{ '--background-image': `url("${tournament.backgroundImage}")` } as React.CSSProperties}>
      <div className="background">
        <img src={constellation1.src} alt="background" className="constellation-1-1" />
        <img src={cloud3.src} alt="background" className="cloud-3" />
        <img src={constellation2.src} alt="background" className="constellation-2-1" />
        <img src={constellation2.src} alt="background" className="constellation-2-2" />
        <img src={constellation3.src} alt="background" className="constellation-3-1" />
        <img src={constellation1.src} alt="background" className="constellation-1-2" />
        <img src={constellation1.src} alt="background" className="constellation-1-3" />
        <img src={constellation3.src} alt="background" className="constellation-3-2" />
      </div>
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
      <Title level={1} className="enrolled-teams">
        Equipes inscrites : {tournament.enrolledTeams}/{tournament.maxPlayers / tournament.playersPerTeam}
      </Title>
      <FillingBar fullness={(tournament.enrolledTeams * tournament.playersPerTeam) / tournament.maxPlayers} />
      <Partners />
    </div>
  );
}
