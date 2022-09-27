import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Select, Button, Tabs, Table } from '../../components/UI';
import { createTeam, joinTeam, cancelJoin } from '../../modules/team';
import { setType } from '../../modules/login';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API } from '../../utils/api';

const Register = () => {
  const { query } = useRouter();
  const user = useSelector((state) => state.login.user);
  const [discordLink, setDiscordLink] = useState('');
  const discordLinkRef = useRef(null);
  const [userType, setUserType] = useState('');
  const [step, setStep] = useState(1);
  const soloTeamName = `${user.username}-solo-team`;
  const [tournaments, setTournaments] = useState([]);

  // Split multiplayer and solo tournaments
  const tournamentsList = tournaments.filter((tournament) => tournament.playersPerTeam > 1);
  const tournamentsSoloList = tournaments.filter((tournament) => tournament.playersPerTeam === 1);

  // If there's a query, pre-select the tournament given by this query
  if (query.tournamentId && (tournamentId !== query.tournamentId || tournamentSolo !== query.tournamentId)) {
    if (tournamentsList.filter((tournament) => tournament.id === query.tournamentId)) {
      setTournamentId(query.tournamentId);
    }
    if (tournamentsSoloList.filter((tournament) => tournament.id === query.tournamentId)) {
      setTournamentSolo(query.tournamentId);
    }
  }

  // Get tournaments category select options
  const tournamentsOptions = tournamentsList.map((tournament) => ({
    label: tournament.name,
    value: tournament.id,
  }));

  const tournamentsSoloOptions = tournamentsSoloList.map((tournament) => ({
    label: tournament.name,
    value: tournament.id,
  }));

  useEffect(() => {
    API.get('discord/connect').then((res) => {
      setDiscordLink(res.data.link);
    });

    (async () => {
      setTournaments((await API.get('/tournaments')).data);
    })();

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
          setUserType('player')
          setStep(3);
        }}>
          <i className="fa fa-gamepad"></i>
          <p>Joueur</p>
        </div>

        <div onClick={() => {
          setUserType('coach')
          setStep(3);
        }}>
          <i className="fa fa-headset"></i>
          <p>Coach / Manager</p>
        </div>
      </div>
    </>
  );

  const loadTournaments = () => {
    let list = tournamentsOptions.map((element,i) => {
      return (<div key={i} onClick={() => {
        setTournamentId(element.value)
        setStep(4);
      }}>
        <p>{element.label}</p>
      </div>);
    })

    if (userType === 'player') {
      list.push(tournamentsSoloOptions.map((element,i) => {
        return (<div key={i} onClick={() => {
          setTournamentSolo(element.value)
          setStep(4);
        }}>
          <p>{element.label}</p>
        </div>);
      }));
    }
    return list;
  }

  const Step3 = (
    <>
      <div className="card-container">
        { loadTournaments() }
      </div>
    </>
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
