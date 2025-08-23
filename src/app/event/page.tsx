import styles from './style.module.scss';
import { Table, Title } from '@/components/UI';
import imageLeft from '@/../public/images/event/left.webp';
import imageRight from '@/../public/images/event/right.webp';
import Partners from '@/components/Partners';
import { Metadata } from 'next';
import TextStroke from '@/components/UI/TextStroke';

export const metadata: Metadata = {
  title: 'Évènement - UTT Arena 2025 - 28, 29 et 30 novembre 2025',
};

export default function Page() {
  return (
    <>
      <div id="event-page" className={styles.eventPage}>
        <Title level={1} className={styles.primaryTitle} align="center">
          Évènement
        </Title>
        <Title level={2} type={2} className={styles.secondaryTitle}>
          Présentation
        </Title>
        <div className={`${styles.textAndImage} ${styles.imageLeft}`}>
          <img src={imageLeft.src} alt="Image de gauche" loading="lazy" />
          <div className={styles.text}>
            L'UTT Arena (UA) est le plus gros évènement de l'association <a href="https://ung.utt.fr">UTT Net Group</a>{' '}
            (UNG). L'UNG a été créée en 1998 pour rassembler tous les passionnés d'informatique et des nouvelles
            technologies de l'Université de Technologie de Troyes (UTT). <br />
            <br />
            L'UTT Arena revient cette année pour sa 22ème édition ! D'une simple salle d'examen de l'UTT à 2250m² de
            gaming au Parc des Expositions de Troyes, le Cube, en passant par l'espace Argence, l'UTT Arena a évolué de
            manière à proposer chaque année des tournois de meilleure qualité à ses joueurs !
          </div>
        </div>
        <div className={`${styles.textAndImage} ${styles.imageRight}`}>
          <div className={styles.text}>
            À présent l'UTT Arena c'est 416 joueurs, 6 tournois, des prix à gagner et des tournois commentés en direct
            par les casteurs ! Et tout cela, c'est grâce à vous, les joueurs, coachs, simples curieux… qui nous faites
            confiance chaque année pour organiser cet évènement dans l'ambiance qu'on lui connaît ! La confiance de nos
            partenaires et leur mobilisation autour de notre évènement contribuent à le rendre exceptionnel ! Un grand
            merci également à tous les bénévoles qui rendent possible l'organisation de ce beau projet.
          </div>
          <img src={imageRight.src} alt="Image de droite" loading="lazy" />
        </div>
        <Title level={2} type={2} className={`${styles.secondaryTitle} ${styles.elementWithRef}`} id="program">
          Programme
        </Title>
        <div className={styles.avenir}>A venir</div>
        {/*
        <div className={styles.program}>
          <BoxContainer
            title="Jour 1 : Vendredi"
            padding={false}
            className={styles.boxContainer}
            contentClassName={styles.boxContainerContent}>
            <table>
              <tr>
                <td>
                  <strong>17h</strong>
                </td>
                <td>
                  Ouverture de l'UTT Arena
                  <br />
                  Installation des joueurs !
                </td>
              </tr>
            </table>
          </BoxContainer>
          <BoxContainer
            title="Jour 2 : Samedi"
            padding={false}
            className={styles.boxContainer}
            contentClassName={styles.boxContainerContent}>
            <table>
              <tr>
                <td>
                  <strong>9h</strong>
                </td>
                <td>Check-in des joueurs</td>
              </tr>
              <tr>
                <td>
                  <strong>17h-19h</strong>
                </td>
                <td>Finale SSBU</td>
              </tr>
              <tr>
                <td>
                  <strong>21h-23h</strong>
                </td>
                <td>Finale osu!</td>
              </tr>
            </table>
          </BoxContainer>
          <BoxContainer
            title="Jour 3 : Dimanche"
            className={styles.boxContainer}
            padding={false}
            contentClassName={styles.boxContainerContent}>
            <table>
              <tr>
                <td>
                  <strong>9h</strong>
                </td>
                <td>Début des tournois</td>
              </tr>
              <tr>
                <td>
                  <strong>17h45</strong>
                </td>
                <td>Fermeture de la LAN</td>
              </tr>
            </table>
          </BoxContainer>
        </div>
        */}
        <Title level={2} type={2} className={`${styles.secondaryTitle} ${styles.elementWithRef}`} id="location">
          Lieu
        </Title>
        <div className={styles.place}>
          <iframe
            title="Google Maps"
            src="https://maps.google.com/maps?q=UTT+Arena&t=&z=15&ie=UTF8&iwloc=&output=embed"
          />
          <div className={styles.text}>
            Halle Sportive UTT <br /> <br />
            12 rue Marie Curie <br /> <br />
            10000 Troyes
          </div>
        </div>
        <Title level={2} type={2} className={styles.secondaryTitle}>
          Inscriptions
        </Title>
        <ol className={styles.steps}>
          <li>
            <TextStroke width={8} className={styles.counter} classNameOfStroke={styles.counterStroke}>
              1
            </TextStroke>
            Il faut d'abord cliquer sur le bouton "Connexion" dans la barre de navigation.
          </li>
          <li>
            <TextStroke width={8} className={styles.counter} classNameOfStroke={styles.counterStroke}>
              2
            </TextStroke>
            Crée ton compte et clique sur le lien envoyé par mail.
          </li>
          <li>
            <TextStroke width={8} className={styles.counter} classNameOfStroke={styles.counterStroke}>
              3
            </TextStroke>
            Une fois connecté, associe ton compte Discord.
          </li>
          <li>
            <TextStroke width={8} className={styles.counter} classNameOfStroke={styles.counterStroke}>
              4
            </TextStroke>
            Crée ou rejoins une équipe (le chef d'équipe doit accepter ta demande).
          </li>
          <li>
            <TextStroke width={8} className={styles.counter} classNameOfStroke={styles.counterStroke}>
              5
            </TextStroke>
            <p>
              Une fois ton équipe au complet et toutes les places de l'équipe payées (n'importe quel membre peut payer
              pour un ou plusieurs membres de l'équipe), une place du tournoi sera automatiquement réservée pour ton
              équipe ! S'il ne reste plus de place dans le tournoi, elle sera placée en file d'attente.
            </p>
          </li>
          <li>
            <TextStroke width={8} className={styles.counter} classNameOfStroke={styles.counterStroke}>
              6
            </TextStroke>
            Le statut de l'équipe devient vert et l'équipe est officiellement inscrite !
          </li>
        </ol>
        {/* TODO : tenter d'échanger lignes et colonnes pour voir ce que ça donne */}
        <Table
          columns={[
            { key: 'type', title: 'Type' },
            { key: 'price', title: 'Prix' },
            { key: 'description', title: 'Remarques' },
          ]}
          dataSource={[
            {
              type: 'Joueur',
              price: '28 €',
              description: 'Pour les étudiants UT : réduction de 5€ en utilisant ton adresse mail étudiante',
            },
            {
              type: 'Coach / Manager',
              price: '15 €',
              description:
                'Un justificatif pourra vous être demandé. Le nombre limite de coachs / managers par équipe sera précisé ultérieurement.',
            },
            {
              type: 'Accompagnateur',
              price: '10 €',
              description: 'Réservé aux accompagnateurs de joueurs mineurs',
            },
            {
              type: 'Spectateur',
              price: '10 €',
              description:
                "Possibilité d'accéder à l'UTT Arena, sa restauration et ses activités pendant tout le weekend",
            },
          ]}
          className={styles.informationTable}
        />
      </div>
      <Partners />
    </>
  );
}
