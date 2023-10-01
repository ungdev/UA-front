'use client';
import styles from './style.module.scss';
import { TextBlock, Title } from '@/components/UI';
import Partners from '@/components/Partners';
import { useAppSelector } from '@/lib/hooks';
// import { Metadata } from 'next';

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

// export const metadata: Metadata = {
//   title: 'À propos - UTT Arena 2023 - 1, 2 et 3 décembre 2023',
// }

const About = () => {
  const trombiAllowed = useAppSelector((state) => state.settings.trombi);

  return (
    <>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutUa}>
          <TextBlock
            title="UTT Arena"
            images={['https://picsum.photos/seed/add/1920/1080/', 'https://picsum.photos/1920/1080']}>
            <br />
            L'UTT Arena revient cette année pour sa 21ème édition ! D'une simple salle d'examen de l'UTT à 2250m² de
            gaming au Parc des Expositions de Troyes, le Cube, en passant par le festival des jeux, l'UTT Arena a évolué
            de manière à proposer chaque année des tournois de meilleure qualité à ses joueurs !
          </TextBlock>
        </div>
        <div className={styles.aboutUng}>
          <TextBlock
            title="UTT Net Group"
            images={['https://picsum.photos/seed/add/1920/1080/', 'https://picsum.photos/1920/1080']}
            left>
            L'UTT Arena (UA) est le plus gros évènement de l'association <a href="https://ung.utt.fr">UTT Net Group</a>{' '}
            (UNG). L'UNG a été créée en 1998 pour rassembler tous les passionnés d'informatique et des nouvelles
            technologies de l'Université de Technologie de Troyes (UTT). <br />
          </TextBlock>
        </div>

        {trombiAllowed && (
          <div className={styles.aboutTeam}>
            <Title level={2} type={1} align="center">
              Notre équipe
            </Title>
            <div className={styles.content}>
              {Object.keys(team).map((key) => (
                <>
                  {team[key].members.map((member) => (
                    <div
                      key={member.name}
                      className={styles.member}
                      style={{ '--team-color': team[key].color } as React.CSSProperties}>
                      <div className={styles.imgContainer}>
                        <div className={styles.imageFont}></div>
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
        )}
      </div>
      <Partners />
    </>
  );
};

export default About;
