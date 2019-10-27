import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { fetchInfos, postInfo } from '../../modules/infos';
import { Tabs, Table, Button, Modal, Input, Textarea } from '../../components/UI';
import './notif.css';

const columns = [
  { title: 'Titre', key: 'title' },
  { title: 'Contenu', key: 'content' },
  { title: 'Date', key: 'date' },
  { title: '', key: 'action' },
];

const initialForm = { title: '', content: '' };

const Notif = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [currentTournament, setCurrentTournament] = useState('');
  const [form, setForm] = useState(initialForm);
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
  const openModal = (tournamentId) => {
    setCurrentTournament(tournamentId);
    setVisible(true);
  };

  const sendInfo = () => {
    dispatch(postInfo(form, currentTournament));
    setVisible(false);
    setForm(initialForm);
  };

  const infosTabs = Object.entries(infos).map(([tournamentId, infosTournament]) => {
    const infosFormat = infosTournament.map((info) => ({
      ...info,
      date: moment(info.createdAt).format('DD/MM HH:mm'),
    }));
    return ({
      title: tournamentId,
      content: (<>
        <Table columns={columns} dataSource={infosFormat} alignRight className="infos-table" />
        <Button primary onClick={() => openModal(tournamentId)}>Ajouter une info</Button>
      </>),
    });
  });
  return (
    <div id='admin-notif'>
      <Tabs tabs={infosTabs}/>
      <Modal
        visible={visible}
        title="Ajouter une info"
        onCancel={() => setVisible(false)}
        buttons={<Button primary onClick={sendInfo}>Envoyer</Button>}
      >
        <Input label="Titre" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
        <Textarea label="Contenu" value={form.content} onChange={(v) => setForm({ ...form, content: v })} />
      </Modal>
    </div>
  );
};

export default Notif;
