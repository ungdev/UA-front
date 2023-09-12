import styles from './style.module.scss';
import { Table, Title } from '@/components/UI';
import BoxContainer from '@/components/landing/BoxContainer';
import foo from '@/../public/images/foo.png';
import bar from '@/../public/images/bar.png';
import Partners from '../../components/Partners';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Événement - UTT Arena 2022 - 3 et 4 décembre 2022',
}

export default function Page() {
  return (
    <>
      <div id={styles.eventPage}>
        <Title level={1} className={styles.primaryTitle}>
          Événement
        </Title>
        <Title level={2} className={styles.secondaryTitle}>
          Présentation
        </Title>
        <div className={`${styles.textAndImage} ${styles.imageLeft}`}>
          <img src={foo.src} alt="foo" />
          <div className={styles.text}>
            L'UTT Arena (UA) est le plus gros événement de l'association <a href="https://ung.utt.fr">UTT Net Group</a>{' '}
            (UNG). L'UNG a été créée en 1998 pour rassembler tous les passionnés d'informatique et des nouvelles
            technologies de l'Université de Technologie de Troyes (UTT). <br />
            <br />
            L'UTT Arena revient cette année pour sa 20ème édition ! D'une simple salle d'examen de l'UTT à 2250m² de
            gaming au Parc des Expositions de Troyes, le Cube, en passant par le festival des jeux, l'UTT Arena a évolué
            de manière à proposer chaque année des tournois de meilleure qualité à ses joueurs !
          </div>
        </div>
        <div className={`${styles.textAndImage} ${styles.imageRight}`}>
          <div className={styles.text}>
            À présent l'UTT Arena c'est 630 joueurs, 7 tournois, des prix à gagner et des tournois commentés en direct
            par les casteurs ! Et tout cela, c'est grâce à vous, les joueurs, coachs, simples curieux… qui nous faites
            confiance chaque année pour organiser cet événement dans l'ambiance qu'on lui connaît ! La confiance de nos
            partenaires et leur mobilisation autour de notre événement contribuent à le rendre exceptionnel ! Un grand
            merci également à tous les bénévoles qui rendent possible l'organisation de ce beau projet.
          </div>
          <img src={bar.src} alt="bar" />
        </div>
        <Title level={2} className={styles.secondaryTitle}>
          Salon jeux
        </Title>
        <center>Contenu à venir</center>
        <Title level={2} className={styles.secondaryTitle}>
          Programme
        </Title>
        <div className={styles.program}>
          <BoxContainer title="Jour 1 : Vendredi" className={styles.boxContainer}>
            <p>Contenu...</p>
          </BoxContainer>
          <BoxContainer title="Jour 2 : Samedi" className={styles.boxContainer}>
            <p>Contenu...</p>
          </BoxContainer>
          <BoxContainer title="Jour 3 : Dimanche" className={styles.boxContainer}>
            <p>Contenu...</p>
          </BoxContainer>
        </div>
        <Title level={2} className={styles.secondaryTitle}>
          Lieu
        </Title>
        <div className={styles.place}>
          <iframe
            title="Google Maps"
            src="https://maps.google.com/maps?q=UTT+Arena&t=&z=15&ie=UTF8&iwloc=&output=embed"
          />
          <div className={styles.text}>
            Le Cube - Parc des Expositions de Troyes <br /> <br />
            20 Rue des Gayettes <br /> <br />
            10000 Troyes
          </div>
        </div>
        <Title level={2} className={styles.secondaryTitle}>
          Inscriptions
        </Title>
        <ol className={styles.steps}>
          <li>Il faut d'abord cliquer sur le bouton "Connexion" dans la barre de navigation</li>
          <li>Crée ton compte et clique sur le lien envoyé par mail</li>
          <li>Une fois connecté, associe ton compte Discord</li>
          <li>Crée ou rejoins une équipe (le chef d'équipe doit accepter ta demande)</li>
          <li>
            <p>
              Une fois ton équipe au complet et toutes les places de l'équipe payées, demande à ton chef d'équipe de{' '}
              <strong>verrouiller l'équipe</strong> (n'importe quel membre peut payer pour un ou plusieurs membres de
              l'équipe)
            </p>
          </li>
          <li>Le statut de l'équipe devient vert et l'équipe est officiellement inscrite !</li>
        </ol>
        <Table
          columns={[
            { key: 'type', title: 'Type' },
            { key: 'price', title: 'Prix' },
            { key: 'description', title: 'Remarques' },
          ]}
          dataSource={[
            {
              type: 'Joueur',
              price: '10€',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            },
            {
              type: 'Visiteur',
              price: '5€',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            },
            {
              type: 'Bénévole',
              price: 'Gratuit',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            },
          ]}
        />
      </div>
      <Partners />
    </>
  );
}
