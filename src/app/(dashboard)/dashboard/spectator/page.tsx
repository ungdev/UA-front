'use client';
import { Button, Icon } from '@/components/UI';
import { setType } from '@/modules/login';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import type { Action } from '@reduxjs/toolkit';
import { IconName } from '@/components/UI/Icon';

const Spectator = () => {
  const dispatch = useAppDispatch();
  const hasPaid = useAppSelector((state) => state.login.user!.hasPaid);

  return (
    <div id="dashboard-coach">
      <p>
        <strong>Rôle : </strong> Spectateur
        <br />
        <strong>Statut : </strong>{' '}
        {hasPaid ? (
          <>
            <Icon name={IconName.Tick} /> Payé
          </>
        ) : (
          <>
            <Icon name={IconName.Caution} /> Non payé
          </>
        )}
      </p>
      {!hasPaid && <Button onClick={() => dispatch(setType(undefined) as unknown as Action)}>Changer de rôle</Button>}
    </div>
  );
};

export default Spectator;
