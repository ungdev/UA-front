'use client';
import React from 'react';
import { Title } from '@/components/UI';

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
        job: 'Développeur',
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
      {/* other content */}

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
