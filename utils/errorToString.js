export default (error) => {
  console.log(error);
  switch (error) {
    case 'DISABLED_LOGIN':
      return 'Inscription désactivée';
    case 'INVALID_FORM':
      if (error.details) {
        return error.details.map((detail) => {
          return 'salut, ';
        });
      }
      else {
        return 'Formulaire invalide';
      }
    case 'PASSWORD_MISMATCH':
      return 'Les deux mots de passe ne correspondent pas';
    case 'INVALID_USERNAME':
      return 'Nom d\'utilisateur invalide';
    case 'INVALID_EMAIL':
      return 'E-mail introuvable';
    case 'INVALID_PASSWORD':
      return 'Mot de passe invalide';
    case 'ALREADY_IN_TEAM':
      return 'Vous êtes déjà dans une équipe';
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
      return 'Il n\'y a plus de places visiteur';
    case 'LAN_FULL':
      return 'Il n\'y a plus de place pour l\'UTT Arena...';
    case 'PAYMENT_DISABLED':
      return 'Les paiements en ligne ont été désactivés';
    case 'UNKNOWN':
      return 'Une erreur est survenue';
    default:
      return error;
  }
};