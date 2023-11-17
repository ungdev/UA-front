// Consts
export const TOURNAMENT_FOLDER = 'tournaments';
export const PARTNER_FOLDER = 'partners';

// Tournaments
export const getTournamentImageName = (tournamentId: string) => {
  return `${tournamentId}-image`;
};

export const getTournamentBackgroundName = (tournamentId: string) => {
  return `${tournamentId}-background`;
};

export const getTournamentRulesName = (tournamentId: string) => {
  return `${tournamentId}-rules`;
};

export const getTournamentImageLink = (tournamentId: string) => {
  return `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${TOURNAMENT_FOLDER}/${getTournamentImageName(tournamentId)}.webp`;
};

export const getTournamentBackgroundLink = (tournamentId: string) => {
  return `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${TOURNAMENT_FOLDER}/${getTournamentBackgroundName(tournamentId)}.webp`;
};

export const getTournamentRulesLink = (tournamentId: string) => {
  // WARN: this is not a recommanded way to do it
  if (tournamentId === 'osu') return 'https://osu.ppy.sh/community/forums/topics/1832607';

  return `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${TOURNAMENT_FOLDER}/${getTournamentRulesName(tournamentId)}.pdf`;
};

// Partners
export const getPartnerLogoName = (partnerId: string) => {
  return `${partnerId}-logo`;
};

export const getPartnerLogoLink = (partnerId: string) => {
  return `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${PARTNER_FOLDER}/${getPartnerLogoName(partnerId)}.webp`;
};
