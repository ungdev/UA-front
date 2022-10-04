import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTransition, animated } from 'react-spring';

import { Input, Button, Table } from '../../components/UI';
import { createTeam as cT, joinTeam, cancelJoin } from '../../modules/team';
import { API } from '../../utils/api';

const columns = [
  { title: 'Équipe', key: 'team' },
  { title: 'Joueurs', key: 'players' },
  { title: '', key: 'action' },
];

const Register = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login.user);
  const [discordLink, setDiscordLink] = useState('');
  const [userType, setUserType] = useState('');
  const [step, setStep] = useState(1);
  const soloTeamName = `${user.username}-solo-team`;
  const [teamName, setTeamName] = useState('');
  const [tournaments, setTournaments] = useState([]);
  const [tournament, setTournament] = useState('');
  const [tournamentSolo, setTournamentSolo] = useState(false);
  const [createTeam, setCreateTeam] = useState(false);

  // Split multiplayer and solo tournaments
  const tournamentsList = tournaments.filter((tournament) => tournament.playersPerTeam > 1);
  const tournamentsSoloList = tournaments.filter((tournament) => tournament.playersPerTeam === 1);

  // Get tournaments category select options
  const tournamentsOptions = tournamentsList.map((tournament) => ({
    label: tournament.name,
    value: tournament.id,
  }));

  const tournamentsSoloOptions = tournamentsSoloList.map((tournament) => ({
    label: tournament.name,
    value: tournament.id,
  }));

  const transitions = useTransition(step, {
    from: { opacity: 0, transform: `translate3d(100%,0,0)` },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { position: 'absolute', display: 'none' },
    config: {
      duration: 250,
    },
  });

  useEffect(() => {
    API.get('discord/connect').then((res) => {
      setDiscordLink(res.data.link);
    });

    (async () => {
      setTournaments((await API.get('/tournaments')).data);
    })();

    if (user.discordId) setStep(2);

    if (user.askingTeamId) {
      (async () => {
        setTournament((await API.get('/teams/' + user.askingTeamId)).data.tournamentId);
        setStep(5);
      })();
    }
  }, []);

  if (!tournaments.length) return null;

  const Step1 = (
    <>
      <a href={discordLink}>
        <Button primary>
          <i className="fab fa-discord"></i>&nbsp;&nbsp;{'Connecte-toi à ton compte Discord'}
        </Button>
      </a>
    </>
  );

  const Step2 = (
    <>
      <div className="card-container">
        <div
          onClick={() => {
            setUserType('player');
            setStep(step + 1);
          }}>
          <i className="fa fa-gamepad"></i>
          <p>Joueur</p>
        </div>

        <div
          onClick={() => {
            setUserType('coach');
            setStep(step + 1);
          }}>
          <i className="fa fa-headset"></i>
          <p>Coach / Manager</p>
        </div>
      </div>
    </>
  );

  const loadTournaments = () => {
    let list = tournamentsOptions.map((element, i) => {
      return (
        <div
          key={i}
          onClick={() => {
            setTournament(element.value);
            setStep(step + 1);
            setTournamentSolo(false);
          }}>
          <img
            src={'/tournaments/' + element.value + '.svg'}
            alt={element.label + ' icon'}
            height="24px"
            width="24px"
          />
          <p>{element.label}</p>
        </div>
      );
    });

    if (userType === 'player') {
      list.push(
        tournamentsSoloOptions.map((element, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                setTournament(element.value);
                setCreateTeam(true);
                setStep(step + 2);
                setTournamentSolo(true);
              }}>
              <img
                src={'/tournaments/' + element.value + '.svg'}
                alt={element.label + ' icon'}
                height="24px"
                width="24px"
              />
              <p>{element.label}</p>
            </div>
          );
        }),
      );
    }
    return list;
  };

  const Step3 = (
    <>
      <div className="card-container">{loadTournaments()}</div>
    </>
  );

  const Step4 = (
    <>
      <div className="card-container">
        <div
          onClick={() => {
            setCreateTeam(true);
            setStep(step + 1);
          }}>
          <i className="fas fa-plus-square"></i>
          <p>Créer une équipe</p>
        </div>

        <div
          onClick={() => {
            setCreateTeam(false);
            setStep(step + 1);
          }}>
          <i className="fas fa-sign-in-alt"></i>
          <p>Rejoindre une équipe</p>
        </div>
      </div>
    </>
  );

  const tournamentTable = () => {
    let tournamentOption = tournaments.filter((tr) => tr.playersPerTeam > 1 && tr.id == tournament)[0];
    const tournamentTeamsRender = (tournamentOption.teams === undefined ? [] : tournamentOption.teams)
      .filter((team) => !team.lockedAt)
      .map((team) => ({
        team: user.askingTeamId === team.id ? `${team.name} (demande en attente)` : team.name,
        players: team.players.map(({ username }) => username).join(', '),
        action:
          user.askingTeamId === team.id ? (
            <Button onClick={() => dispatch(cancelJoin(team.id, team.name))}>Annuler</Button>
          ) : (
            <>
              <Button
                primary
                onClick={() => dispatch(joinTeam(team.id, team.name, 'player'))}
                disabled={!user.discordId}>
                Rejoindre
              </Button>
              <Button
                className="coachJoinButton"
                primary
                onClick={() => dispatch(joinTeam(team.id, team.name, 'coach'))}
                disabled={!user.discordId}>
                Rejoindre (coach / manager)
              </Button>
            </>
          ),
      }));
    return {
      title: tournamentOption.label,
      key: tournamentOption.value,
      content: <Table columns={columns} dataSource={tournamentTeamsRender} alignRight className="table-join" />,
    };
  };

  const Step5 = (
    <>
      {createTeam ? (
        <div className="create-team">
          {!tournamentSolo ? <Input label="Nom d'équipe" value={teamName} onChange={setTeamName} /> : null}
          {tournament == 'osu' ? (
            <>
              <div>
                Il est nécessaire d'être qualifié pour s'inscrire à ce tournoi. Pour s'incrire à cette qualification
                merci de remplir <a href="https://forms.gle/LNXdooZGcNFwTSkV9">ce formulaire.</a>
              </div>
            </>
          ) : null}
          <Button
            primary
            className="center"
            onClick={() =>
              dispatch(
                cT({ name: tournamentSolo ? soloTeamName : teamName, tournamentId: tournament, userType: userType }),
              )
            }
            rightIcon="fas fa-plus"
            disabled={!user.discordId}>
            Créer mon équipe
          </Button>
        </div>
      ) : (
        <div>{tournament ? tournamentTable().content : ''}</div>
      )}
    </>
  );

  const renderSwitch = (param) => {
    switch (param) {
      case 1:
        return Step1;
      case 2:
        return Step2;
      case 3:
        return Step3;
      case 4:
        return Step4;
      case 5:
        return Step5;
      default:
        break;
    }
  };

  const backButton = () => {
    if (((step == 2 && !user.discordId) || step > 2) && !user.askingTeamId) {
      return (
        <Button primary onClick={() => setStep(tournamentSolo && step == 5 ? step - 2 : step - 1)}>
          {'Retour'}
        </Button>
      );
    }
  };

  const Stepper = () => {
    return (
      <>
        <ul className="steps">
          <li className="active"></li>
          <li className={step > 1 ? `active` : ``}></li>
          <li className={step > 2 ? `active` : ``}></li>
          <li className={step > 3 ? `active` : ``}></li>
          <li className={step > 4 ? `active` : ``}></li>
        </ul>
        {transitions(
          (styles, item, key) =>
            item && (
              <animated.div key={key} style={styles}>
                {renderSwitch(step)}
              </animated.div>
            ),
        )}

        {backButton()}
      </>
    );
  };

  return <div id="dashboard-register">{Stepper()}</div>;
};

export default Register;
