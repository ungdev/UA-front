'use client';
import Partners from '@/components/Partners';

import Slider from '@/components/landing/Slider';
import Counter from '@/components/landing/Counter';
import BoxContainer from '@/components/landing/BoxContainer';
import { VerticalDivider, Button, Title, Icon, VideoContainer, TextBlock } from '@/components/UI';
import AppearFromSide from '@/components/UI/AppearFromSide';
import Link from 'next/link';
import ParallaxElementSettings from '@/components/parallax/ParallaxElementSettings';
import parallaxCloud1 from '../../public/images/clouds/parallax/cloud-1.png';
import parallaxCloud2 from '../../public/images/clouds/parallax/cloud-2.png';
import parallaxCloud2Light from '../../public/images/clouds/parallax/cloud-2-light.png';
import parallaxCloud3 from '../../public/images/clouds/parallax/cloud-3.png';
import parallaxCloud3Light from '../../public/images/clouds/parallax/cloud-3-light.png';
import moon from '../../public/images/clouds/parallax/moon.png';
import Parallax from '@/components/parallax/Parallax';

const Home = () => {
  return (
    <div id="home">
      <Parallax>
        <ParallaxElementSettings speed={2.6} className="parallax-cloud-1">
          <img src={parallaxCloud1.src} alt="background" />
        </ParallaxElementSettings>
        <ParallaxElementSettings speed={2.3} className="parallax-cloud-2">
          <img src={parallaxCloud2.src} alt="background" />
        </ParallaxElementSettings>
        <ParallaxElementSettings speed={1.9} className="parallax-cloud-2-light">
          <img src={parallaxCloud2Light.src} alt="background" />
        </ParallaxElementSettings>
        <ParallaxElementSettings speed={3} className="parallax-cloud-3">
          <img src={parallaxCloud3.src} alt="background" />
        </ParallaxElementSettings>
        <ParallaxElementSettings speed={2.5} className="parallax-cloud-3-light">
          <img src={parallaxCloud3Light.src} alt="background" />
        </ParallaxElementSettings>
        <ParallaxElementSettings speed={2} className="parallax-moon">
          <img src={moon.src} alt="background" />
        </ParallaxElementSettings>
      </Parallax>
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
          <div key={'slide-3'} className="home-header">
            <div className="content">
              <Title level={1} align="center">
                Rejoignez l'aventure
              </Title>
              <Button secondary large long>
                S'inscrire
              </Button>
            </div>
          </div>,
        ]}
        autoslide={false}
      />

      <AppearFromSide smooth className="cta-main">
        <Title level={1}>LA PLUS GRANDE COMPÉTITION E-SPORT DU GRAND EST</Title>
        <div className="cta-main-subtitle">Prépare toi à entrer dans l’arène !</div>
        <Link href="/event">
          <Button secondary className="connection">
            Découvrir l’événement
          </Button>
        </Link>
      </AppearFromSide>

      <AppearFromSide fromRight smooth className="data-flexing">
        <BoxContainer title="chiffres.txt">
          <Counter value={7} name="Jeux" className="flex-1" />
          <VerticalDivider />
          <Counter value={10000} valueText=" €" name="de cashprize" className="flex-2" />
          <VerticalDivider />
          <Counter value={500} name="Participants" className="flex-1" />
        </BoxContainer>
      </AppearFromSide>

      <AppearFromSide smooth className="information">
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
            <Icon name="map-pin" />
            TROYES
          </div>
          <div className="more-info-container">
            <Icon name="calendar" />
            1, 2, 3 Décembre 2023
          </div>
        </div>
      </AppearFromSide>
      <Partners />
    </div>
  );
};

export default Home;
