import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Title, Radio, Input, Button } from '../../components/UI';
import { fetchUsers, displayUser, goToPage, filterUsers, searchUsers } from '../../modules/users';
import Table from '../../components/UI/Table';

import './users.css';

const columns = [
  { title: 'Pseudo', key: 'username' },
  { title: 'Email', key: 'email' },
  { title: 'Payé?', key: 'paidLabel' },
  { title: 'Scanné?', key: 'scanned' },
  { title: 'Permissions', key: 'permissionsLabel' },
  { title: 'Equipe', key: 'teamName' },
  { title: 'Tournoi', key: 'tournamentName' },
  { title: 'Place', key: 'place' },
  { title: '', key: 'action' },
];

const options = [
  { name: 'Tous', value: 'all' },
  { name: 'Payé uniquement', value: 'paid' },
  { name: 'Non payé', value: 'noPaid' },
  { name: 'Orga', value: 'orga' },
];

const optionsScanned = [
  { name: 'Tous', value: 'all' },
  { name: 'Scanné uniquement', value: 'true' },
  { name: 'Non scanné', value: 'false' },
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

const INITIAL_FILTERS = { tournamentId: 'all', status: 'all', scan: 'all' };

const Users = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [search, setSearch] = useState('');
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

  const applySearch = () => {
    dispatch(searchUsers(search));
    setFilters(INITIAL_FILTERS);
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
      { filters.status === 'paid' && (
        <>
          <Radio
            label="Scanné"
            name="filterScan"
            row
            options={optionsScanned}
            value={filters.scan}
            onChange={(v) => updateFilter({ ...filters, scan: v })}
          />
          <br/>
        </>
      )}
      <Radio
        label="Tournoi"
        name="filterTournament"
        row
        options={optionsTournaments}
        value={filters.tournamentId}
        onChange={(v) => updateFilter({ ...filters, tournamentId: v })}
      />
      <Input
          value={search}
          onChange={setSearch}
          label="Giga recherche"
          placeholder="Email, pseudo, nom, équipe"
        />
        <Button primary onClick={applySearch}>Rechercher</Button>
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
