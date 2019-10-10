import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/UI';
import { setType } from '../../modules/login';

const Coach = () => {
  const dispatch = useDispatch();
  const isPaid = useSelector((state) => state.login.user.isPaid);
  return (
    <div id="dashboard-coach">
      <p>
        <strong>Rôle : </strong> coach / manager / accompagnateur
        <br/>
        <strong>Statut : </strong> { isPaid
          ? <><i className="fas fa-check-circle green-icon"></i> Payé</>
          : <><i className="fas fa-exclamation-triangle red-icon"></i> Non payé</>}
      </p>
      {!isPaid &&
      <Button
        onClick={() => dispatch(setType('none'))}
      >Changer de rôle</Button>
      }
    </div>
  );
};

export default Coach;
