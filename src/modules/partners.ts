import { uploads } from '../utils/api';

export const SET_PARTNERS = 'partners/SET_PARTNERS';

const initialState = {
  partners: undefined,
};

const partners = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PARTNERS:
      return {
        ...state,
        partners: action.partners,
      };
    default:
      return state;
  }
};

export const fetchPartners = async (dispatch: any) => {
  const request = await uploads.get('/partners/list.json', true);
  console.log(request);
  dispatch({
    type: SET_PARTNERS,
    partners: request,
  });
};

export default partners;
