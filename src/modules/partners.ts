import { Action, Dispatch } from '@reduxjs/toolkit';
import { uploads } from '../utils/api';
import { Partner } from '@/types';

export const SET_PARTNERS = 'partners/SET_PARTNERS';

const initialState = {
  partners: undefined,
};

interface PartnersAction extends Action {
  partners: Partner[];
}

const partners = (state = initialState, action: PartnersAction) => {
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

export const fetchPartners = async (dispatch: Dispatch) => {
  const request = await uploads.get('/partners/list.json', true);
  console.log(request);
  dispatch({
    type: SET_PARTNERS,
    partners: request,
  });
};

export default partners;
