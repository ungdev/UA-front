export default (error) => {
  switch (error) {
    case 'DISABLED_LOGIN':
      return 'Inscription désactivée';
    case 'INVALID_FORM':
      return 'Formulaire incomplet';
    case 'PASSWORD_MISMATCH':
      return 'Les mots de passe ne correspondent pas';
    case 'INVALID_USERNAME':
      return 'Nom d\'utilisateur invalide';
    case 'INVALID_PASSWORD':
      return 'Mot de passe invalide';
    case 'ALREADY_IN_TEAM':
      return 'Vous êtes déjà dans une équipe';
    case 'INVALID_EMAIL':
      return 'E-mail introuvable';
    case 'INVALID_TOKEN':
      return 'Jeton invalide';
    case 'USER_NOT_ACTIVATED':
      return 'Compte non activé, vérifiez votre boîte mail';
    case 'NOT_PAID':
      return 'Vous devez avoir payé votre place';
    case 'SPOTLIGHT_FULL':
      return 'Le tournoi est plein';
    case 'DUPLICATE_ENTRY':
      return 'Le pseudo ou le mail est déjà utilisé';
    case 'VISITOR_FULL':
      return 'Il n\'y a plus de places coach';
    case 'UNKNOWN':
      return 'Une erreur est survenue';
    case 'LAN_FULL':
      return 'Il n\'y a plus de place pour l\'UTT Arena...';
    case 'PAYMENT_DISABLED':
      return 'Les paiements en ligne ont été désactivés';
    case 'NO_TEAM':
      return 'L\'utilisateur n\'a pas d\'équipe';
    case 'NO_TYPE':
      return 'L\'utilisateur n\'a pas de rôle';
    case 'ALREADY_PAID':
      return 'L\'utilisateur a pas déjà une place';
    case 'TOURNAMENT_FULL':
      return 'Tournoi plein';
    default:
      return error;
  }
};