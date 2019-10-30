import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Title, Radio } from '../../components/UI';
import { fetchUsers, displayUser, goToPage, filterTournament } from '../../modules/users';
import Table from '../../components/UI/Table';

import './users.css';

const columns = [
  { title: 'Pseudo', key: 'username' },
  { title: 'Email', key: 'email' },
  { title: 'Payé?', key: 'isPaid' },
  { title: 'Equipe', key: 'teamName' },
  { title: 'Tournoi', key: 'tournamentName' },
  { title: 'Place', key: 'place' },
  { title: '', key: 'action' },
];

const options = [
  { name: 'Tous', value: 'all' },
  { name: 'Payé uniquement', value: 'paid' },
  { name: 'Non payé', value: 'noPaid' },
];

const optionsTournaments = [
  { name: 'Tous', value: 'all' },
  { name: 'LoL (pro)', value: '1' },
  { name: 'LoL (amateur)', value: '2' },
  { name: 'Fortnite', value: '3' },
  { name: 'CS:GO', value: '4' },
  { name: 'SSBU', value: '5' },
  { name: 'osu!', value: '6' },
  { name: 'Libre', value: '7' },
];

const Users = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('all');
  const [tournamentFilter, setTournamentFilter] = useState('all');
  const isLoggedIn = useSelector((state) => state.login.user);
  const { current: users, isFetched, params, page } = useSelector((state) => state.users);

  useEffect(() => {
    if (isLoggedIn && !isFetched) {
      dispatch(fetchUsers());
    }
  }, [isLoggedIn]);

  const updateFilter = (v) => {
    setFilter(v);
  };

  const updateTournament = (v) => {
    setTournamentFilter(v);
    dispatch(filterTournament(v));
  };

  const formatUsers = users.map((user) => ({
    ...user,
    action: <i className="far fa-question-circle point" onClick={() => dispatch(displayUser(user))}/>,
  }));
  return (
    <div id="admin-users">
      <Title level={4}>Filtres</Title>
      <Radio
        label=""
        name="filter"
        row
        options={options}
        value={filter}
        onChange={updateFilter}
      />
      <Radio
        label="Tournoi"
        name="filterTournament"
        row
        options={optionsTournaments}
        value={tournamentFilter}
        onChange={updateTournament}
      />
      <Table columns={columns} dataSource={formatUsers} className="users-table" />
      <div className="table-footer">
        <p>{params.first}-{params.last} sur {params.total}</p>
        <i className="fas fa-chevron-left pointer" onClick={() => dispatch(goToPage(page-1))} />
        <i className="fas fa-chevron-right pointer" onClick={() => dispatch(goToPage(page+1))} />
      </div>
    </div>
  );
};

export default Users;
