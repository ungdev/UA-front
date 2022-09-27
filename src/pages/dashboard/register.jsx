import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Select, Button, Tabs, Table } from '../../components/UI';
import { createTeam, joinTeam, cancelJoin } from '../../modules/team';
import { setType } from '../../modules/login';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API } from '../../utils/api';

const Register = () => {
  const user = useSelector((state) => state.login.user);
  const [discordLink, setDiscordLink] = useState('');
  const discordLinkRef = useRef(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    API.get('discord/connect').then((res) => {
      setDiscordLink(res.data.link);
    });

    if(user.discordId) setStep(2);

    setStep(2);
  }, []);


  const Step1 = (
    <>
      <a href={discordLink}>
          <Button primary>{'Connecte-toi à ton compte Discord'}</Button>
      </a>
    </>
  );
  
  const Step2 = (
    <>
      <div className="card-container">
        <div onClick={() => {
          setStep(3);
        }}>
          <i className="fa fa-gamepad"></i>
          <p>Joueur</p>
        </div>

        <div onClick={() => {
          setStep(3);
        }}>
          <i className="fa fa-headset"></i>
          <p>Coach / Manager</p>
        </div>
      </div>
    </>
  );

  const Step3 = (
    <></>
  );

  const renderSwitch = (param) => {
    switch(param) {
      case 1:
        return Step1;
      case 2:
        return Step2;
      case 3:
        return Step3;
      default:
        break;
    }
  }

  const backButton = () => {
    if((step == 2 && !user.discordId) || step > 2) {
      return <Button primary onClick={() => setStep(step - 1) }>{'Retour'}</Button>;
    }
  }
  
  const Stepper = () => {
    return (
      <>
        <ul class="steps">
          <li class="active"></li>
          <li className={step > 1 ? `active` : ``}></li>
          <li className={step > 2 ? `active` : ``}></li>
        </ul>
        { renderSwitch(step) }
        { backButton() }
      </>
    );
  }

  return <div id="dashboard-register">{Stepper()}</div>;
}


export default Register;
