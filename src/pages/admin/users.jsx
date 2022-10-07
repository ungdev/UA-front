import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Radio, Input, Button, Table, Checkbox } from '../../components/UI';
import UserModal from '../../components/UserModal';
import { fetchUsers, lookupUser } from '../../modules/users';

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
  { name: 'LoL (compétitif)', value: 'lolCompetitive' },
  { name: 'LoL (loisir)', value: 'lolLeisure' },
  { name: 'Rocket League', value: 'rl' },
  { name: 'CS:GO', value: 'csgo' },
  { name: 'SSBU', value: 'ssbu' },
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
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [search, setSearch] = useState('');
  const isLoggedIn = useSelector((state) => state.login.user);
  const { users, isFetched, total, page, itemsPerPage } = useSelector((state) => state.users);
  // The user that is displayed in the modal. If undefined, the modal is not shown
  const searchUser = useSelector((state) => state.users.lookupUser);
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
      dispatch(fetchUsers());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(fetchUsers(filters, search));
  }, [filters]);

  const applySearch = () => {
    dispatch(fetchUsers(filters, search));
  };

  // Update only 1 information display state
  const updateInfoToDisplay = (info, display) => {
    const infoToDisplayUpdated = {};
    Object.entries(infoToDisplay).forEach((entry) => (infoToDisplayUpdated[entry[0]] = entry[1]));
    infoToDisplayUpdated[info] = display;
    setInfoToDisplay(infoToDisplayUpdated);
  };

  const getTableColumns = () => {
    return Object.entries(infoToDisplay).reduce((tableColumns, entry) => {
      if (entry[1]) {
        tableColumns.push({ title: columnTitles[entry[0]], key: entry[0] });
      }
      return tableColumns;
    }, []);
  };

  return (
    <div id="admin-users">
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
              label={columnTitles[infoKey]}
              value={display}
              onChange={(state) => {
                updateInfoToDisplay(infoKey, state);
              }}></Checkbox>
          );
        })}
      </div>

      <Table
        columns={getTableColumns()}
        dataSource={users}
        className="users-table"
        pagination
        paginationOptions={{
          total,
          page,
          pageSize: itemsPerPage,
          goToPage: (page) => dispatch(fetchUsers(filters, search, page)),
        }}
        onRowClicked={(i) => dispatch(lookupUser(users[i]))}
      />
      {searchUser && <UserModal searchUser={searchUser} onClose={() => dispatch(lookupUser())}></UserModal>}
    </div>
  );
};

export default Users;
