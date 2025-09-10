import styles from './layout.module.scss';
import React from 'react';
import { Metadata } from 'next';

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
        {children}
      </div>
      <Partners />
    </div>
  );
};

export default TournamentsLayout;
