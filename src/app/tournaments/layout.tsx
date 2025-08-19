import styles from './layout.module.scss';
import React from 'react';
import { Metadata } from 'next';
import constellation1 from '@/../public/images/clouds/constellation-1.webp';
import constellation2 from '@/../public/images/clouds/constellation-2.webp';
import constellation3 from '@/../public/images/clouds/constellation-3.webp';
import cloud1 from '@/../public/images/clouds/cloud-1.webp';
import cloud2 from '@/../public/images/clouds/cloud-2.webp';
import cloud3 from '@/../public/images/clouds/cloud-3.webp';
import cloud4 from '@/../public/images/clouds/cloud-4.webp';
import Partners from '@/components/Partners';
import ScrollUp from '@/components/UI/ScrollUp';
import LayoutTop from '@/app/tournaments/layout-top';

export const metadata: Metadata = {
  title: 'Tournois - UTT Arena 2025 - 28, 29 et 30 novembre 2025',
};

const TournamentsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="tournament-layout" className={styles.tournamentLayout}>
      <ScrollUp />
      <LayoutTop />
      <div className={styles.mainContent}>
        <div className={styles.background}></div>
        <div className={styles.backgroundElements}>
          <img src={constellation1.src} alt="background" className={styles.constellation11} loading="lazy" />
          <img src={cloud3.src} alt="background" className={styles.cloud3} loading="lazy" />
          <img src={cloud2.src} alt="background" className={styles.constellation21} loading="lazy" />
          <img src={constellation2.src} alt="background" className={styles.constellation22} loading="lazy" />
          <img src={cloud1.src} alt="background" className={styles.constellation31} loading="lazy" />
          <img src={cloud4.src} alt="background" className={styles.constellation12} loading="lazy" />
          <img src={constellation1.src} alt="background" className={styles.constellation13} loading="lazy" />
          <img src={constellation3.src} alt="background" className={styles.constellation23} loading="lazy" />
        </div>
        {children}
      </div>
      <Partners />
    </div>
  );
};

export default TournamentsLayout;
