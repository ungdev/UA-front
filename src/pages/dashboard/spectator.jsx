import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/UI';
import { setType } from '../../modules/login';

const Spectator = () => {
  const dispatch = useDispatch();
  const hasPaid = useSelector((state) => state.login.user.hasPaid);

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
      {!hasPaid && <Button onClick={() => dispatch(setType(undefined))}>Changer de rôle</Button>}
    </div>
  );
};

export default Spectator;
