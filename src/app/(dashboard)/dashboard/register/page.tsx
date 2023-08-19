'use client';
import { useState, useEffect } from 'react';
// eslint-disable-next-line import/named
import { animated, useTransition } from '@react-spring/web';

import { setType } from '@/modules/login';

import { Input, Button, Table, Icon } from '@/components/UI';
import { createTeam as cT, joinTeam, cancelJoin } from '@/modules/team';
import { API } from '@/utils/api';
import { uploadsUrl } from '@/utils/environment';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Tournament, UserType } from '@/types';
import type { Action } from '@reduxjs/toolkit';

const columns = [
  { title: 'Équipe', key: 'team' },
  { title: 'Joueurs', key: 'players' },
  { title: '', key: 'action' },
];

const Register = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.login.user)!;
  const [discordLink, setDiscordLink] = useState('');
  const [userType, setUserType] = useState<UserType>();
  const [step, setStep] = useState(1);
  const soloTeamName = `${user.username}-solo-team`;
  const [teamName, setTeamName] = useState('');
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
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
      setDiscordLink(res.link);
    });

    (async () => {
      setTournaments(await API.get('tournaments'));
    })();

    if (user.discordId) setStep(2);

    if (user.askingTeamId) {
      (async () => {
        setUserType(user.type);
        setTournament((await API.get('teams/' + user.askingTeamId)).tournamentId);
        setStep(5);
      })();
    }
  }, []);

  if (!tournaments.length) return null;

  const Step1 = (
    <>
      <a href={discordLink}>
        <Button primary>
          <Icon name="discord" />
          &nbsp;&nbsp;{'Connecte-toi à ton compte Discord'}
        </Button>
      </a>
    </>
  );

  const Step2 = (
    <>
      <div className="card-container">
        <div
          onClick={() => {
            setUserType(UserType.player);
            setStep(step + 1);
            setTournamentSolo(false);
          }}>
          <Icon name="gamepad" />
          <p>Joueur</p>
        </div>

        <div
          onClick={() => {
            setUserType(UserType.coach);
            setStep(step + 1);
            setTournamentSolo(false);
          }}>
          <Icon name="headset" />
          <p>Coach / Manager</p>
        </div>

        <div
          onClick={() => {
            setUserType(UserType.spectator);
            setStep(step + 3);
            setTournamentSolo(true);
          }}>
          <Icon name="user" />
          <p>Spectateur</p>
        </div>
      </div>
    </>
  );

  const loadTournaments = () => {
    const list = tournamentsOptions.map((element, i) => {
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

    if (userType === UserType.player) {
      tournamentsSoloOptions.forEach((element, i) => {
        list.push(
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
          </div>,
        );
      });
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
          <Icon name="plus-square" />
          <p>Créer une équipe</p>
        </div>

        <div
          onClick={() => {
            setCreateTeam(false);
            setStep(step + 1);
          }}>
          <Icon name="signin" />
          <p>Rejoindre une équipe</p>
        </div>
      </div>
    </>
  );

  const tournamentTable = () => {
    const tournamentOption = tournaments.filter((tr) => tr.playersPerTeam > 1 && tr.id == tournament)[0];
    const tournamentTeamsRender = (tournamentOption.teams === undefined ? [] : tournamentOption.teams)
      .filter((team) => !team.lockedAt)
      .map((team) => ({
        team: user.askingTeamId === team.id ? `${team.name} (demande en attente)` : team.name,
        players: team.players.map(({ username }) => username).join(', '),
        action:
          user.askingTeamId === team.id ? (
            <Button onClick={() => dispatch(cancelJoin(team.name) as unknown as Action)}>Annuler</Button>
          ) : (
            <>
              {userType == UserType.player ? (
                <Button
                  primary
                  onClick={() => dispatch(joinTeam(team.id, team.name, UserType.player) as unknown as Action)}
                  disabled={!user.discordId}>
                  Rejoindre
                </Button>
              ) : (
                <Button
                  className="coachJoinButton"
                  primary
                  onClick={() => dispatch(joinTeam(team.id, team.name, UserType.coach) as unknown as Action)}
                  disabled={!user.discordId}>
                  Rejoindre
                </Button>
              )}
            </>
          ),
      }));
    return {
      title: undefined,
      key: undefined,
      content: <Table columns={columns} dataSource={tournamentTeamsRender} alignRight className="table-join" />,
    };
  };

  const Step5 = (
    <>
      <div className="warning light">
        En participant {userType === UserType.spectator ? "à l'évènement" : 'au tournoi'}, j'accepte{' '}
        {userType !== UserType.spectator && 'le règlement du tournoi (disponible sur la page du tournoi) et '} le{' '}
        <a href={`${uploadsUrl()}/rules/ua.pdf`}>règlement de l'UTT Arena</a>
      </div>
      {createTeam || userType === UserType.spectator ? (
        <div className="create-team">
          {!tournamentSolo ? <Input label="Nom d'équipe" value={teamName} onChange={setTeamName} /> : null}
          {tournament == 'osu' && userType !== UserType.spectator ? (
            <>
              <div className="warning">Il est nécessaire d'être qualifié pour s'inscrire à ce tournoi.</div>
            </>
          ) : null}
          <Button
            primary
            className="center"
            onClick={() =>
              dispatch(
                userType == UserType.spectator
                  ? (setType(UserType.spectator) as unknown as Action)
                  : (cT({
                      name: tournamentSolo ? soloTeamName : teamName,
                      tournamentId: tournament,
                      userType: userType as UserType,
                    }) as unknown as Action),
              )
            }
            disabled={!user.discordId}>
            {tournamentSolo ? 'Valider' : 'Créer mon équipe'}
          </Button>
        </div>
      ) : (
        <div>{tournament ? tournamentTable().content : ''}</div>
      )}
    </>
  );

  const renderSwitch = (param: number) => {
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
        <Button
          primary
          onClick={() =>
            setStep(userType == UserType.spectator ? step - 3 : tournamentSolo && step == 5 ? step - 2 : step - 1)
          }>
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
        {transitions((styles, item) => item && <animated.div style={styles}>{renderSwitch(step)}</animated.div>)}

        {backButton()}
      </>
    );
  };

  return <div id="dashboard-register">{Stepper()}</div>;
};

export default Register;
