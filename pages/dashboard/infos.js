import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { fetchInfos } from '../../modules/infos';
import { Table, Title } from '../../components/UI';
import './infos.css';

const columns = [
  { title: 'Titre', key: 'title' },
  { title: 'Contenu', key: 'content' },
  { title: 'Date', key: 'date' },
];

const Infos = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const { all: infos } = useSelector((state) => state.infos);
  useEffect(() => {
    if (user) {
      dispatch(fetchInfos());
      let interval = setInterval(
        () => dispatch(fetchInfos()),
        120000
      );
      return () => clearInterval(interval);
    }
  }, [user]);
  if (!infos) {
    return null;
  }

  const formatInfos = (id) => {
    return infos[id].list.map(({ title, content, createdAt }) => ({
      title,
      content,
      date: moment(createdAt).locale('fr').format('dddd HH:mm'),
    }));
  };

  return (
    <div id="dashboard-infos">
      <i className="fas fa-sync-alt refresh" onClick={() => document.location.reload()}/>
      <Title level={3}>{infos[user.team.tournamentId].name}</Title>
      <Table columns={columns} dataSource={formatInfos(user.team.tournamentId)} className="infos-table" />
      <br />
      <Title level={3}>Général</Title>
      <Table columns={columns} dataSource={formatInfos(0)} className="infos-table" />
    </div>
  );
};

export default Infos;
