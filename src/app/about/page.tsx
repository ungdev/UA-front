'use client';
import styles from './style.module.scss';
import { TextBlock, Title } from '@/components/UI';
import Partners from '@/components/Partners';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import uaImage1 from '@/../public/images/about/ua-1.webp';
import uaImage2 from '@/../public/images/about/ua-2.webp';
import ungImage1 from '@/../public/images/about/ung-1.webp';
import ungImage2 from '@/../public/images/about/ung-2.webp';
import TeamMember from '@/components/landing/TeamMember';
import { useEffect } from 'react';
import { fetchOrgas } from '@/modules/users';
import { type Action } from '@reduxjs/toolkit';

// export const metadata: Metadata = {
//   title: 'À propos - UTT Arena 2023 - 1, 2 et 3 décembre 2023',
// }

const About = () => {
  const dispatch = useAppDispatch();
  const trombiAllowed = useAppSelector((state) => state.settings.trombi);
  const orgas = useAppSelector((state) => state.users.orgas);

  useEffect(() => {
    if (!orgas && trombiAllowed) dispatch(fetchOrgas() as unknown as Action);
  }, [trombiAllowed]);

  return (
    <>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutUa}>
          <TextBlock title="UTT Arena" titleLevel={2} images={[uaImage1.src, uaImage2.src]}>
            <br />
            L'UTT Arena revient cette année pour sa 21ème édition ! D'une simple salle d'examen de l'UTT à 2250m² de
            gaming au Parc des Expositions de Troyes, le Cube, en passant par le festival des jeux, l'UTT Arena a évolué
            de manière à proposer chaque année des tournois de meilleure qualité à ses joueurs !
          </TextBlock>
        </div>
        <div className={styles.aboutUng}>
          <TextBlock title="UTT Net Group" titleLevel={2} images={[ungImage1.src, ungImage2.src]} left>
            L'UTT Arena (UA) est le plus gros évènement de l'association <a href="https://ung.utt.fr">UTT Net Group</a>{' '}
            (UNG). L'UNG a été créée en 1998 pour rassembler tous les passionnés d'informatique et des nouvelles
            technologies de l'Université de Technologie de Troyes (UTT). <br />
          </TextBlock>
        </div>

        {trombiAllowed &&
          (!orgas ? (
            'Chargement des orgas...'
          ) : (
            <div className={styles.aboutTeam}>
              <Title level={2} type={1} align="center">
                Notre équipe
              </Title>
              <div className={styles.content}>
                {orgas.map((commission) => (
                  <div key={commission.id}>
                    <Title className={styles.commissionName} level={3} type={commission.masterCommission ? 3 : 2}>
                      {commission.name}
                    </Title>
                    {commission.roles.respo.map((orga) => (
                      <TeamMember member={orga} commission={commission} role={'respo'} key={orga.id} />
                    ))}
                    {commission.roles.member.map((orga) => (
                      <TeamMember member={orga} commission={commission} role={'member'} key={orga.id} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
      <div className="">
        <Title level={2} type={1} align="center">
          Nos partenaires
        </Title>
        <Partners cards />
      </div>
    </>
  );
};

export default About;
