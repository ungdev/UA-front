import { API } from '../utils';

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
      { title: 'TEST', content: 'ouioui', createdAt: '2019-10-12 22:26:55', tournamentId: 1 },
      { title: 'TEST', content: 'ouioui', createdAt: '2019-10-12 22:26:55', tournamentId: 1 },
      { title: 'TEST', content: 'ouioui', createdAt: '2019-10-12 22:26:55', tournamentId: 2 },
      { title: 'TEST', content: 'ouioui', createdAt: '2019-10-12 22:26:55', tournamentId: 3 },
      { title: 'TEST', content: 'ouioui', createdAt: '2019-10-12 22:26:55', tournamentId: 4 },
      { title: 'TEST', content: 'ouioui', createdAt: '2019-10-12 22:26:55', tournamentId: 5 },
      { title: 'TEST', content: 'ouioui', createdAt: '2019-10-12 22:26:55', tournamentId: 6 },
      { title: 'TEST', content: 'ouioui', createdAt: '2019-10-12 22:26:55', tournamentId: 7 },
      { title: 'TEST', content: 'ouioui', createdAt: '2019-10-12 22:26:55', tournamentId: null },
      { title: 'TEST', content: 'ouioui', createdAt: '2019-10-12 22:26:55', tournamentId: null },
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