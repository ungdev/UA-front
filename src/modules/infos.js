import { toast } from 'react-toastify';

import { API } from '../utils/api';

export const SET_INFOS = 'infos/SET_INFOS';
export const SET_FETCH = 'infos/SET_FETCH';

const initialState = {
  all: [
    { id: 0, name: 'Général', list: [] },
    { id: 1, name: 'LoL (Pro)', list: [] },
    { id: 2, name: 'LoL (Amateur)', list: [] },
    { id: 3, name: 'Fortnite', list: [] },
    { id: 4, name: 'CS:GO', list: [] },
    { id: 5, name: 'SSBU', list: [] },
    { id: 6, name: 'osu!', list: [] },
    { id: 7, name: 'Libre', list: [] },
  ],
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INFOS:
      return {
        ...state,
        all: action.all,
      };
    case SET_FETCH:
      return {
        ...state,
        isFetched: true,
      };
    default:
      return state;
  }
};

export const fetchInfos = () => async (dispatch) => {
  const res = await API.get('infos');
  const initial = JSON.parse(JSON.stringify(initialState.all));
  const formatInfos = res.data.reduce((previousVal, info) => {
    previousVal[info.tournamentId || 0].list.push(info);
    return previousVal;
  }, initial);
  dispatch({
    type: SET_INFOS,
    all: formatInfos,
  });
  dispatch({
    type: SET_FETCH,
  });
};

export const postInfo = (form, tournament) => async (dispatch, getState) => {
  const tournamentId = tournament === 0 ? undefined : tournament;
  const res = await API.post('infos', { ...form, tournamentId });
  const allInfos = getState().infos.all;
  allInfos[res.data.tournamentId || 0].list.push(res.data);
  toast.success('Notification envoyée');
  dispatch({
    type: SET_INFOS,
    all: allInfos,
  });
};

export const deleteInfo = (infoId, tournamentId) => async (dispatch, getState) => {
  await API.delete(`infos/${infoId}`);
  const allInfos = getState().infos.all;
  const filterInfos = allInfos[tournamentId].list.filter((info) => info.id !== infoId);
  allInfos[tournamentId].list = filterInfos;
  toast.success('Notification supprimée');
  dispatch({
    type: SET_INFOS,
    all: allInfos,
  });
};
