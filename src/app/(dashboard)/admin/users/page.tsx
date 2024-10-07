'use client';
import styles from './style.module.scss';
import { useEffect, useState } from 'react';

import { Radio, Input, Button, Table, Checkbox, Title } from '@/components/UI';
import UserModal from '@/components/dashboard/UserModal';
import { fetchUsers, lookupUser } from '@/modules/users';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { UserFilters } from '@/types';

const columnTitles = {
  fullname: 'Nom',
  username: 'Pseudo',
  email: 'Email',
  lockedLabel: 'Lock',
  paidLabel: 'Payé',
  scannedLabel: 'Scanné',
  permissionsLabel: 'Permissions',
  teamName: 'Équipe',
  status: 'Rôle',
  tournamentName: 'Tournoi',
  place: 'Place',
};

const statusOptions = [
  { name: 'Tous', value: 'all' },
  { name: 'Joueur', value: 'player' },
  { name: 'Spectateur', value: 'spectator' },
  { name: 'Coach', value: 'coach' },
  { name: 'Accompagnateur', value: 'attendant' },
];

const ageOptions = [
  { name: 'Tous', value: 'all' },
  { name: 'Mineur', value: 'child' },
  { name: 'Majeur', value: 'adult' },
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

const INITIAL_FILTERS = {
  type: 'all',
  payment: 'all',
  locked: 'all',
  scan: 'all',
  tournament: 'all',
  age: 'all',
  permissions: [] as string[],
};

const permissionOptions = [
  { id: 'orga', name: 'Orga' },
  { id: 'admin', name: 'Admin' },
];

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
    status: true,
    permissionsLabel: true,
    teamName: true,
    tournamentName: true,
    place: true,
  });
  const tournaments = useAppSelector((state) => state.tournament.tournaments);

  const applySearch = (page?: number) => {
    const userFilters: UserFilters = {
      locked: filters.locked,
      scan: filters.scan,
      payment: filters.payment,
      type: filters.type,
      tournament: filters.tournament,
      age: filters.age,
    };
    if (filters.permissions.length > 0) {
      userFilters.permissions = filters.permissions.join(',');
    }
    dispatch(fetchUsers(userFilters, search, page));
  };

  useEffect(() => {
    if (isLoggedIn && !isFetched) {
      dispatch(fetchUsers());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    applySearch();
  }, [filters]);

  if (!tournaments) {
    return false;
  }

  const tournamentOptions = [
    { name: 'Tous', value: 'all' },
    ...tournaments.map((tournament) => ({ name: tournament.name, value: tournament.id })),
  ];

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
    <div id="admin-user" className={styles.adminUser}>
      {isAdmin && (
        <div className={styles.rowAddButton}>
          <Title level={3} type={1} className={styles.userTitle}>
            Utilisateurs
          </Title>
          <Button primary onClick={() => setCreateUser(true)} className={styles.addButton}>
            Ajouter un utilisateur
          </Button>
        </div>
      )}
      <div className={styles.filters}>
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
          label="Age"
          name="ageFilter"
          row
          options={ageOptions}
          value={filters.age}
          onChange={(v) => setFilters({ ...filters, age: v })}
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
          className={styles.tournamentFilter}
        />
        <br />
        <div className={styles.permissionFilter}>
          Permissions
          <div className={styles.permissionFilterContainer}>
            {permissionOptions.map((option) => (
              <Checkbox
                label={option.name}
                value={filters.permissions.includes(option.id)}
                onChange={(v) => {
                  if (v) {
                    setFilters({ ...filters, permissions: [...filters.permissions, option.id] });
                  } else {
                    setFilters({
                      ...filters,
                      permissions: filters.permissions.filter((permission) => permission !== option.id),
                    });
                  }
                }}
                key={option.id}
              />
            ))}
          </div>
        </div>

        <hr />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            applySearch();
          }}>
          <Input
            value={search}
            onChange={setSearch}
            label="Giga recherche"
            placeholder="Nom, pseudo, email, équipe, id, discordId"
          />
          <Button primary type="submit">
            Rechercher
          </Button>
        </form>
      </div>

      <p>{`${total} résultat${total > 1 ? 's' : ''}`}</p>

      <div className={styles.infoToDisplay}>
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
        className={styles.usersTable}
        pagination
        paginationOptions={{
          total,
          page,
          pageSize: itemsPerPage,
          goToPage: applySearch,
        }}
        onRowClicked={(i) => dispatch(lookupUser(users[i]))}
      />
      {(searchUser || createUser) && (
        <UserModal
          searchUser={!createUser ? searchUser : null}
          onClose={() => {
            dispatch(lookupUser());
            setCreateUser(false);
          }}></UserModal>
      )}
    </div>
  );
};

export default Users;
