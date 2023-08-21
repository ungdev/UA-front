'use client';
import { useEffect, useState } from 'react';

import { Radio, Input, Button, Table, Checkbox } from '@/components/UI';
import UserModal from '@/components/dashboard/UserModal';
import { fetchUsers, lookupUser } from '@/modules/users';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import type { Action } from '@reduxjs/toolkit';

const columnTitles = {
  fullname: 'Nom',
  username: 'Pseudo',
  email: 'Email',
  lockedLabel: 'Lock',
  paidLabel: 'Payé',
  scannedLabel: 'Scanné',
  permissionsLabel: 'Permissions',
  teamName: 'Équipe',
  tournamentName: 'Tournoi',
  place: 'Place',
};

const statusOptions = [
  { name: 'Tous', value: 'all' },
  { name: 'Joueur', value: 'player' },
  { name: 'Spectateur', value: 'spectator' },
  { name: 'Orga', value: 'orga' },
  { name: 'Coach', value: 'coach' },
  { name: 'Accompagnateur', value: 'attendant' },
];

const lockedOptions = [
  { name: 'Tous', value: 'all' },
  { name: 'Verrouillé', value: 'true' },
  { name: 'Non verrouillé', value: 'false' },
];

const paymentOptions = [
  { name: 'Tous', value: 'all' },
  { name: 'Payé', value: 'true' },
  { name: 'Non payé', value: 'false' },
];

const scannedOptions = [
  { name: 'Tous', value: 'all' },
  { name: 'Scanné', value: 'true' },
  { name: 'Non scanné', value: 'false' },
];

const tournamentOptions = [
  { name: 'Tous', value: 'all' },
  { name: 'LoL', value: 'lol' },
  { name: 'Rocket League', value: 'rl' },
  { name: 'CS:GO', value: 'csgo' },
  { name: 'SSBU', value: 'ssbu' },
  { name: 'TFT', value: 'tft' },
  { name: 'osu!', value: 'osu' },
  { name: 'Libre', value: 'open' },
];

const INITIAL_FILTERS = {
  type: 'all',
  payment: 'all',
  locked: 'all',
  scan: 'all',
  tournament: 'all',
};

const Users = () => {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [createUser, setCreateUser] = useState(false);
  const [search, setSearch] = useState('');
  const isLoggedIn = useAppSelector((state) => state.login.status.login);
  const isAdmin = useAppSelector((state) => state.login.status.admin);
  const { users, isFetched, total, page, itemsPerPage } = useAppSelector((state) => state.users);
  // The user that is displayed in the modal. If undefined, the modal is not shown
  const searchUser = useAppSelector((state) => state.users.lookupUser);
  // The information that is displayed in the table
  const [infoToDisplay, setInfoToDisplay] = useState({
    fullname: true,
    username: true,
    email: true,
    lockedLabel: true,
    paidLabel: true,
    scannedLabel: true,
    permissionsLabel: true,
    teamName: true,
    tournamentName: true,
    place: true,
  });

  useEffect(() => {
    if (isLoggedIn && !isFetched) {
      dispatch(fetchUsers() as unknown as Action);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(fetchUsers(filters, search) as unknown as Action);
  }, [filters]);

  const applySearch = () => {
    dispatch(fetchUsers(filters, search) as unknown as Action);
  };

  // Update only 1 information display state
  const updateInfoToDisplay = (info: string, display: boolean) => {
    const infoToDisplayUpdated = {} as { [key: string]: boolean };
    Object.entries(infoToDisplay).forEach((entry) => (infoToDisplayUpdated[entry[0]] = entry[1]));
    infoToDisplayUpdated[info] = display;
    setInfoToDisplay(infoToDisplayUpdated as typeof infoToDisplay);
  };

  const getTableColumns = () => {
    return Object.entries(infoToDisplay).reduce((tableColumns: object[], entry) => {
      if (entry[1]) {
        tableColumns.push({ title: columnTitles[entry[0] as keyof typeof columnTitles], key: entry[0] });
      }
      return tableColumns;
    }, []);
  };

  return (
    <div id="admin-users">
      {isAdmin && (
        <Button primary onClick={() => setCreateUser(true)}>
          Créer un nouvel utilisateur
        </Button>
      )}
      <div className="filters">
        <Radio
          label="Statut"
          name="statusFilter"
          row
          options={statusOptions}
          value={filters.type}
          onChange={(v) => setFilters({ ...filters, type: v })}
        />
        <br />
        <Radio
          label="Verrouillage"
          name="lockedFilter"
          row
          options={lockedOptions}
          value={filters.locked}
          onChange={(v) => setFilters({ ...filters, locked: v })}
        />
        <br />
        <Radio
          label="Paiement"
          name="paymentFilter"
          row
          options={paymentOptions}
          value={filters.payment}
          onChange={(v) => setFilters({ ...filters, payment: v })}
        />
        <br />
        {filters.payment === 'true' && (
          <>
            <Radio
              label="Scanné"
              name="scanFilter"
              row
              options={scannedOptions}
              value={filters.scan}
              onChange={(v) => setFilters({ ...filters, scan: v })}
            />
            <br />
          </>
        )}
        <Radio
          label="Tournoi"
          name="tournamentFilter"
          row
          options={tournamentOptions}
          value={filters.tournament}
          onChange={(v) => setFilters({ ...filters, tournament: v })}
        />

        <hr />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            applySearch();
          }}>
          <Input value={search} onChange={setSearch} label="Giga recherche" placeholder="Nom, pseudo, email, équipe" />
          <Button primary type="submit">
            Rechercher
          </Button>
        </form>
      </div>

      <p>{`${total} résultat${total > 1 ? 's' : ''}`}</p>

      <div className="info-to-display">
        {Object.entries(infoToDisplay).map(([infoKey, display]) => {
          return (
            <Checkbox
              key={infoKey}
              label={columnTitles[infoKey as keyof typeof columnTitles]}
              value={display}
              onChange={(state) => {
                updateInfoToDisplay(infoKey, state);
              }}></Checkbox>
          );
        })}
      </div>

      <Table
        columns={getTableColumns() as { title: string; key: string }[]}
        dataSource={users}
        className="users-table"
        pagination
        paginationOptions={{
          total,
          page,
          pageSize: itemsPerPage,
          goToPage: (page) => dispatch(fetchUsers(filters, search, page) as unknown as Action),
        }}
        onRowClicked={(i) => dispatch(lookupUser(users[i]) as unknown as Action)}
      />
      {(searchUser || createUser) && (
        <UserModal
          searchUser={!createUser ? searchUser : null}
          onClose={() => {
            dispatch(lookupUser() as unknown as Action);
            setCreateUser(false);
          }}></UserModal>
      )}
    </div>
  );
};

export default Users;
