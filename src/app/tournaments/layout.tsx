'use client';
import styles from './layout.module.scss';
import { Button, Title } from '@/components/UI';
import constellation1 from '@/../public/images/clouds/constellation-1.png';
import constellation2 from '@/../public/images/clouds/constellation-2.png';
import constellation3 from '@/../public/images/clouds/constellation-3.png';
import cloud1 from '@/../public/images/clouds/cloud-1.png';
import cloud2 from '@/../public/images/clouds/cloud-2.png';
import cloud3 from '@/../public/images/clouds/cloud-3.png';
import cloud4 from '@/../public/images/clouds/cloud-4.png';
import Partners from '@/components/Partners';
import { usePathname, useRouter } from 'next/navigation';
import { setLoginModalVisible } from '@/modules/loginModal';
import { useAppDispatch } from '@/lib/hooks';
import type { Action } from '@reduxjs/toolkit';
import ScrollUp from '@/components/UI/ScrollUp';
// import { Metadata } from 'next';

/*export const metadata: Metadata = {
  title: 'Tournois - UTT Arena 2023 - 1, 2 et 3 décembre 2023',
};*/

const TournamentsLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div id="tournament-layout" className={styles.tournamentLayout}>
      <ScrollUp />
      <div className={styles.topContainer}>
        <div className={styles.top}>
          <Title level={3} type={1} align={'center'}>
            Forme ton équipe et hisse-toi vers la victoire ultime dans un tournoi !
          </Title>
          <div className={styles.text}>
            Rejoins-nous dès maintenant pour vivre une expérience inoubliable, où l'amitié, la stratégie, et
            l'adrénaline se mêlent pour créer des souvenirs inégalables. C'est l'occasion parfaite de mettre en avant
            tes talents, de relever des défis palpitants et de créer des liens durables avec des coéquipiers passionnés.
          </div>
          <div className={styles.buttons}>
            <Button
              className={styles.button}
              primary
              onClick={() => {
                if (pathname === '/tournaments') {
                  router.replace('/tournaments?scroll=true', {
                    scroll: false,
                  });
                } else {
                  router.push('/tournaments?scroll=true', {
                    scroll: false,
                  });
                }
              }}>
              Découvrir les tournois
            </Button>
            <Button
              className={styles.button}
              primary
              onClick={() => dispatch(setLoginModalVisible(true) as unknown as Action)}>
              Se connecter
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.background}></div>
        <div className={styles.backgroundElements}>
          <img src={constellation1.src} alt="background" className={styles.constellation11} />
          <img src={cloud3.src} alt="background" className={styles.cloud3} />
          <img src={cloud2.src} alt="background" className={styles.constellation21} />
          <img src={constellation2.src} alt="background" className={styles.constellation22} />
          <img src={cloud1.src} alt="background" className={styles.constellation31} />
          <img src={cloud4.src} alt="background" className={styles.constellation12} />
          <img src={constellation1.src} alt="background" className={styles.constellation13} />
          <img src={constellation3.src} alt="background" className={styles.constellation23} />
        </div>
        {children}
      </div>
      <Partners />
    </div>
  );
};

export default TournamentsLayout;
