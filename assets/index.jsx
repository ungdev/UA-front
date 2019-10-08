import React from 'react';

export default {
  information: {
    catchPhrase: 'Venez participer à la plus grosse LAN de la région !',
    description: (
      <>
        L'UTT Arena revient pour sa 17<sup>ème</sup> édition les <span className="accent">6, 7 et 8 décembre 2019</span>.
        Cette édition aura lieu – comme l'année dernière – dans le cadre du <span className="accent">Festival des Jeux</span> au Parc des Expositions de Troyes, le Cube.
        Au programme, <span className="accent">5 tournois spotlights</span> sur des incontournables de l'esport, du skill, des personnalités et des rencontres, de nombreuses animations, des <span className="accent">lots</span> et du <span className="accent">cashprize</span> à gagner, qui rendront cette édition plus intense et vibrante que jamais.
        Pas fan des jeux proposés ? Pas envie d'être dans un cadre compétitif ? L'UTT Arena propose un <span className="accent">tournoi libre</span>, composé des jeux que vous choisissez ! Alors prends tout ton stuff et <span className="accent">impose-toi dans l'arène au Cube Troyes Champagne Expo !</span>
      </>
    ),
    tableColumns: [
      { title: '', key: 'title' },
      { title: '', key: 'description' },
    ],
    tableRows: [
      { title: <strong>Format</strong>, description: 'Bring Your Own Stuff : ramène ton ordinateur, écran, souris, tapis de souris, casque, multiprise et câble RJ45 de 5m minimum… Bref, tout ce dont tu as besoin pour jouer' },
      { title: <strong>Ouverture</strong>, description: '6 décembre 2019 - 17h' },
      { title: <strong>Fermeture</strong>, description: '8 décembre 2019 - 18h' },
      { title: <strong>Début des tournois</strong>, description: 'Samedi 7 décembre à 10h précises' },
      { title: <strong>Nourriture</strong>, description: 'Sur place, pendant tout l\'événement' },
      { title: <strong>Places</strong>, description: '450 joueurs' },
      { title: <strong>Tarifs</strong>, description: 'Joueur 20€, Accompagnateur 12€' },
      { title: <strong>Âge minimum</strong>, description: '15 ans' },
      { title: <strong>Tournois avec Cashprize</strong>, description: 'LoL Pro, CS:GO, SSBU, Fortnite' },
      { title: <strong>Tournois sans Cashprize</strong>, description: 'LoL Amateur, osu!, tournoi libre' },
    ],
  },
};