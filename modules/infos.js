import { API } from '../utils';
import moment from 'moment';

export const SET_INFOS = 'infos/SET_INFOS';

const initialState = {
  all: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INFOS:
      return {
        ...state,
        all: action.all,
      };
    default:
      return state;
  }
};

export const fetchInfos = () => async (dispatch) => {
  //const res = await API.get('/infos');
  const res = {
    data: [
      { title: 'TEST', content: 'ouioui', createdAt: '2019-10-12 22:26:55', tournamentId: 1, id: 1 },
      { title: 'TEST', content: 'ouioui', createdAt: '2019-10-12 22:26:55', tournamentId: 1, id: 12 },
      { title: 'TEST', content: 'ouioui', createdAt: '2019-10-12 22:26:55', tournamentId: 2, id: 13 },
      { title: 'TEST', content: 'ouioui', createdAt: '2019-10-12 22:26:55', tournamentId: 3, id: 14 },
      { title: 'TEST', content: 'ouioui', createdAt: '2019-10-12 22:26:55', tournamentId: 4, id: 16 },
      { title: 'TEST', content: 'ouioui', createdAt: '2019-10-12 22:26:55', tournamentId: 5, id: 15 },
      { title: 'TEST', content: 'ouioui', createdAt: '2019-10-12 22:26:55', tournamentId: 6, id: 1234 },
      { title: 'TEST', content: 'ouioui', createdAt: '2019-10-12 22:26:55', tournamentId: 7, id: 135 },
      { title: 'TEST', content: 'ouioui', createdAt: '2019-10-12 22:26:55', tournamentId: null, id: 145 },
      { title: 'TEST', content: 'ouioui', createdAt: '2019-10-12 22:26:55', tournamentId: null, id: 13553 },
    ],
  };
  const formatInfos = res.data.reduce((previousVal, info) => {
    if (info.tournamentId === null) {
      info.tournamentId = 'all';
    }
    if (previousVal[info.tournamentId]) {
      previousVal[info.tournamentId].push(info);
    }
    else {
      previousVal[info.tournamentId] = [info];
    }
    return previousVal;
  }, {});
  dispatch({
    type: SET_INFOS,
    all: formatInfos,
  });
};

export const postInfo = (form, tournamentId) => async (dispatch, getState) => {
  //const res = await API.post('infos', { ...form, tournamentId });
  const allInfos = getState().infos.all;
  allInfos[tournamentId].push({ ...form, createdAt: moment.now(), tournamentId });
  dispatch({
    type: SET_INFOS,
    all: allInfos,
  });
};

export const deleteInfo = (infoId, tournamentId) => async (dispatch, getState) => {
  //const res = await API.delete(`infos/${infoId}`);
  const allInfos = getState().infos.all;
  const updatedInfos = allInfos[tournamentId].filter((info) => info.id !== infoId);
  dispatch({
    type: SET_INFOS,
    all: { ...allInfos, [tournamentId]: updatedInfos },
  });
};