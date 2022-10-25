import React from 'react';
import Link from 'next/link';

import TournamentCards from '../components/TournamentCards';
import { Title, VideoContainer, Table, Countdown, Button, LogoSVG, Divider } from '../components/UI';
// import { uploads } from '../utils/api';

const Home = () => {
  // const [partners, setPartners] = useState([]);

  // const fetchPartners = async () => {
  //   const request = await uploads.get('/partners/list.json', true);

  //   setPartners(request.data);
  // };

  // useEffect(() => {
  //   fetchPartners();
  // }, []);

  return (
    <div id="home">
      <div className="home-header">
        <div id="logo">
          <LogoSVG />
        </div>
        <div className="home-title">
          <p className="main">UTT Arena</p>
          <p>
            <span className="accent">3</span> et <span className="accent">4</span> décembre 2022
          </p>
        </div>
      </div>

      <div className="home-container page-padding">
        <div className="home-info">
          <Countdown date={new Date('December 3 2022 9:00:00 UTC+1')} className="home-countdown" />

          <Title align="center">Informations</Title>

          <p>
            LE rendez-vous gaming annuel de la région Auboise aura lieu les{' '}
            <span className="accent">3 et 4 décembre 2022</span> dans un lieu que vous connaissez bien : le Cube ! Plus
            de{' '}
            <span className="accent">
              2250m<sup>2</sup>
            </span>{' '}
            t'attendent pour passer 3 jours de folie ! Au programme : <span className="accent">8 tournois</span> sur tes
            jeux favoris, 3 jours pour montrer tes skills parmis les <span className="accent">630 joueurs</span> qui
            composeront l’évènement, et tenter de remporter les <span className="accent">cashprizes, lots</span> et de
            nombreuses autres <span className="accent">surprises</span> ! Et pour animer cette édition, des{' '}
            <span className="accent">guests d’exception</span> viendront caster cette édition qui s’annonce enflammée !
            Alors prépare tout ton stuff et <span className="accent">impose toi dans l’arène !</span>
          </p>

          <VideoContainer
            src="https://www.youtube.com/embed/t_QP8_bYJ1c"
            title="Trailer UTT Arena 2022"
            className="video-container"
          />

          <a href="https://www.twitch.tv/uttarena">
            <Button primary leftIcon="fab fa-twitch" className="stream-link">
              Voir le stream
            </Button>
          </a>

          <div className="team-message">
            <Divider />
            <h1>Message de l'équipe organisatrice</h1>
            <p>
              Bonjour à tous,
              <br />
              Suite à une décision de la Maison du Boulanger, le Festival des Jeux de Troyes, qui devait se tenir du 02
              au 04 décembre en même temps que l'UTT Arena 2022, n'aura finalement pas lieu.
              <br />
              Cette annulation a également des répercussions économiques sur l'UTT Arena 2022 puisqu'une partie des
              dépenses locatives du Parc des Expositions qui était prise en charge par le Festival des Jeux est
              désormais à la charge de l'UTT Arena.
              <br />
              Afin de pouvoir assurer la tenue de l'événement, nous sommes contraints à restreindre l'événement aux
              samedi 03 et dimanche 04 décembre 2022, et non plus à partir du vendredi 02 décembre à 17h. L'accueil des
              participants se fera à partir de 9h le samedi matin.
              <br />
              Pour les personnes qui souhaitent assister à l'événement en tant que spectateur, nous allons très
              prochainement ajouter la possibilité d'acheter une place spectateur pour l'UTT Arena.
              <br />
              Nous tenons à présenter nos excuses à tous, et ferons en sorte que ces deux jours de LAN se déroulent au
              mieux pour tous.
              <br />
              L'équipe organisatrice de l'UTT Arena
            </p>
            <Divider />
          </div>

          <Table
            columns={[
              { title: '', key: 'title' },
              { title: '', key: 'description' },
            ]}
            dataSource={[
              {
                title: <strong>Lieu</strong>,
                description: 'Au Parc des Expositions  de Troyes !',
              },
              {
                title: <strong>Ouverture de l'UTT Arena, discours et concert</strong>,
                description: 'Samedi 3 décembre à 9h',
              },
              { title: <strong>Début des tournois</strong>, description: 'Samedi 3 décembre à 10h' },
              { title: <strong>Places</strong>, description: '632 joueurs' },
              { title: <strong>Tarif</strong>, description: '25 € (22 € pour SSBU)' },
              { title: <strong>Âge minimum</strong>, description: "15 ans le jour de l'évènement" },
              {
                title: <strong>Tournois</strong>,
                description: 'SSBU, CS:GO, RL, LoL, Valorant, TFT, osu!, Libre',
              },
            ]}
            className="info-table"
          />

          <Link href="/information">
            <a>
              <Button primary className="info-button" rightIcon="fas fa-chevron-right">
                Toutes les informations
              </Button>
            </a>
          </Link>
        </div>

        <div className="home-tournaments">
          <TournamentCards />
        </div>

        {/* <div className="home-partners">
          <Title align="center">Partenaires</Title>
          <div className="list-partners">
            {!partners ? (
              <Loader />
            ) : !partners.length ? (
              <i>Les partenaires seront bientôt annoncés</i>
            ) : (
              partners.map((partner) => (
                <div className="partner" key={partner.link}>
                  <a
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Partenaire ${partner.name}`}>
                    <Card imgSrc={partner.image} classNameImg="partner-img" alt={`Partenaire ${partner.name}`} />
                  </a>
                </div>
              ))
            )}
          </div> */}

        {/* <Link href="/partners">
            <a>
              <Button primary className="partners-button" rightIcon="fas fa-chevron-right">
                Voir les partenaires
              </Button>
            </a>
          </Link> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Home;
