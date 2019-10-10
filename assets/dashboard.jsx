import React from 'react';

export default {
  register: {
    create: {
      info: (
        <p>
          Je veux créer mon équipe pour pouvoir rejoindre un tournoi.<br />
          Je serai chef d'équipe et je pourrai gérer les membres de mon équipe.
        </p>
      ),
      discord: <p>Il te manque un ou plusieurs joueurs ? Viens recruter sur notre <a href="https://discord.gg/TenDPRS">discord</a>.</p>,
    },
    join: {
      info: (
        <p>
          Je veux rejoindre une équipe déjà créée pour un tournoi.<br />
          Le chef d'équipe devra accepter ma demande.
        </p>
      ),
      discord: <p>Tu n'as pas encore de coéquipier ? Pas de soucis, viens en trouver un sur notre <a href="https://discord.gg/TenDPRS">discord</a>.</p>,
    },
    solo: <p>Je veux rejoindre un tournoi solo (SSBU, osu! ou libre)</p>,
    coach: <p>Tu es coach, manager ou accompagnateur ? C'est ici pour prendre sa place.</p>,
  },
};