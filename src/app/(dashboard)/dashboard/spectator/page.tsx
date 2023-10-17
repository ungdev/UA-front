'use client';
import { Button, Icon, Title } from '@/components/UI';
import { setType } from '@/modules/login';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import type { Action } from '@reduxjs/toolkit';
import { IconName } from '@/components/UI/Icon';

import styles from './style.module.scss';

const Spectator = () => {
  const dispatch = useAppDispatch();
  const hasPaid = useAppSelector((state) => state.login.user!.hasPaid);

  return (
    <div id="dashboard-spectator" className={styles.dashboardSpectator}>
      <div className={styles.titleHeader}>
        <Title level={1} className={styles.primaryTitle} align="center">
          Spectateur
        </Title>
      </div>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <div className={styles.infoPart}>
            <div className={styles.singleInfo}>
              <strong>Rôle :</strong>
              <span className={styles.descriptionValue}>Spectateur</span>
            </div>
          </div>
          <div className={styles.infoPart}>
            <div className={styles.singleInfo}>
              <strong>Statut :</strong>
              {hasPaid ? (
                <>
                  <Icon name={IconName.Tick} className={styles.iconTick} />
                  <span className={`${styles.descriptionValue} ${styles.iconTick}`}>Payé</span>
                </>
              ) : (
                <>
                  <Icon name={IconName.Caution} className={styles.iconCaution} />
                  <span className={`${styles.descriptionValue} ${styles.iconCaution}`}>Non payé</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonRow}>
        {!hasPaid && <Button onClick={() => dispatch(setType(undefined) as unknown as Action)}>Changer de rôle</Button>}
      </div>
    </div>
  );
};

export default Spectator;
