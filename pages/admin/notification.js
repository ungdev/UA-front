import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { fetchInfos, postInfo, deleteInfo } from '../../modules/infos';
import { Tabs, Table, Button, Modal, Input, Textarea } from '../../components/UI';
import './notification.css';

const columns = [
  { title: 'Titre', key: 'title' },
  { title: 'Contenu', key: 'content' },
  { title: 'Date', key: 'date' },
  { title: '', key: 'action' },
];

const initialForm = { title: '', content: '' };

const Notification = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [deletedInfo, setDeletedInfo] = useState(null);
  const [currentTournament, setCurrentTournament] = useState('');
  const [form, setForm] = useState(initialForm);
  const isLoggedIn = useSelector((state) => state.login.user);
  const { all: infos, isFetched } = useSelector((state) => state.infos);
  useEffect(() => {
    if (isLoggedIn && !isFetched) {
      dispatch(fetchInfos());
    }
  }, [isLoggedIn]);
  if (!infos) {
    return null;
  }
  const openModal = (tournament) => {
    setCurrentTournament(tournament);
    setVisible(true);
  };

  const sendInfo = () => {
    dispatch(postInfo(form, currentTournament.id));
    setVisible(false);
    setForm(initialForm);
  };

  const infosTabs = infos.map((infosTournament) => {
    const infosFormat = infosTournament.list.map((info) => ({
      ...info,
      date: moment(info.createdAt).locale('fr').format('dddd HH:mm'),
      action: <Button onClick={() => setDeletedInfo({ tournamentId: infosTournament.id, id: info.id })}><i className="fas fa-trash" /></Button>,
    }));
    return ({
      title: infosTournament.name,
      content: (<>
        <Table columns={columns} dataSource={infosFormat} alignRight className="infos-table" />
        <Button primary onClick={() => openModal({ id: infosTournament.id, name: infosTournament.name })}>Ajouter une info</Button>
      </>),
    });
  });
  return (
    <div id='admin-notif'>
      <Tabs tabs={infosTabs}/>
      <Modal
        visible={visible}
        title={(<><div>Ajouter une info</div><div>{currentTournament.name}</div></>)}
        onCancel={() => setVisible(false)}
        buttons={<Button primary onClick={sendInfo}>Envoyer</Button>}
      >
        <Input label="Titre" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
        <Textarea label="Contenu" value={form.content} onChange={(v) => setForm({ ...form, content: v })} />
      </Modal>
      <Modal
        visible={!!deletedInfo}
        title=""
        onCancel={() => setDeletedInfo(null)}
        onOk={() => {
          dispatch(deleteInfo(deletedInfo.id, deletedInfo.tournamentId));
          setDeletedInfo(null);
        }}
      >
        Confirmez la suppresion de l'info
      </Modal>
    </div>
  );
};

export default Notification;
