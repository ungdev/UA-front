import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Title, Radio, Input, Button, Table } from '../../components/UI';
import { fetchUsers, displayUser, goToPage, filterUsers, searchUsers } from '../../modules/users';

import './users.css';

const columns = [
  { title: 'Nom', key: 'fullname' },
  { title: 'Pseudo', key: 'username' },
  { title: 'Email', key: 'email' },
  { title: 'Payé', key: 'paidLabel' },
  { title: 'Scanné', key: 'scanned' },
  { title: 'Permissions', key: 'permissionsLabel' },
  { title: 'Équipe', key: 'teamName' },
  { title: 'Tournoi', key: 'tournamentName' },
  { title: 'Place', key: 'place' },
  { title: '', key: 'action' },
];

const statusOptions = [
  { name: 'Tous', value: 'all' },
  { name: 'Joueur', value: 'player' },
  { name: 'Visiteur', value: 'visitor' },
  { name: 'Orga', value: 'orga' },
];

const paymentOptions = [
  { name: 'Tous', value: 'all' },
  { name: 'Payé uniquement', value: 'paid' },
  { name: 'Non payé', value: 'noPaid' },
];

const scannedOptions = [
  { name: 'Tous', value: 'all' },
  { name: 'Scanné uniquement', value: 'true' },
  { name: 'Non scanné', value: 'false' },
];

const tournamentOptions = [
  { name: 'Tous', value: 'all' },
  { name: 'LoL (pro)', value: '1' },
  { name: 'LoL (amateur)', value: '2' },
  { name: 'Fortnite', value: '3' },
  { name: 'CS:GO', value: '4' },
  { name: 'SSBU', value: '5' },
  { name: 'osu!', value: '6' },
  { name: 'Libre', value: '7' },
];

const INITIAL_FILTERS = {
  status: 'all',
  payment: 'all',
  scan: 'all',
  tournamentId: 'all',
};

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
        label="Statut"
        name="statusFilter"
        row
        options={statusOptions}
        value={filters.status}
        onChange={(v) => updateFilter({ ...filters, status: v })}
      />
      <br/>
      <Radio
        label="Paiement"
        name="paymentFilter"
        row
        options={paymentOptions}
        value={filters.payment}
        onChange={(v) => updateFilter({ ...filters, payment: v })}
      />
      <br/>
      { filters.payment === 'paid' && (
        <>
          <Radio
            label="Scanné"
            name="scanFilter"
            row
            options={scannedOptions}
            value={filters.scan}
            onChange={(v) => updateFilter({ ...filters, scan: v })}
          />
          <br/>
        </>
      )}
      <Radio
        label="Tournoi"
        name="tournamentFilter"
        row
        options={tournamentOptions}
        value={filters.tournamentId}
        onChange={(v) => updateFilter({ ...filters, tournamentId: v })}
      />
      <Input
        value={search}
        onChange={setSearch}
        label="Giga recherche"
        placeholder="Nom, pseudo, email, équipe"
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
