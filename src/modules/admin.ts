import { createSlice, type Dispatch } from '@reduxjs/toolkit';
import { API } from '@/utils/api';
import { AdminPartner, AdminTournament } from '@/types';
import {
  getPartnerLogoName,
  PARTNER_FOLDER,
  getTournamentImageName,
  TOURNAMENT_FOLDER,
  getTournamentRulesName,
  getTournamentBackgroundName,
  getPartnerLogoLink,
} from '@/utils/uploadLink';
import { deleteFile, uploadFile } from '@/utils/upload';
import * as normalPartners from '@/modules/partners';
import * as normalTournament from '@/modules/tournament';
import { toast } from 'react-toastify';

export interface AdminAction {
  partners: AdminPartner[] | null;
  tournaments: AdminTournament[] | null;
}

const initialState: AdminAction = {
  partners: null,
  tournaments: null,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminPartners: (state, action) => {
      state.partners = action.payload;
    },
    addAdminPartner: (state, action) => {
      state.partners ? (state.partners = [...state.partners!, action.payload]) : (state.partners = [action.payload]);
    },
    updateAdminPartner: (state, action) => {
      state.partners = state.partners?.map((partner) => {
        if (partner.id === action.payload.id) {
          return action.payload;
        }
        return partner;
      }) as AdminPartner[];
    },
    deleteAdminPartner: (state, action) => {
      state.partners = state.partners?.filter((partner) => partner.id !== action.payload) as AdminPartner[];
    },

    setAdminTournaments: (state, action) => {
      state.tournaments = action.payload;
    },
    updateAdminTournament: (state, action) => {
      state.tournaments = state.tournaments?.map((tournament) => {
        if (tournament.id === action.payload.id) {
          return action.payload;
        }
        return tournament;
      }) as AdminTournament[];
    },
  },
});

export const {
  setAdminPartners,
  addAdminPartner,
  updateAdminPartner,
  deleteAdminPartner,
  setAdminTournaments,
  updateAdminTournament,
} = adminSlice.actions;

export const fetchAdminPartners = () => async (dispatch: Dispatch) => {
  const request = await API.get('admin/partners');
  dispatch(setAdminPartners(request));
};

export const addPartner =
  (partner: AdminPartner, logo: File | null, callback: () => void) => async (dispatch: Dispatch) => {
    try {
      const result = await API.post('admin/partners', {
        name: partner.name,
        link: partner.link,
        display: partner.display.toString(),
      });

      if (result && logo) {
        await uploadFile(logo, getPartnerLogoName(result.id), PARTNER_FOLDER);
      }

      callback();
      toast.success('Le partenaire a bien été ajouté');

      dispatch(addAdminPartner(result));
      dispatch(normalPartners.addPartner(result));
    } catch (err) {
      console.error(err);
    }
  };

export const updatePartner =
  (partner: AdminPartner, logo: File | null, callback: () => void) => async (dispatch: Dispatch) => {
    try {
      const result = await API.patch(`admin/partners/${partner.id}`, {
        name: partner.name,
        link: partner.link,
        display: partner.display.toString(),
      });

      if (result && logo) {
        await uploadFile(logo, getPartnerLogoName(result.id), PARTNER_FOLDER);
      }

      callback();
      toast.success('Le partenaire a bien été mis à jour');

      dispatch(updateAdminPartner(result));
      dispatch(normalPartners.updatePartner(result));
    } catch (err) {
      console.error(err);
    }
  };

export const deletePartner = (partnerId: string, callback: () => void) => async (dispatch: Dispatch) => {
  try {
    await API.delete(`admin/partners/${partnerId}`);

    await deleteFile(getPartnerLogoLink(partnerId).replace(process.env.NEXT_PUBLIC_UPLOADS_URL!, ''));

    callback();
    toast.success('Le partenaire a bien été supprimé');

    dispatch(deleteAdminPartner(partnerId));
    dispatch(normalPartners.deletePartner(partnerId));
  } catch (err) {
    console.error(err);
  }
};

export const fetchAdminTournaments = () => async (dispatch: Dispatch) => {
  const request = await API.get('admin/tournaments');
  dispatch(setAdminTournaments(request));
};

export const updateTournament =
  (
    tournament: AdminTournament,
    image: File | null,
    background: File | null,
    rules: File | null,
    callback: () => void,
  ) =>
  async (dispatch: Dispatch) => {
    try {
      const data = {
        name: tournament.name,
        maxPlayers: tournament.maxPlayers,
        playersPerTeam: tournament.playersPerTeam,
        display: tournament.display.toString(),
        displayCasters: tournament.displayCasters.toString(),
        displayCashprize: tournament.displayCashprize.toString(),
      } as unknown as AdminTournament;

      if (tournament.cashprizeDetails !== null) {
        data.cashprizeDetails = tournament.cashprizeDetails;
      }

      if (tournament.infos !== null) {
        data.infos = tournament.infos;
      }

      if (tournament.format !== null) {
        data.format = tournament.format;
      }

      if (tournament.cashprize !== null) {
        data.cashprize = tournament.cashprize;
      }

      if (tournament.casters !== null) {
        data.casters = tournament.casters;
      }

      const result = await API.patch(`admin/tournaments/${tournament.id}`, data);

      if (image) {
        await uploadFile(image, getTournamentImageName(tournament.id), TOURNAMENT_FOLDER);
      }

      if (background) {
        await uploadFile(background, getTournamentBackgroundName(tournament.id), TOURNAMENT_FOLDER);
      }

      if (rules) {
        await uploadFile(rules, getTournamentRulesName(tournament.id), TOURNAMENT_FOLDER);
      }

      callback();
      toast.success('Le tournoi a bien été mis à jour');

      dispatch(updateAdminTournament(result));
      dispatch(normalTournament.updateTournament(result));
    } catch (err) {
      console.error(err);
    }
  };

export default adminSlice.reducer;
