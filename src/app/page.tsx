'use client';
import styles from './style.module.scss';
import Partners from '@/components/Partners';
import Slider from '@/components/landing/Slider';
import Counter from '@/components/landing/Counter';
import BoxContainer from '@/components/landing/BoxContainer';
import { VerticalDivider, Button, Title, Icon, VideoContainer, TextBlock } from '@/components/UI';
import AppearFromSide from '@/components/UI/AppearFromSide';
import Link from 'next/link';
import ParallaxElementSettings from '@/components/parallax/ParallaxElementSettings';
import moon from '@/../public/images/clouds/parallax/moon.png';
import Parallax from '@/components/parallax/Parallax';
import { IconName } from '@/components/UI/Icon';
import TextStroke from '@/components/UI/TextStroke';
import TournamentList from '@/components/landing/TournamentList';
import { setLoginModalVisible } from '@/modules/loginModal';
import { useAppDispatch } from '@/lib/hooks';
import { type Action } from '@reduxjs/toolkit';
import parallaxCloud1 from '@/../public/images/clouds/parallax/cloud-1.png';
import parallaxCloud2 from '@/../public/images/clouds/parallax/cloud-2.png';
import parallaxCloud2Light from '@/../public/images/clouds/parallax/cloud-2-light.png';
import parallaxCloud3 from '@/../public/images/clouds/parallax/cloud-3.png';
import parallaxCloud3Light from '@/../public/images/clouds/parallax/cloud-3-light.png';
import doubleImage1 from '@/../public/images/home/double-image-1.jpg';
import doubleImage2 from '@/../public/images/home/double-image-2.jpg';

const Home = () => {
  const dispatch = useAppDispatch();
  return (
    <div id="home" className={styles.home}>
      <Parallax className={styles.parallax}>
        <ParallaxElementSettings speed={2.6} className={styles.parallaxCloud1}>
          <img src={parallaxCloud1.src} alt="background" />
        </ParallaxElementSettings>
        <ParallaxElementSettings speed={2.3} className={styles.parallaxCloud2}>
          <img src={parallaxCloud2.src} alt="background" />
        </ParallaxElementSettings>
        <ParallaxElementSettings speed={1.9} className={styles.parallaxCloud2Light}>
          <img src={parallaxCloud2Light.src} alt="background" />
        </ParallaxElementSettings>
        <ParallaxElementSettings speed={3} className={styles.parallaxCloud3}>
          <img src={parallaxCloud3.src} alt="background" />
        </ParallaxElementSettings>
        <ParallaxElementSettings speed={2.5} className={styles.parallaxCloud3Light}>
          <img src={parallaxCloud3Light.src} alt="background" />
        </ParallaxElementSettings>
        <ParallaxElementSettings speed={2} className={styles.parallaxMoon}>
          <img src={moon.src} alt="background" />
        </ParallaxElementSettings>
      </Parallax>
      <Slider
        className={styles.slider}
        slides={[
          <div key={'slide-1'} className={styles.homeHeader}>
            <div id="logo" className={styles.logo}>
              <img src="/images/logo-notext.png" alt="Logo" />
            </div>
            <div className={styles.homeTitle}>
              <p className={styles.main}>UTT Arena</p>
              <p>
                <span className={styles.accent}>1</span>, <span className={styles.accent}>2</span> et{' '}
                <span className={styles.accent}>3</span> décembre 2023
              </p>
            </div>
          </div>,
          <VideoContainer key={'slide-2'} src="https://www.youtube.com/embed/t_QP8_bYJ1c" />,
          <div key={'slide-3'} className={styles.homeHeader}>
            <div className={styles.content}>
              <Title level={2} type={1} align="center">
                Rejoignez l'aventure
              </Title>
              <Button secondary large long onClick={() => dispatch(setLoginModalVisible(true) as unknown as Action)}>
                S'inscrire
              </Button>
            </div>
          </div>,
        ]}
        autoslide={false}
      />

      <AppearFromSide className={styles.ctaMain}>
        <Title level={1}>LA PLUS GRANDE COMPÉTITION E-SPORT DU GRAND EST</Title>
        <TextStroke className={styles.ctaMainSubtitle}>Prépare toi à entrer dans l’arène !</TextStroke>
        <Link href="/event">
          <Button secondary>Découvrir l’évènement</Button>
        </Link>
      </AppearFromSide>

      <AppearFromSide fromRight className={styles.dataFlexing}>
        <BoxContainer title="chiffres.txt" className={styles.boxContainer}>
          <Counter value={8} name="Jeux" className={styles.sideCounter} />
          <VerticalDivider className={styles.divider} />
          <Counter value={5000} valueText=" €" name="de cashprize" toCome className={styles.middleCounter} />
          <VerticalDivider className={styles.divider} />
          <Counter value={520} name="Participants" className={styles.sideCounter} />
        </BoxContainer>
      </AppearFromSide>

      <AppearFromSide className={styles.information}>
        <TextBlock title="UTT Arena 2023" images={[doubleImage1.src, doubleImage2.src]}>
          Le rendez-vous incontournable des amateurs de gaming de la région Auboise est de retour ! Il aura lieu les 1,
          2 et 3 décembre 2023 dans un tout nouveau lieu : la Halle Sportive de l’Université de Technologie de Troyes !
          Nous vous attendons nombreux pour cette 21e édition afin de passer 2 jours de folie ! <br />
          Au programme : 8 tournois sur tes jeux favoris, 48h pour montrer tes skills parmis les 520 joueurs qui
          composeront l’évènement, et tenter de remporter les cashprizes, lots et de nombreuses autres surprises ! Et
          pour animer cette édition, des guests d’exception viendront caster cette édition qui s’annonce enflammée !
          Alors prépare tout ton stuff et impose toi dans l’arène !
        </TextBlock>
        <div className={styles.moreInfo}>
          <Link href={'/event#location'} className={styles.moreInfoContainer}>
            <Icon name={IconName.MapPin} />
            TROYES
          </Link>
          <Link href={'/event#program'} className={styles.moreInfoContainer}>
            <Icon name={IconName.Calendar} />
            1, 2, 3 Décembre 2023
          </Link>
        </div>
      </AppearFromSide>
      <div className={styles.tournaments}>
        <div className={styles.text}>
          <Title>Les tournois de l'UA23</Title>
          <div className={styles.textContent}>
            Cette année, l’UTT Arena propose 8 tournois aux joueurs : League of Legend, Counter-Strike 2, Rocket League,
            Super Smash Bros Ultimate, Teamfight Tactics, Osu!, Pokémon et un tournoi libre. Tous les tournois donnent
            accès à la salle, à la buvette et à ses autres activités du vendredi soir au dimanche en 24h/24. Tous les
            joueurs des tournois PC et libre (donc hors SSBU et Pokémon) auront accès à une place assise fixe où
            installer son ordinateur. N’hésitez pas et rejoignez-nous dans l’arène !
          </div>
        </div>
        <TournamentList className={styles.list} />
      </div>
      <Partners />
    </div>
  );
};

export default Home;
