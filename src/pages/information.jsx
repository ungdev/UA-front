import Link from 'next/link';
import React from 'react';

import { Title } from '../components/UI';

const Information = () => (
  <div id="information">
    <Title align="center">Présentation</Title>
    <div className="information-section">
      L'<span className="accent">UTT Arena</span> (UA) est le plus gros événement de l'association{' '}
      <span className="accent">
        <a href="https://ung.utt.fr">UTT Net Group</a>
      </span>{' '}
      (UNG). L'UNG a été créée en 1998 pour rassembler tous les passionnés d'informatique et des nouvelles technologies
      de l'Université de Technologie de Troyes (UTT).
      <br />
      <br />
      L'UTT Arena revient cette année pour sa{' '}
      <span className="accent">
        19<sup>ème</sup> édition
      </span>{' '}
      ! D'une simple salle d'examen de l'UTT à 2000m² de gaming à l'espace Argence, en passant par le festival des jeux,
      l'UTT Arena a évolué de manière à proposer chaque année des tournois de meilleure qualité à ses joueurs !
      <br />
      <br />À présent l'UTT Arena c'est <span className="accent">450 joueurs</span>,{' '}
      <span className="accent">5 tournois spotlights</span>, des <span className="accent">prix à gagner</span> et des
      tournois <span className="accent">commentés en direct par les casteurs </span>! Et tout cela, c'est grâce à vous,
      les joueurs, coachs, simples curieux… qui nous faites confiance chaque année pour organiser cet événement dans
      l'ambiance qu'on lui connaît ! La confiance de nos partenaires et leur mobilisation autour de notre événement
      contribuent à le rendre exceptionnel ! Un grand merci également à{' '}
      <Link href="/organisers">
        <a>
          <span className="accent">tous les bénévoles</span>
        </a>
      </Link>{' '}
      qui rendent possible l'organisation de ce beau projet.
    </div>

    <Title align="center">Inscriptions</Title>
    <div className="information-section">
      <p>
        Ouverture des inscriptions le <span className="accent">vendredi 8 octobre 2021, à 19h00 </span>(heure française)
        !
      </p>
      <ol>
        <li>Il faut d'abord cliquer sur le bouton "Connexion" dans la barre de navigation</li>
        <li>Crée ton compte et clique sur le lien envoyé par mail</li>
        <li>Une fois connecté, associe ton compte Discord</li>
        <li>Crée ou rejoins une équipe (le chef d'équipe doit accepter ta demande)</li>
        <li>
          Une fois ton équipe au complet et toutes les places de l'équipe payées, demande à ton chef d'équipe de{' '}
          <strong>verrouiller l'équipe</strong> (n'importe quel membre peut payer pour un ou plusieurs membres de
          l'équipe)
        </li>
        <li>Le statut de l'équipe devient vert et l'équipe est officiellement inscrite !</li>
      </ol>

      <p>
        <strong>Attention :</strong> une fois l'équipe verrouillée, plus aucun changement n'est possible.
      </p>

      <br />

      <table>
        <thead>
          <tr className="accent-line">
            <td></td>
            <td>Tarif</td>
            <td>Remarques</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Joueur</td>
            <td>20€</td>
            <td>Pour les étudiants UT : réduction de 5€ en utilisant ton adresse mail étudiante.</td>
          </tr>
          <tr>
            <td>Coach / manager</td>
            <td>12€</td>
            <td>
              Un justificatif pourra vous être demandé.
              <br />
              Limité à 2 coachs / managers par équipe.
              <br />
              Pas de coach / manager autorisé pour les tournois solo (SSBU, osu! et libre).
            </td>
          </tr>
          <tr>
            <td>Accompagnateur</td>
            <td>12€</td>
            <td>Réservé aux accompagnateurs de joueurs mineurs.</td>
          </tr>
          <tr>
            <td>Spectateur</td>
            <td>12€</td>
            <td>Limité à 50 places.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <Title align="center">Infos joueurs</Title>
    <div className="information-section">
      <Title level={4}>Salle de repos</Title>
      <p>
        L’UTT Arena propose aux joueurs trois loges collectives à l’étage de l’Espace Argence. Ces loges feront office
        de salles de repos. Les joueurs souhaitant dormir sur place devront prévoir un tapis de sol, sac de couchage ou
        tout autre matériel pour passer la nuit au sol. L’UTT Arena décline toute responsabilité en cas de vol.
      </p>

      <br />

      <Title level={4}>Joueurs SSBU</Title>
      <ul>
        <li>
          Tous les joueurs du tournoi SSBU doivent apporter leurs manettes, ainsi que leur adaptateur si nécessaire.{' '}
          <strong>Aucune manette ou adaptateur ne sera mis à disposition pendant l'événement.</strong>
        </li>
        <li>
          Pour les 16 premiers joueurs qui indiqueront apporter leur Nintendo Switch, le jeu SSBU avec tous les
          personnages et un câble HDMI, une réduction de 3€ leur sera accordée lors de son inscription. Pour cela il
          faut ajouter le supplément "Réduction si tu amènes ta propre Nintendo Switch" dans ton panier au moment de
          payer ta place.
          <br />
          Même sans cocher cette case, tu peux apporter ta console pour jouer en freeplay pendant l'UTT Arena.
          <br />
          <strong>
            Si tu as indiqué que tu apportais ta console et que ce n'est pas le cas, un supplément de 6€ te sera facturé
            sur place.
          </strong>
        </li>
      </ul>

      <br />

      <Title level={4}>Joueurs mineurs</Title>
      <p>
        Pour participer au tournoi il faut avoir au minimum <strong>15 ans lors de l'événement</strong>. Il faudra que
        tu présentes l'autorisation parentale (
        <strong>
          <a href="https://arena.utt.fr/uploads/files/Autorisation_parentale_-_UTT_Arena_2021.pdf">disponible ici</a>
        </strong>
        ) <strong>ainsi qu'une photocopie de la pièce d'identité de ton responsable légal et de la tienne</strong> avant
        d'accéder à l'UTT Arena.
      </p>

      <br />

      <Title level={4}>Streaming</Title>
      <p>
        Un formulaire de demande de streaming est <a href="https://forms.gle/K3AbKdtb6Nvp3NQ7A">disponible ici</a>. Tu
        recevras alors une confirmation une semaine avant l'événement si tu es autorisé à streamer.
      </p>

      <Title level={4}>Ce que tu devras amener</Title>
      <ul>
        <li>
          Si tu veux manger pendant l'événement, tu devras venir avec ton tupperware. Dans tous les cas, viens avec une
          goudre. Tu ne pourras pas apporter ta propre nourriture.
        </li>
        <li>
          Pour rentrer dans l'espace Argence, tu devras avoir ton billet, un pass sanitaire valide, une pièce
          d'identité. N'oublie pas ton attestation parentale et les documents demandés dessus si tu es mineur.
        </li>
        <li>
          Tu devras amener une multiprise, nous ne fournissons qu'une prise par personne. Pour te connecter à la LAN, tu
          auras besoin d'un câble ethernet d'au moins 7 mètres, et ton ordinateur devra avoir une prise ethernet. Enfin,
          surement le plus important : tu dois ramener ton setup complet (sauf si tu l'as loué) : ta tour, ton écran, un
          câble HDMI / VGA en fonction de ton écran, ta souris, ton clavier et ta manette. Si tu as pris la réduction
          SSBU, tu devras apporter ta Switch, le jeu SSBU avec tous les personnages et un câble HDMI.
        </li>
        <li>
          Enfin, il te faudra de quoi te laver et de quoi dormir. Tu devras aussi avoir plusieurs masques : nous n'en
          auront pas forcément en rab si le tien casse. Tu ne pourras pas rester dans l'espace Argence sans masque !
        </li>
      </ul>
    </div>

    <Title align="center">Planning</Title>
    <div className="information-section">
      <table className="timetable">
        <tbody>
          <tr className="accent-line">
            <td colSpan="2">Vendredi</td>
          </tr>
          <tr>
            <td>17h</td>
            <td>Ouverture, discours et concert</td>
          </tr>
          <tr className="accent-line">
            <td colSpan="2">Samedi</td>
          </tr>
          <tr>
            <td>9h30</td>
            <td>Check-in des équipes</td>
          </tr>
          <tr>
            <td>10h</td>
            <td>Début des tournois</td>
          </tr>
          <tr>
            <td>10h-21h</td>
            <td>Se référer au règlement de ton tournoi pour les horaires des matchs</td>
          </tr>
          <tr>
            <td>10h-21h</td>
            <td>Matchs castés sur scène</td>
          </tr>
          <tr>
            <td>22h-23h</td>
            <td>Finale osu! sur scène</td>
          </tr>
          <tr>
            <td>Jusqu'à 01h30</td>
            <td>Soirée au Meltdown Troyes avec boisson offerte</td>
          </tr>
          <tr className="accent-line">
            <td colSpan="2">Dimanche</td>
          </tr>
          <tr>
            <td>10h</td>
            <td>Début des matchs de la journée (se référer au règlement de tournoi)</td>
          </tr>
          <tr>
            <td>10h-17h</td>
            <td>Finales castées sur scène, remises des prix</td>
          </tr>
          <tr>
            <td>17h-18h</td>
            <td>Discours de remerciement, fermeture de l'UTT Arena 2021</td>
          </tr>
        </tbody>
      </table>
    </div>

    <Title align="center">Emplacement</Title>
    <div className="information-section">
      <p>
        Espace Argence
        <br />
        20 bis Bd Gambetta
        <br />
        10000 Troyes
        <br />
        <a href="https://www.google.com/maps/place/UTT+Arena/@48.300153,4.0699859,17z/data=!3m1!4b1!4m5!3m4!1s0x47ee985568e4c74b:0x5a667248e9ced9f0!8m2!3d48.2998563!4d4.0724229">
          Lien Google Maps
        </a>
      </p>
      <iframe
        height="320"
        width="100%"
        title="Google Maps"
        src="https://maps.google.com/maps?q=UTT+Arena&t=&z=15&ie=UTF8&iwloc=&output=embed"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
      />
    </div>
  </div>
);

export default Information;
