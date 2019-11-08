import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Title, Radio, Input, Button } from '../../components/UI';
import { fetchUsers, displayUser, goToPage, filterUsers } from '../../modules/users';
import { searchUser } from '../../modules/userEntry';
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
  const [filters, setFilters] = useState({ tournamentId: 'all', status: 'all' });
  const [email, setEmail] = useState('');
  const isLoggedIn = useSelector((state) => state.login.user);
  const { current: users, isFetched, params, page } = useSelector((state) => state.users);

  useEffect(() => {
    if (isLoggedIn && !isFetched) {
      dispatch(fetchUsers());
    }
  }, [isLoggedIn]);

  const updateFilter = (v) => {
    setFilters(v);
    dispatch(filterUsers(v));
  };

  const formatUsers = users.map((user) => ({
    ...user,
    action: <i className="fas fa-cog pointer" onClick={() => dispatch(displayUser(user))}/>,
  }));
  return (
    <div id="admin-users">
      <Title level={4}>Filtres</Title>
      <Radio
        label=""
        name="filter"
        row
        options={options}
        value={filters.status}
        onChange={(v) => updateFilter({ ...filters, status: v })}
      />
      <br/>
      <Radio
        label="Tournoi"
        name="filterTournament"
        row
        options={optionsTournaments}
        value={filters.tournamentId}
        onChange={(v) => updateFilter({ ...filters, tournamentId: v })}
      />
      <Input
          value={email}
          onChange={setEmail}
          label="Rechercher utilisateur"
          placeholder="Email, pseudo, nom"
        />
        <Button primary onClick={() => dispatch(searchUser(email))}>Rechercher</Button>
      <Table
        columns={columns}
        dataSource={formatUsers}
        className="users-table"
        pagination
        paginationOptions={{
          ...params,
          goToPage: (page) => dispatch(goToPage(page, filters)),
          page,
        }}
      />
    </div>
  );
};

export default Users;
