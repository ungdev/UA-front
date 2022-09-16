// import Link from 'next/link';
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
        20<sup>ème</sup> édition
      </span>{' '}
      ! D'une simple salle d'examen de l'UTT à 7500m² de gaming au Parc des Expositions de Troyes, le Cube, en passant
      par le festival des jeux, l'UTT Arena a évolué de manière à proposer chaque année des tournois de meilleure
      qualité à ses joueurs !
      <br />
      <br />À présent l'UTT Arena c'est <span className="accent">630 joueurs</span>,{' '}
      <span className="accent">8 tournois</span>, des <span className="accent">prix à gagner</span> et des tournois{' '}
      <span className="accent">commentés en direct par les casteurs </span>! Et tout cela, c'est grâce à vous, les
      joueurs, coachs, simples curieux… qui nous faites confiance chaque année pour organiser cet événement dans
      l'ambiance qu'on lui connaît ! La confiance de nos partenaires et leur mobilisation autour de notre événement
      contribuent à le rendre exceptionnel ! Un grand merci également à{' '}
      {/* <Link href="/organisers">
        <a>
          <span className="accent">tous les bénévoles</span>
        </a>
      </Link>{' '} */}
      <span className="accent">tous les bénévoles</span> qui rendent possible l'organisation de ce beau projet.
    </div>

    <Title align="center">Inscriptions</Title>
    <div className="information-section">
      <p>
        Ouverture des inscriptions <span className="accent">à venir</span> !
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
            <td>25€ (22€ pour les joueurs SSBU)</td>
            <td>Pour les étudiants UT : réduction de 5€ en utilisant ton adresse mail étudiante.</td>
          </tr>
          <tr>
            <td>Coach / manager</td>
            <td>15€</td>
            <td>
              Un justificatif pourra vous être demandé.
              <br />
              Limité à 2 coachs / managers par équipe.
              <br />
              Pas de coach / manager autorisé pour les tournois solo (SSBU, TFT, osu! et libre).
            </td>
          </tr>
          <tr>
            <td>Accompagnateur</td>
            <td>15€</td>
            <td>Réservé aux accompagnateurs de joueurs mineurs.</td>
          </tr>
          <tr>
            <td>Spectateur</td>
            <td>15€</td>
            <td>Illimité</td>
          </tr>
        </tbody>
      </table>
    </div>

    <Title align="center">Infos joueurs</Title>
    <div className="information-section">
      <Title level={4}>Joueurs mineurs</Title>
      <p>
        Pour participer au tournoi il faut avoir au <strong>minimum 15 ans</strong> lors de l'événement. Il faudra que
        tu présentes <strong>l'autorisation parentale</strong>
        {/*(
        <a href="https://arena.utt.fr/uploads/files/Autorisation_parentale_-_UTT_Arena_2021.pdf" className="">
          disponible ici
        </a>
        )*/}
        , fournie lors de l’inscription, ainsi qu'une photocopie de la{' '}
        <strong>pièce d'identité de ton responsable légal et de la tienne</strong> avant d'accéder à l'UTT Arena.
      </p>

      <br />

      <Title level={4}>Salle de repos</Title>
      <p>
        L’UTT Arena propose aux joueurs des loges collectives dans le Parc des Expositions de Troyes. Ces loges feront
        office de salles de repos. Les joueurs souhaitant dormir sur place devront prévoir un tapis de sol, sac de
        couchage ou tout autre matériel pour passer la nuit au sol. L’UTT Arena décline toute responsabilité en cas de
        vol.
      </p>

      <br />

      <Title level={4}>Salles de stockage</Title>
      <p>
        Des salles de stockage sont mises à disposition des joueurs afin qu’ils puissent ranger leur matériel s'ils le
        souhaitent. Elles seront surveillées par l’équipe de sécurité de l’UTT Arena. L’UTT Arena décline toute
        responsabilité en cas de vol.
      </p>

      <br />

      <Title level={4}>Joueurs SSBU</Title>
      <ul>
        <li>
          Tous les joueurs du tournoi SSBU doivent apporter leurs manettes, ainsi que leur adaptateur si nécessaire.{' '}
          <strong>Aucune manette ou adaptateur ne sera mis à disposition pendant l'événement.</strong>
        </li>
        <li>
          Pour les 20 premiers joueurs qui indiqueront apporter leur Nintendo Switch, le jeu SSBU avec{' '}
          <strong>tous</strong> les personnages et un câble HDMI, une <strong>réduction</strong> de 3€ leur sera
          accordée lors de son inscription. Pour cela il faut ajouter le supplément{' '}
          <strong>"Réduction si tu amènes ta propre Nintendo Switch"</strong> dans ton panier au moment de payer ta
          place.
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

      <Title level={4}>Streaming</Title>
      <p>
        {/*Un formulaire de demande de streaming est{' '}
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdBJk9aVHftYELBDcN-E2qDQJejY0O6JWT3sTEQp6rtrnP8Jw/viewform">
          disponible ici
        </a>
        . Tu recevras alors une confirmation une semaine avant l'événement si tu es autorisé à streamer.*/}
        Un formulaire sera mis à disposition lors des inscriptions afin de faire ta demande auprès de l’équipe de l’UTT
        Arena. L’équipe de l’UTT Arena se réserve le droit d’accepter ou refuser ta demande, et toute personne faisant
        du streaming sans autorisation validée par l’équipe se verra sanctionnée.
      </p>

      <Title level={4}>Ce que tu devras amener</Title>
      <ul>
        <li>
          <strong>Tu ne pourras pas apporter ta propre nourriture.</strong>
        </li>
        <li>
          Pour entrer dans le Cube, tu devras avoir ton billet, une pièce d'identité.{' '}
          <strong>N'oublie pas ton attestation parentale et les documents demandés dessus si tu es mineur.</strong>
        </li>
        <li>
          Nous ne fournissons qu'une prise par personne, si tu as besoin de plus <strong>amène une multiprise</strong>.
          Pour te connecter à la LAN, tu auras besoin d'un <strong>câble ethernet d'au moins 7 mètres</strong>, et ton
          ordinateur devra avoir une prise ethernet. Enfin, sûrement le plus important, tu dois ramener ton setup
          complet : ta tour, ton écran, un câble HDMI / VGA en fonction de ton écran, ta souris, ton clavier et ta
          manette.
          <br />
          Si tu as pris la réduction SSBU, tu devras apporter ta Switch, le jeu SSBU avec tous les personnages et un
          câble HDMI.
        </li>
        <li>Enfin, il te faudra de quoi te laver et de quoi dormir.</li>
      </ul>
    </div>

    <Title align="center">Planning</Title>
    <div className="information-section">A venir</div>

    <Title align="center">Emplacement</Title>
    <div className="information-section">
      <p>
        Le Cube - Parc des Expositions de Troyes
        <br />
        20 Rue des Gayettes
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
