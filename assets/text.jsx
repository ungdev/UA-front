/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

const text = {
  head: {
    title: 'UTT Arena 2019 - 6, 7 et 8 décembre 2019',
    description: 'VENEZ PARTICIPER À LA PLUS GROSSE LAN DE LA RÉGION ! L\'UTT Arena revient pour sa 17ème édition les 6, 7 et 8 décembre 2019. Cette édition aura lieu – comme l\'année dernière – dans le cadre du Festival des Jeux au Parc des Expositions de Troyes, le Cube. Au programme, 5 tournois sur des incontournables de l\'esport, du skill, des personnalités et des rencontres, de nombreuses animations, des lots et du cashprize à gagner, qui rendront cette édition plus intense et vibrante que jamais. Pas fan des jeux proposés ? Pas envie d\'être dans un cadre compétitif ? L\'UTT Arena propose un tournoi libre, composé des jeux que vous choisissez ! Alors prends tout ton stuff et impose-toi dans l\'arène au Cube Troyes Champagne Expo !',
  },
  index: {
    information: {
      catchPhrase: 'VENEZ PARTICIPER À LA PLUS GROSSE LAN DE LA RÉGION !',
      description: (
        <>
          L'UTT Arena revient pour sa 17<sup>ème</sup> édition les <span className="main-color">6, 7 et 8 décembre 2019</span>.
          Cette édition aura lieu – comme l'année dernière – dans le cadre du <span className="main-color">Festival des Jeux</span> au Parc des Expositions de Troyes, le Cube.
          Au programme, <span className="main-color">5 tournois</span> sur des incontournables de l'esport, du skill, des personnalités et des rencontres, de nombreuses animations, des <span className="main-color">lots</span> et du <span className="main-color">cashprize</span> à gagner, qui rendront cette édition plus intense et vibrante que jamais.
          Pas fan des jeux proposés ? Pas envie d'être dans un cadre compétitif ? L'UTT Arena propose un <span className="main-color">tournoi libre</span>, composé des jeux que vous choisissez ! Alors prends tout ton stuff et <span className="main-color">impose-toi dans l'arène au Cube Troyes Champagne Expo !</span>
        </>),
    },
    tournois: {
      catchPhrase: 'LES QUATRE JEUX À L\'UTT ARENA 2019',
    },
  },
  tournamentList: [
    {
      title: 'League of Legends (Pro)',
      cashprize: 'à venir',
      slot: 16,
      img: '/static/lolpro.webp',
      link: '/tournaments/lolpro',
    },
    {
      title: 'League of Legends (Amateur)',
      cashprize: 'à venir',
      slot: 16,
      img: '/static/lolamateur.webp',
      link: '/tournaments/lolamateur',
    },
    {
      title: 'Super Smash Bros Ultimate',
      cashprize: 'à venir',
      slot: 32,
      img: '/static/ssbu.webp',
      link: '/tournaments/ssbu',
    },
    {
      title: 'Counter-Strike : Global Offensive',
      cashprize: 'à venir',
      slot: 16,
      img: '/static/csgo.webp',
      link: '/tournaments/csgo',
    },
    {
      title: 'Fortnite',
      cashprize: 'à venir',
      slot: 32,
      img: '/static/fortnite.webp',
      link: '/tournaments/fortnite',
    },
  ],
  info: {
    presentation: (
      <>
        L'<span className="main-color">UTT Arena</span> c'est le plus gros événement de l'association <span className="main-color">UTT Net Group</span> en matière d'e-sport.
        L'association a été créée en 1998 et a pour but de réunir les passionnés d'informatique et des nouvelles technologies de l'Université de Technologie de Troyes (UTT).<br />
        L'UA réalise sa <span className="main-color">16<sup>ème</sup> édition</span> cette année ! Au commencement, lors de la première édition, nous étions dans une salle d'examen de l'UTT avec une centaine de joueurs.<br />
        Puis l'événement a grandi, l'organisation a augmenté à 200 joueurs avec une scène dans la halle sportive de l'UTT.<br />
        L'année 2015 est arrivée et une opportunité unique nous a été offerte par la ville avec la création du Festival des Jeux.
        Nous avons donc déménagé au Cube et nous sommes depuis dans le format que vous connaissez !<br />
        À présent l'UTT Arena c'est <span className="main-color">460 joueurs</span>, <span className="main-color">5 tournois spotlights</span>, une scène de 70 m² et une centaine de bénévoles.<br /><br />
        Et tout cela, c'est grâce à vous, les joueurs, qui nous faites confiance chaque année pour vous organiser un événement de folie, et à nos partenaires qui nous soutiennent chaque année dans l'organisation de la LAN !
      </>
    ),
    acces: [
      {
        title: 'Parking',
        text: 'Parking gratuit mis à disposition juste en face du Parc des Expositions',
      }, {
        title: 'Train',
        text: 'Gare de Troyes à 10 min à pied du festival',
      }, {
        title: 'Bus',
        text: 'Lignes 2, 6, 8: arrêt Terrasses ou Ligne 5: arrêt CCI',
      },
    ],
    billeterie: [
      {
        text: 'Il sera possible d\'acheter une place à partir du dimanche 13 octobre.',
        list: [
          'Il faut d\'abord s\'inscrire',
          'Ensuite, il faut payer sa place',
          'Chaque joueur paye sa place, il n\'y a pas de paiement groupé',
          'Le paiement se fait uniquement par carte bancaire',
        ],
      }, {
        text: 'Les tarifs sont les suivants :',
        list: [
          'Joueur : 20€',
          'Accompagnateur : 12€ (limité à 40 places)',
        ],
      },
    ],
    joueurs: {
      desc: (
        <>
          <strong>Rappel : l'âge minimum pour participer au tournoi est de 15 ans.</strong><br /><br />
          Pour les mineurs, une <strong>autorisation parentale</strong> sera demandée lors de l'événement (elle sera bientôt disponible au téléchargement).
        </>
      ),
      apporte: ['Ton PC', 'Ton casque', 'Une multiprise', 'Un câble ethernet'],
      fourni: ['Une place assise évidemment', 'Un port ethernet', 'Une prise électrique'],
      vente: 'Nous vendons des multiprises et des câbles RJ45 de 5m et 7m.',
      streaming: 'Pour les joueurs souhaitant streamer pendant la LAN, il faudra en faire la demande au moins 2 semaines avant l\'UA. Nous nous réservons le droit d\'empêcher le stream.',
    },
    services: [
      {
        title: 'Nourriture',
        text: 'On sait qu\'un weekend de 48h non-stop ça creuse, nous te proposerons donc sur place : croque-monsieur, crêpes, pizzas, canettes, snack, tout pour te sustenter au mieux ! Et tout cela à un prix abordable.',
      }, {
        title: 'Couchage',
        text: 'Nous mettons à disposition des joueurs des loges communes avec un accès à l\'eau et aux douches ! Pensez à ramener vos duvets si vous souhaitez en profiter ! Nous metterons à disposition des tapis pour plus de confort.',
      },
    ],
  },
  lolpro: {
    title: 'League of Legends (Pro)',
    format:
  <>
    16 équipes de 5 joueurs.
    <ul>
      <li>Description du déroulement du tournoi à venir. </li>
    </ul>
  </>,
    cashprize: '2000€ pour les premiers puis lots',
  },
  lolamateur: {
    title: 'League of Legends (Amateur)',
    format:
  <>
    16 équipes de 5 joueurs.
    <ul>
      <li>Description du déroulement du tournoi à venir. </li>
    </ul>
  </>,
    cashprize: 'Lots pour les finalistes',
  },
  fortnite: {
    title: 'fortnite Duo',
    format:
  <>
    32 équipes en trio.
    <ul>
      <li>Le format est susceptible de varier en fonction d’Epic Games.  </li>
      <li>Description du déroulement du tournoi à venir. </li>
    </ul>
  </>,
    cashprize: '1000€ pour les premiers puis lots',
  },
  csgo: {
    title: 'Counter strike : GO',
    format:
  <>
    16 équipes de 5 joueurs.
    <ul>
      <li>Description du déroulement du tournoi à venir. </li>
    </ul>
  </>,
    cashprize: '1000€ pour les premiers puis lots',
  },
  ssbu: {
    title: 'Super smash bros ultimate',
    format:
  <>
    32 joueurs en solo.
    <ul>
      <li>Description du déroulement du tournoi à venir. </li>
    </ul>
  </>,
    cashprize: '400€ pour le premier puis lots',
  },
  legal: {
    ung: <>UTT Net Group, association loi 1901<br />N° RNA : W103000699<br />situé au 12 rue Marie Curie<br />10004 Troyes<br />03 26 40 60 00<br />ung@utt.fr<br /></>,
    cookies: 'Afin d\'assurer la fourniture du service à l\'utilisateur authentifié, un cookie de session est inscrit sur la navigateur lors de l\'authentification sur le site. Celui-ci, identifié par le nom “arena-2018-token” dans le scope "arena.utt.fr" a pour seule fonction d\'assurer la persistence de la session authentifiée de l\'utilisateur. Il est détruit lors de la déconnexion, où à son expiration (sous 7200 secondes). Conformément à la directive européenne 2009/136/CE, ce cookie est indispensable à la fourniture du service sollicité. L\'utilisateur peut se dispenser de ce cookie en ne s\'inscrivant pas sur le site.',
    acces: 'Pour assurer la qualité et la sécurité du réseau et des équipements rattachés d\'une part, et la fluidité des échanges et des services offerts d\'autre part, les organisateurs se réservent le droit de bloquer, altérer ou réaliser toute autre action qu\'ils jugeront pertinente sur les échanges réseaux afin d\'atteindre les objectifs susmentionnés.',
    vente: [
      {
        title: 'Préambule',
        content: <>Les présentes conditions générales de vente s'appliquent à toutes les ventes conclues sur le site internet arena.utt.fr Le site internet arena.utt.fr est un service de :<br />UTT Net Group, association loi 1901<br />N° RNA : W103000699<br />situé au 12 rue Marie Curie 10004 Troyes<br />03 26 40 60 00<br />ung@utt.fr<br />Le site arena.utt.fr commercialise le produit suivant : Place pour la LAN et matériel en prévente ou location. Le client déclare avoir pris connaissance et avoir accepté les conditions générales de vente antérieurement à la passation de sa commande. La validation de la commande vaut donc acceptation des conditions générales de vente.<br />Le paiement est assuré par le prestataire suivant :<br />BDE UTT, association loi 1901<br />sis au 12, rue Marie Curie, 10000 Troyes<br />SIRET 4483866720001<br /></>,
      },
      {
        title: 'Article I - Principe',
        content: 'Les présentes conditions générales expriment l\'intégralité des obligations des parties. En ce sens, l\'acheteur est réputé les accepter sans réserve. Les présentes conditions générales sont accessibles sur le site de l\'UTT Arena et prévaudront, le cas échéant, sur toute autre version ou tout autre document contradictoire. Le vendeur et l\'acheteur conviennent que les présentes conditions générales régissent exclusivement leur relation. Le vendeur se réserve le droit de modifier ponctuellement ses conditions générales. Elles seront applicables dès leur mise en ligne. Si une condition de vente venait à faire défaut, elle serait considérée être régie par les usages en vigueur dans le secteur de la vente à distance dont les sociétés ont siège en France. Les présentes conditions générales de vente sont valables jusqu\'au 10 décembre 2018.',
      },
      {
        title: 'Article II - Contenu',
        content: 'Les présentes conditions générales ont pour objet de définir les droits et obligations des parties dans le cadre de la vente en ligne de biens proposés par le vendeur à l\'acheteur, à partir du site internet de l\'UTT Arena. Les présentes conditions ne concernent que les achats effectués sur le site de l\'UTT Arena. Ces achats concernent les produits suivants : Place pour la LAN et matériel en prévente ou location.',
      },
      {
        title: 'Article III - Informations précontractuelles',
        content: "L'acheteur reconnaît avoir eu communication, préalablement à la passation de sa commande et à la conclusion du contrat, d'une manière lisible et compréhensible, des présentes conditions générales de vente et de toute les informations listées à l'article L.221-5 du code de la consommation. Sont transmises à l'acheteur, de manière claire et compréhensible, les informations suivantes : -Les caractéristiques essentielles du bien ; -Le prix du bien et/ou le mode de calcul du prix -les informations relatives à l'identité du vendeur, à ses coordonnées postales, téléphoniques et électroniques, et à ses activités, celles relatives aux garanties légales, aux fonctionnalités du contenu numérique et, à l'existence et aux modalités de mise en oeuvre des garanties et autres conditions contractuelles.",
      },
      {
        title: 'Article IV - La commande',
        content: 'L\'acheteur a la possibilité de passer sa commande en ligne au moyen du formulaire d\'achat prévu lors de son inscription. L\'acheteur sera informé de tout indisponibilité du produit ou du bien commandé. Pour que la commande soit validée, l\'acheteur devra accepter, en cliquant à l\'endroit indiqué, les présentes conditions générales. Il devra également indiquer l\'adresse mail vers laquelle sera envoyé son produit, et enfin valider le mode de paiement. La vente sera considérée comme définitive : -après l\'envoie à l\'acheteur de la confirmation de l\'acceptation de la commande par le vendeur par courrier électronique ; -et après encaissement par le vendeur de l\'intégralité du prix. Toute commande vaut acceptation des prix et descriptions des produits disponibles à la vente. Dans certains cas, notamment défaut de paiement, adresse erronée ou autre problème sur le compte de l\'acheteur, le vendeur se réserve le droit de bloquer la commande de l\'acheteur jusqu\'à la résolution du problème. Pour toute question relative au suivi d\'une commande, l\'acheteur doit appeler le numéro de téléphone suivant : 0326406000 (coût d\'un appel local), aux jours et horaires suivants : du lundi au vendredi, de 9h à 18h, ou d\'envoyer un mail au vendeur à l\'adresse mail suivante : arena@utt.fr',
      },
      {
        title: 'Article V - Signature électronique',
        content: 'La fourniture en ligne du numéro de carte bancaire de l\'acheteur et la validation finale de la commande vaudront preuve de l\'accord de l\'acheteur : -exigibilité des sommes dues au titre du bon de commande, -signature et acceptation expresse de toutes les opérations effectuées. En cas d\'utilisation frauduleuse de la carte bancaire, l\'acheteur est invité, dès le constat de cette utilisation, à contacter le vendeur à l\'adresse mail suivante : arena@utt.fr',
      },
      {
        title: 'Article VI - Confirmation de commande',
        content: 'Le vendeur fournit à l\'acheteur un exemplaire du contrat, par messagerie électronique.',
      },
      {
        title: 'Article VII - Preuve de la transaction',
        content: 'Les registres informatisés, conservés dans les systèmes informatiques du vendeur dans des conditions raisonnables de sécurité, seront considérés comme les preuves des communications, des commandes et des paiements intervenus entre les parties. l\'archivage des bons de commande et des factures est effectué sur un support fiable et durable pouvant être produit à titre de preuve.',
      },
      {
        title: 'Article VIII - Informations sur les produits',
        content: 'Les produits sont décrits et présentés avec la plus grande exactitude possible. Toutefois, si des erreurs ou des omissions ont pu se produire quant à cette présentation, la responsabilité du vendeur ne pourrait être engagée. Les photographies des produits ne sont pas contractuelles.',
      },
      {
        title: 'Article IX - Prix',
        content: 'Le vendeur s\'engage à ce que les tarifs indiqués lors de la commande demeurent les même jusqu\'à confirmation par courrier électronique de la commande. Les prix sont indiqués en euros et tiennent compte de la TVA applicable au jour de la commande. Tout changement du taux applicable TVA sera automatiquement répercuté sur le prix des produits de la boutique en ligne.',
      },
      {
        title: 'Article X - Mode de paiement',
        content: 'Il s\'agit d\'un commande avec obligation de paiement, ce qui signifie que la passation de la commande implique un règlement de l\'acheteur. Pour régler sa commande, l\'acheteur dispose, à son choix, de l\'ensemble des modes de paiements mis à sa disposition par le vendeur et listés sur le site du vendeur. L\'acheteur garantit au vendeur qu\'il dispose des autorisations éventuellement nécessaires pour utiliser le mode de paiement choisi par lui, lors de la validation du bon de commande. Le paiement du prix s\'effectue en totalité au jour de la commande, selon les modalités suivantes : par carte de paiement.',
      },
      {
        title: 'Article XI - Droit de rétractation',
        content: <>Conformément à l'article L. 121-20-4 du code de la consommation, les inscriptions ne font pas l'objet d'un droit de rétractation. Toute commande est ferme et définitive.<br />Toutefois, l'organisateur autorise tout inscrit à demander un remboursement de son inscription, au plus tard 7 jours calendaires avant la date de l'évènement — soit le 30/11/22018 18:00 CET.<br />Toute demande doit être formulée par courriel addressé à arena@utt.fr, précisant le nom d'utilisateur et l'adresse courriel utilisée pour l'inscription. Le remboursement sera exécuté sous quinzaine à dater de la fin de l'évènement, et interviendra sur la carte bleue ayant servi au paiement. <br />Compte-tenu des frais bancaires endossés, tout remboursement fera l'objet d'une retenue d'un montant 1€ (un euro) sur le montant total à rembourser.</>,
      },
      {
        title: 'Article XII - Force majeure',
        content: 'Toutes circonstances indépendantes de la volonté des parties empêchant l\'exécution dans des conditions normales de leurs obligations sont considérées comme des causes d\'exonération des obligations des parties et entraînent leur suspension. La partie qui invoque les circonstances visées ci-dessus doit avertir immédiatement l\'autre partie de leur survenance, ainsi que de leur disparition. Seront considérés comme cas de force majeure tous faits ou circonstances irrésistibles, extérieurs aux parties, imprévisibles, inévitables, indépendants de la volonté des parties et qui ne pourront être empêchés par ces dernières, malgré tous les efforts retenus par la jurisprudence des cours et des tribunaux français : catastrophes naturelle, arrêt des réseaux de télécommunication ou difficultés propres aux réseaux de télécommunication externes aux clients. Les parties se rapprocheront pour examiner l\'incidence de l\'événement et convenir des conditions dans lesquelles l\'exécution du contrat sera poursuivie. Si le cas de force majeure a une durée supérieure à trois mois, les présentes conditions générales pourront être résiliées par la partie lésée.',
      },
      {
        title: 'Article XIII - Propriété intellectuelle',
        content: 'Le contenu du site internet reste la propriété du vendeur, seul titulaire des droits de propriété intellectuelle sur ce contenu. Les acheteurs s\'engagent à ne faire aucun usage de ce contenu ; toute reproduction totale ou partielle de ce contenu est strictement interdite et est susceptible de constituer un délit de contrefaçon.',
      },
      {
        title: 'Article XIV - Informatiques et Libertés',
        content: 'Les données nominatives fournies par l\'acheteur sont nécessaires au traitement de sa commande et à l\'établissement de ses factures. Elles peuvent être communiquées aux partenaires du vendeur chargés de l\'exécution, du traitement, de la gestion et du paiement des commandes. Le traitement des informations communiquées par l\'intermédiaire du site internet de l\'UTT Arena a fait l\'objet d\'une déclaration auprès de la CNIL. L\'acheteur dispose d\'un droit d\'accès permanent, de modification, de rectification et d\'opposition s\'agissant des informations le concernant. Ce droit peut être exercé dans les conditions et selon les modalités définies sur le site de l\'UTT Arena.',
      },
    ],
  },
};

export default text;