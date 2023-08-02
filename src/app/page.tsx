import Partners from '@/components/Partners';

import Slider from '@/components/landing/Slider';
import Counter from '@/components/landing/Counter';
import BoxContainer from '@/components/landing/BoxContainer';
import { VerticalDivider, Button, Title, Icon, VideoContainer, TextBlock } from '@/components/UI';
import AppearFromSide from '@/components/UI/AppearFromSide';

const Home = () => {
  return (
    <div id="home">
      <Slider
        slides={[
          <div key={'slide-1'} className="home-header">
            <div id="logo">
              <img src="/images/logo-notext.png" alt="Logo" />
            </div>
            <div className="home-title">
              <p className="main">UTT Arena</p>
              <p>
                <span className="accent">3</span> et <span className="accent">4</span> décembre 2022
              </p>
            </div>
          </div>,
          <VideoContainer key={'slide-2'} src="https://www.youtube.com/embed/t_QP8_bYJ1c" />,
          <div key={'slide-3'} style={{ backgroundColor: 'blue', width: '100%', height: '100%' }}>
            Test 3
          </div>,
        ]}
        autoslide={false}
      />

      <AppearFromSide smooth>
        <div className="cta-main">
          <Title level={1}>LA PLUS GRANDE COMPÉTITION E-SPORT DU GRAND EST</Title>
          <div className="cta-main-subtitle">Prépare toi à entrer dans l’arène !</div>
          <Button primary className="connection">
            Découvrir l’événement
          </Button>
        </div>
      </AppearFromSide>

      <AppearFromSide fromRight smooth>
        <BoxContainer title="chiffres.txt">
          <Counter value={7} name="Jeux" className="flex-1" />
          <VerticalDivider />
          <Counter value={10000} valueText=" €" name="de cashprize" className="flex-2" />
          <VerticalDivider />
          <Counter value={500} name="Participants" className="flex-1" />
        </BoxContainer>
      </AppearFromSide>

      <AppearFromSide smooth>
        <div className="information">
          <TextBlock
            title="UTT Arena 2023"
            images={['https://picsum.photos/seed/add/1920/1080/', 'https://picsum.photos/1920/1080']}>
            LE rendez-vous gaming annuel de la région Auboise aura lieu les 3 et 4 décembre 2022 dans un lieu que vous
            connaissez bien : le Cube ! Plus de 2250m2 t'attendent pour passer 2 jours de folie ! <br />
            Au programme : 7 tournois sur tes jeux favoris, 2 jours pour montrer tes skills parmis les 630 joueurs qui
            composeront l’évènement, et tenter de remporter les cashprizes, lots et de nombreuses autres surprises ! Et
            pour animer cette édition, des guests d’exception viendront caster cette édition qui s’annonce enflammée !
            Alors prépare tout ton stuff et impose toi dans l’arène !
          </TextBlock>
          <div className="more-info">
            <div className="more-info-container">
              <Icon name="map-pin" fill={false} />
              TROYES
            </div>
            <div className="more-info-container">
              <Icon name="calendar" fill={false} />
              1, 2, 3 Décembre 2023
            </div>
          </div>
        </div>
      </AppearFromSide>
      <Partners />
    </div>
  );
};

export default Home;
