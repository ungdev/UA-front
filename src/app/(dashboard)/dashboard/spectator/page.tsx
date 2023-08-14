'use client';
import { Button } from '@/components/UI';
import { setType } from '@/modules/login';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import type { Action } from '@reduxjs/toolkit';

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
            <i className="fas fa-check-circle green-icon"></i> Payé
          </>
        ) : (
          <>
            <i className="fas fa-exclamation-triangle red-icon"></i> Non payé
          </>
        )}
      </p>
      {!hasPaid && <Button onClick={() => dispatch(setType(undefined) as unknown as Action)}>Changer de rôle</Button>}
    </div>
  );
};

export default Spectator;
