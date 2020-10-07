import React from 'react';

export default {
  information: {
    catchPhrase: 'Un format repensé, toujours la même ambiance !',
    description: (
      <>
        L'UTT Arena revient pour sa 18<sup>ème</sup> édition les{' '}
        <span className="accent">27, 28 et 29 novembre 2020</span>. Cette édition aura lieu pour la première fois{' '}
        <span className="accent">intégralement en ligne</span>. Au programme,{' '}
        <span className="accent">6 tournois spotlights</span> sur des incontournables de l'esport, du skill, des
        personnalités et des rencontres, de nombreuses animations, avec bien sûr des{' '}
        <span className="accent">lots</span> à gagner, qui rendront cette édition plus intense et vibrante que jamais.
        Comme toujours des invités de qualité seront présents pour streamer et commenter tes meilleures games ! Alors
        prépare tout ton stuff et <span className="accent">impose-toi dans l'arène !</span>
      </>
    ),
    tableColumns: [
      { title: '', key: 'title' },
      { title: '', key: 'description' },
    ],
    tableRows: [
      {
        title: <strong>Format</strong>,
        description: "A distance : chez toi, avec ton matos, prépare ton meilleur spot et c'est parti !",
      },
      { title: <strong>Ouverture</strong>, description: '27 novembre 2020 - 17h' },
      { title: <strong>Fermeture</strong>, description: '29 novembre 2020 - 18h' },
      { title: <strong>Début des tournois</strong>, description: 'Samedi 28 novembre à 10h précises' },
      { title: <strong>Places</strong>, description: '450 joueurs' },
      { title: <strong>Tarif</strong>, description: 'Gratuit !' },
      { title: <strong>Âge minimum</strong>, description: '15 ans' },
      {
        title: <strong>Tournois avec lots à gagner</strong>,
        description: 'LoL Pro, CS:GO, SSBU, Rocket League, TFT, Valorant',
      },
    ],
  },
};
