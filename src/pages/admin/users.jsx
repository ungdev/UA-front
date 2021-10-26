import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Radio, Input, Button, Table, Checkbox } from '../../components/UI';
import UserModal from '../../components/UserModal';
import { fetchUsers, displayUser } from '../../modules/users';
import { API } from '../../utils/api';
import { SET_SEARCH_USER } from '../../modules/userEntry';

const columnTitles = {
  fullname: 'Nom',
  username: 'Pseudo',
  email: 'Email',
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

const paymentOptions = [
  { name: 'Tous', value: 'all' },
  { name: 'Payé', value: 'paid' },
  { name: 'Non payé', value: 'noPaid' },
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
  scan: 'all',
  tournament: 'all',
};

const Users = () => {
  const dispatch = useDispatch();
  const [filters, _setFilters] = useState(INITIAL_FILTERS);
  const [search, setSearch] = useState('');
  const isLoggedIn = useSelector((state) => state.login.user);
  const { users, isFetched, total, page, itemsPerPage } = useSelector((state) => state.users);
  // The user that is displayed in the modal. If undefined, the modal is not shown
  const [searchingUser, setSearchingUser] = useState();
  // The information that is displayed in the table
  const [infoToDisplay, setInfoToDisplay] = useState({
    fullname: true,
    username: true,
    email: true,
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

  const setFilters = (filters) => {
    _setFilters(filters);
  };

  const updateFilter = (v) => {
    setFilters(v);
  };

  const applySearch = () => {
    dispatch(fetchUsers(filters, search));
    _setFilters(INITIAL_FILTERS);
  };

  const openSearchModal = (searchUser) => {
    dispatch({
      type: SET_SEARCH_USER,
      searchUser,
    });
    setSearchingUser(searchUser);
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

  const formatUsers = users
    ? users.map((user) => ({
        ...user,
        action: <i className="fas fa-cog pointer" onClick={() => dispatch(displayUser(user))} />,
      }))
    : [];

  return (
    <div id="admin-users">
      <div className="filters">
        <Radio
          label="Statut"
          name="statusFilter"
          row
          options={statusOptions}
          value={filters.type}
          onChange={(v) => updateFilter({ ...filters, type: v })}
        />
        <br />
        {/*<Radio
          label="Paiement"
          name="paymentFilter"
          row
          options={paymentOptions}
          value={filters.payment}
          onChange={(v) => updateFilter({ ...filters, payment: v })}
        />*/}
        {/*<br />
        {filters.payment === 'paid' && (
          <>
            <Radio
              label="Scanné"
              name="scanFilter"
              row
              options={scannedOptions}
              value={filters.scan}
              onChange={(v) => updateFilter({ ...filters, scan: v })}
            />
            <br />
          </>
        )}*/}
        <Radio
          label="Tournoi"
          name="tournamentFilter"
          row
          options={tournamentOptions}
          value={filters.tournament}
          onChange={(v) => updateFilter({ ...filters, tournament: v })}
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
        dataSource={formatUsers}
        className="users-table"
        pagination
        paginationOptions={{
          total,
          page,
          pageSize: itemsPerPage,
          goToPage: (page) => dispatch(fetchUsers(filters, search, page)),
        }}
        onRowClicked={async (i) => {
          const user = users[i];
          const res = await API.get(`admin/users/${user.id}/carts`);
          openSearchModal({
            id: user.id,
            lastname: user.lastname,
            firstname: user.firstname,
            username: user.username,
            email: user.email,
            type: user.type,
            age: user.age,
            permissions: user.permissions,
            hasPaid: user.hasPaid,
            place: user.place,
            discordId: user.discordId,
            team: user.team,
            attendant: user.attendant,
            carts: res.data,
          });
        }}
      />
      {searchingUser && (
        <UserModal searchUser={searchingUser} onClose={(...[, user]) => openSearchModal(user)}></UserModal>
      )}
    </div>
  );
};

export default Users;
