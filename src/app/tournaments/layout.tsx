import styles from './layout.module.scss';
import React from 'react';
import { Metadata } from 'next';
import constellation1 from '@/../public/images/clouds/constellation-1.png';
import constellation2 from '@/../public/images/clouds/constellation-2.png';
import constellation3 from '@/../public/images/clouds/constellation-3.png';
import cloud1 from '@/../public/images/clouds/cloud-1.png';
import cloud2 from '@/../public/images/clouds/cloud-2.png';
import cloud3 from '@/../public/images/clouds/cloud-3.png';
import cloud4 from '@/../public/images/clouds/cloud-4.png';
import Partners from '@/components/Partners';
import ScrollUp from '@/components/UI/ScrollUp';
import LayoutTop from '@/app/tournaments/LayoutTop';

export const metadata: Metadata = {
  title: 'Tournois - UTT Arena 2023 - 1, 2 et 3 décembre 2023',
};

const TournamentsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="tournament-layout" className={styles.tournamentLayout}>
      <ScrollUp />
      <LayoutTop />
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
