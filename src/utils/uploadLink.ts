// Tournaments

export const getTournamentImageLink = (tournamentId: string) => {
  return `${process.env.NEXT_PUBLIC_UPLOADS_URL}/tournaments/${tournamentId}-image.jpg`;
};

export const getTournamentBackgroundLink = (tournamentId: string) => {
  return `${process.env.NEXT_PUBLIC_UPLOADS_URL}/tournaments/${tournamentId}-background.jpg`;
};

export const getTournamentRulesLink = (tournamentId: string) => {
  return `${process.env.NEXT_PUBLIC_UPLOADS_URL}/tournaments/${tournamentId}-rules.pdf`;
};

// Partners

export const getPartnerLogoLink = (partnerId: string) => {
  return `${process.env.NEXT_PUBLIC_UPLOADS_URL}/partners/${partnerId}-logo.png`;
};
