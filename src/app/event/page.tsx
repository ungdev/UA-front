import { Title } from '@/components/UI';
import BoxContainer from '@/components/landing/BoxContainer';
import foo from '@/../public/images/foo.png';
import bar from '@/../public/images/bar.png';
import AppearFromSide from '@/components/UI/AppearFromSide';

export default function Page() {
  return (
    <div id="event-page">
      <Title level={1}>Événement</Title>
      <Title level={2}>Présentation</Title>
      <AppearFromSide fromRight>
        <div className="text-and-image image-left">
          <img src={foo.src} alt="foo" />
          <div className="text">
            L'UTT Arena (UA) est le plus gros événement de l'association <a href="https://ung.utt.fr">UTT Net Group</a>{' '}
            (UNG). L'UNG a été créée en 1998 pour rassembler tous les passionnés d'informatique et des nouvelles
            technologies de l'Université de Technologie de Troyes (UTT). <br />
            <br />
            L'UTT Arena revient cette année pour sa 20ème édition ! D'une simple salle d'examen de l'UTT à 2250m² de
            gaming au Parc des Expositions de Troyes, le Cube, en passant par le festival des jeux, l'UTT Arena a évolué
            de manière à proposer chaque année des tournois de meilleure qualité à ses joueurs !
          </div>
        </div>
      </AppearFromSide>
      <AppearFromSide>
        <div className="text-and-image image-right">
          <div className="text">
            À présent l'UTT Arena c'est 630 joueurs, 7 tournois, des prix à gagner et des tournois commentés en direct
            par les casteurs ! Et tout cela, c'est grâce à vous, les joueurs, coachs, simples curieux… qui nous faites
            confiance chaque année pour organiser cet événement dans l'ambiance qu'on lui connaît ! La confiance de nos
            partenaires et leur mobilisation autour de notre événement contribuent à le rendre exceptionnel ! Un grand
            merci également à tous les bénévoles qui rendent possible l'organisation de ce beau projet.
          </div>
          <img src={bar.src} alt="bar" />
        </div>
      </AppearFromSide>
      <Title level={2}>Salon jeux</Title>
      Contenu à venir
      <Title level={2}>Programme</Title>
      <div className="program">
        <BoxContainer title="Jour 1 : Vendredi"></BoxContainer>
        <BoxContainer title="Jour 2 : Samedi"></BoxContainer>
        <BoxContainer title="Jour 3 : Dimanche"></BoxContainer>
      </div>
      <Title level={2}>Lieu</Title>
      <Title level={2}>Inscriptions</Title>
    </div>
  );
}
