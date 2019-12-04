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
  { title: 'Auteur', key: 'author' },
  { title: '', key: 'action' },
];

const initialForm = { title: '', content: '' };

const Notification = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [deletedInfo, setDeletedInfo] = useState(null);
  const [generalInfo, setGeneralInfo] = useState(false);
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

  const checkIfShouldOpenGeneralModal = () => {
    if(currentTournament.id === 0) {
      setGeneralInfo(true);
    }
    else {
      sendInfo();
    }
  };

  const sendInfo = () => {
    dispatch(postInfo(form, currentTournament.id));
    setGeneralInfo(false);
    setVisible(false);
    setForm(initialForm);
  };

  const infosTabs = infos.map((infosTournament) => {
    const infosFormat = infosTournament.list.map((info) => ({
      ...info,
      date: moment(info.createdAt).locale('fr').format('dddd HH:mm'),
      author: `${info.user.firstname} ${info.user.lastname[0]}.`,
      action: <Button
        onClick={() => setDeletedInfo({ tournamentId: infosTournament.id, id: info.id })}
        rightIcon="fas fa-trash"
        noStyle
      />,
    }));
    return ({
      title: infosTournament.name,
      content: (<>
        <Table columns={columns} dataSource={infosFormat} alignRight className="infos-table" />
        <Button primary onClick={() => openModal({ id: infosTournament.id, name: infosTournament.name })}>Envoyer une notification</Button>
      </>),
    });
  });
  return (
    <div id="admin-notif">
      <Tabs tabs={infosTabs}/>
      <Modal
        visible={visible}
        title="Envoyer une notification"
        onCancel={() => setVisible(false)}
        buttons={<Button primary onClick={checkIfShouldOpenGeneralModal}>Envoyer</Button>}
      >
        <p>Envoyer à : <strong>{currentTournament.name}</strong></p>
        <Input label="Titre" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
        <Textarea label="Contenu" value={form.content} onChange={(v) => setForm({ ...form, content: v })} />
      </Modal>
      <Modal
        visible={generalInfo}
        title="Notifier le canal général"
        onCancel={() => setGeneralInfo(false)}
        onOk={sendInfo}
        >
          Êtes-vous sûr d'envoyer une notification aux 450 joueurs ?
      </Modal>
      <Modal
        visible={!!deletedInfo}
        title="Supprimer la notification"
        onCancel={() => setDeletedInfo(null)}
        onOk={() => {
          dispatch(deleteInfo(deletedInfo.id, deletedInfo.tournamentId));
          setDeletedInfo(null);
        }}
      >
        Êtes-vous sûr de vouloir supprimer la notification ?
      </Modal>
    </div>
  );
};

export default Notification;
