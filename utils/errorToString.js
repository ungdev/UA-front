const params = {
  username: 'Pseudo',
  lastname: 'Nom',
  firstname: 'Prénom',
  password: 'Mot de passe',
  email: 'Email',
  teamName: 'Nom d\'équipe',
};

export default (res) => {
  switch (res.error) {
    case 'INVALID_FORM':
      if (res.details) {
        const detail = res.details[Object.keys(res.details)[0]];

        let detailText = `${params[detail.param] || `Champ "${detail.param}"`} invalide`;
        if (detail.msg === 'Invalid value' && detail.value === '') {
          detailText = `Veuillez remplir le champ "${params[detail.param] || detail.param}"`;
        }
        else if (detail.param === 'password' && detail.value.length < 6) {
          detailText = 'Le mot de passe doit contenir au moins 6 caractères';
        }

        return detailText;
      }
      else {
        return 'Formulaire invalide';
      }
    case 'PASSWORD_MISMATCH':
      return 'Les deux mots de passe ne correspondent pas';
    case 'INVALID_CREDENTIALS':
      return 'Nom d\'utilisateur ou mot de passe incorrect';
    case 'INVALID_TOKEN':
      return 'Jeton invalide';
    case 'EMAIL_NOT_FOUND':
      return 'E-mail introuvable';
    case 'USER_NOT_FOUND':
      return 'Utilisateur introuvable';
    case 'USER_NOT_ACTIVATED':
      return 'Compte non activé, vérifiez votre boîte email';
    case 'NOT_PAID':
      return 'Vous devez avoir payé votre place';
    case 'ALREADY_IN_TEAM':
      return 'Vous êtes déjà dans une équipe';
    case 'SPOTLIGHT_FULL':
      return 'Le tournoi est plein';
    case 'DUPLICATE_ENTRY':
      return 'Le pseudo ou l\'adresse email est déjà utilisé';
    case 'VISITOR_FULL':
      return 'Il n\'y a plus de places coach';
    case 'LAN_FULL':
      return 'Il n\'y a plus de place pour l\'UTT Arena...';
    case 'CANNOT_CHANGE':
      return 'Vous ne pouvez pas changer de type de place';
    case 'DISABLED_LOGIN':
      return 'Inscription désactivée';
    case 'PAYMENT_DISABLED':
      return 'Les paiements en ligne ont été désactivés';
    case 'NO_TEAM':
      return 'L\'utilisateur n\'a pas d\'équipe';
    case 'NO_TYPE':
      return 'L\'utilisateur n\'a pas de rôle';
    case 'ALREADY_PAID':
      return 'L\'utilisateur a déjà une place';
    case 'TOURNAMENT_FULL':
      return 'Le tournoi est plein';
    case 'UNAUTHORIZED':
      return 'Vous n\'avez pas la permission';
    case 'ALREADY_SCANNED':
      return 'Billet déjà scanné';
    case 'USER_NOT_PAID':
      return 'L\'utilisateur n\'a pas payé';
    case 'UNKNOWN':
      return 'Une erreur est survenue';
    default:
      return res.error;
  }
};