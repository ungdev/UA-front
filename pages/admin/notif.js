import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { fetchInfos } from '../../modules/infos';
import { Tabs, Table, Button } from '../../components/UI';

const columns = [
  { title: 'Titre', key: 'title' },
  { title: 'Contenu', key: 'content' },
  { title: 'Date', key: 'date' },
  { title: '', key: 'action' },
];

const Notif = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.user);
  const infos = useSelector((state) => state.infos.all);
  useEffect(() => {
    if (isLoggedIn && !infos) {
      dispatch(fetchInfos());
    }
  }, [isLoggedIn]);
  if (!infos) {
    return null;
  }
  const infosTabs = Object.entries(infos).map(([tournamentId, infosTournament]) => {
    const infosFormat = infosTournament.map((info) => ({
      ...info,
      date: moment(infosTournament.createdAt).format('DD/MM HH:mm'),
    }));
    return ({
      title: tournamentId,
      content: (<>
        <Table columns={columns} dataSource={infosFormat} alignRight />
        <Button primary>Ajouter une info</Button>
      </>),
    });
  });
  return (
    <div>
      <Tabs tabs={infosTabs}/>
    </div>
  );
};

export default Notif;
