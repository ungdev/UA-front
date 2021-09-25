import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Select, Button, Tabs, Table } from '../../components/UI';
import { createTeam, joinTeam, cancelJoin } from '../../modules/team';
import { fetchTournaments } from '../../modules/tournament';
import { setType } from '../../modules/login';
import { useRouter } from 'next/router';
import { API } from '../../utils/api';

const columns = [
  { title: 'Équipe', key: 'team' },
  { title: 'Joueurs', key: 'players' },
  { title: '', key: 'action' },
];

const Register = () => {
  const { query } = useRouter();

  const [tournamentId, setTournamentId] = useState('lol');
  const [tournamentSolo, setTournamentSolo] = useState('ssbu');
  const [teamName, setTeamName] = useState('');
  const [panel, setPanel] = useState('main');
  const dispatch = useDispatch();
  const { username, askingTeamId } = useSelector((state) => state.login.user || { username: '', askingTeamId: '' });
  const soloTeamName = `${username}-solo-team`;
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

  // Set tournaments state
  useEffect(() => {
    (async () => {
      setTournaments((await API.get('/tournaments')).data);
    })();
  }, []);

  if (!tournaments) {
    return null;
  }

  const tournamentsTabs = tournaments.map((tournament) => {
    const tournamentTeamsRender = (tournament.teams === undefined ? [] : tournament.teams).map((team) => ({
      team: askingTeamId === team.id ? `${team.name} (demande en attente)` : team.name,
      players: team.players.map(({ username }) => username).join(', '),
      action:
        askingTeamId === team.id ? (
          <Button onClick={() => dispatch(cancelJoin(team.id, team.name))}>Annuler</Button>
        ) : (
          <Button primary onClick={() => dispatch(joinTeam(team.id, team.name))}>
            Rejoindre
          </Button>
        ),
    }));
    return {
      title: tournament.name,
      key: tournament.id,
      content: <Table columns={columns} dataSource={tournamentTeamsRender} alignRight className="table-join" />,
    };
  });

  const mainPanel = (
    <>
      <div className="team-tournament">
        <div className="create-team">
          <p>
            Je veux créer mon équipe pour pouvoir rejoindre un tournoi.
            <br />
            Je serai chef d'équipe et je pourrai gérer les membres de mon équipe.
          </p>

          <Select label="Tournoi" options={tournamentsOptions} value={tournamentId} onChange={setTournamentId} />
          <Input label="Nom d'équipe" value={teamName} onChange={setTeamName} className="select" />
          <Button
            primary
            className="center"
            onClick={() => dispatch(createTeam({ name: teamName, tournamentId, userType: 'player' }))}
            rightIcon="fas fa-plus">
            Créer mon équipe
          </Button>

          <p>
            Il te manque un ou plusieurs joueurs ? Viens recruter sur notre{' '}
            <a href="https://discord.gg/WhxZwKU">discord</a>.
          </p>
        </div>

        <div className="join-team">
          <p>
            Je veux rejoindre une équipe déjà créée pour un tournoi.
            <br />
            Le chef d'équipe devra accepter ma demande.
          </p>

          <Button primary className="center" onClick={() => setPanel('join')} rightIcon="fas fa-users">
            Rejoindre une équipe
          </Button>

          <p>
            Tu n'as pas encore de coéquipier ? Pas de soucis, viens en trouver un sur notre{' '}
            <a href="https://discord.gg/WhxZwKU">discord</a>.
          </p>
        </div>
      </div>
      <div className="join-solo">
        <div className="create-solo-team">
          <p>Je veux rejoindre un tournoi solo (SSBU, osu! ou libre)</p>

          <Select
            label="Tournoi"
            options={tournamentsSoloOptions}
            value={tournamentSolo}
            onChange={setTournamentSolo}
          />
          <Button
            primary
            className="center-mobile"
            onClick={() => dispatch(createTeam({ name: soloTeamName, tournamentId, userType: 'player' }))}
            rightIcon="fas fa-user">
            S'inscrire en solo
          </Button>
        </div>
        <div>
          <p>Tu es coach, manager ou accompagnateur ? C'est ici pour prendre sa place.</p>

          <Button
            primary
            className="center-mobile"
            rightIcon="fas fa-user-tie"
            onClick={() => dispatch(setType('visitor'))}>
            S'inscrire
          </Button>
        </div>
      </div>
    </>
  );

  const joinPanel = (
    <>
      <Button onClick={() => setPanel('main')} leftIcon="fas fa-arrow-left">
        Retour
      </Button>
      <Tabs tabs={tournamentsTabs} />
    </>
  );
  return <div id="dashboard-register">{panel === 'main' ? mainPanel : joinPanel}</div>;
};

export default Register;
