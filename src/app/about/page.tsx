'use client';
import React from 'react';
import { TextBlock, Title } from '@/components/UI';

interface TeamMember {
  name: string;
  job: string;
  image: string;
}

interface OurTeam {
  [key: string]: {
    name: string;
    color: string;
    members: TeamMember[];
  };
}

const team: OurTeam = {
  dev: {
    name: 'Développement',
    color: '#FF0000',
    members: [
      {
        name: 'Alexandre',
        job: 'Respo Dev',
        image: 'https://picsum.photos/200',
      },
      {
        name: 'Alexandre',
        job: 'Développeur',
        image: 'https://picsum.photos/200',
      },
      {
        name: 'Alexandre',
        job: 'Développeur',
        image: 'https://picsum.photos/200',
      },
    ],
  },
  com: {
    name: 'Communication',
    color: '#0000FF',
    members: [
      {
        name: 'Alexandre',
        job: 'Respo com',
        image: 'https://picsum.photos/200',
      },
      {
        name: 'Alexandre',
        job: 'Communication',
        image: 'https://picsum.photos/200',
      },
    ],
  },
  graphisme: {
    name: 'Graphisme',
    color: '#00FF00',
    members: [
      {
        name: 'Alexandre',
        job: 'Respo graphisme',
        image: 'https://picsum.photos/200',
      },
      {
        name: 'Alexandre',
        job: 'Graphiste',
        image: 'https://picsum.photos/200',
      },
    ],
  },
} as OurTeam;

const About = () => {
  return (
    <div className="about-container">
      <div className="about-ua">
        <TextBlock
          title="UTT Arena"
          images={['https://picsum.photos/seed/add/1920/1080/', 'https://picsum.photos/1920/1080']}>
          LE rendez-vous gaming annuel de la région Auboise aura lieu les 3 et 4 décembre 2022 dans un lieu que vous
          connaissez bien : le Cube ! Plus de 2250m2 t'attendent pour passer 2 jours de folie ! <br />
          Au programme : 7 tournois sur tes jeux favoris, 2 jours pour montrer tes skills parmis les 630 joueurs qui
          composeront l’évènement, et tenter de remporter les cashprizes, lots et de nombreuses autres surprises ! Et
          pour animer cette édition, des guests d’exception viendront caster cette édition qui s’annonce enflammée !
          Alors prépare tout ton stuff et impose toi dans l’arène !
        </TextBlock>
      </div>
      <div className="about-ung">
        <TextBlock
          title="UTT Net Group"
          images={['https://picsum.photos/seed/add/1920/1080/', 'https://picsum.photos/1920/1080']}
          left>
          LE rendez-vous gaming annuel de la région Auboise aura lieu les 3 et 4 décembre 2022 dans un lieu que vous
          connaissez bien : le Cube ! Plus de 2250m2 t'attendent pour passer 2 jours de folie ! <br />
          Au programme : 7 tournois sur tes jeux favoris, 2 jours pour montrer tes skills parmis les 630 joueurs qui
          composeront l’évènement, et tenter de remporter les cashprizes, lots et de nombreuses autres surprises ! Et
          pour animer cette édition, des guests d’exception viendront caster cette édition qui s’annonce enflammée !
          Alors prépare tout ton stuff et impose toi dans l’arène !
        </TextBlock>
      </div>

      <div className="about-team">
        <Title level={1} align="center">
          Notre équipe
        </Title>
        <div className="content">
          {Object.keys(team).map((key) => (
            <>
              {team[key].members.map((member) => (
                <div
                  key={member.name}
                  className="member"
                  style={{ '--team-color': team[key].color } as React.CSSProperties}>
                  <div className="img-container">
                    <div className="image-font"></div>
                    <img src={member.image} alt={member.name} />
                  </div>
                  <span>{member.name}</span>
                  <span>{member.job}</span>
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
