// Consts
export const TOURNAMENT_FOLDER = 'tournaments';
export const PARTNER_FOLDER = 'partners';

// Tournaments
export const getTournamentImageName = (tournamentId: string) => {
  return `${tournamentId}_image`;
};

export const getTournamentBackgroundName = (tournamentId: string) => {
  return `${tournamentId}_background`;
};

export const getTournamentRulesName = (tournamentId: string) => {
  return `${tournamentId}_rules`;
};

export const getTournamentImageLink = (tournamentId: string) => {
  return `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${TOURNAMENT_FOLDER}/${getTournamentImageName(tournamentId)}.jpg`;
};

export const getTournamentBackgroundLink = (tournamentId: string) => {
  return `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${TOURNAMENT_FOLDER}/${getTournamentBackgroundName(tournamentId)}.jpg`;
};

export const getTournamentRulesLink = (tournamentId: string) => {
  return `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${TOURNAMENT_FOLDER}/${getTournamentRulesName(tournamentId)}.pdf`;
};

// Partners
export const getPartnerLogoName = (partnerId: string) => {
  return `${partnerId}-logo`;
};

export const getPartnerLogoLink = (partnerId: string) => {
  return `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${PARTNER_FOLDER}/${getPartnerLogoName(partnerId)}.png`;
};
