'use client';
import styles from './style.module.scss';
import Partners from '@/components/Partners';
import Slider from '@/components/landing/Slider';
import Counter from '@/components/landing/Counter';
import BoxContainer from '@/components/landing/BoxContainer';
import { VerticalDivider, Button, Title, Icon, TextBlock, YoutubeVideoContainer } from '@/components/UI';
import AppearFromSide from '@/components/UI/AppearFromSide';
import Link from 'next/link';
import ParallaxElementSettings from '@/components/parallax/ParallaxElementSettings';
import moon from '@/../public/images/clouds/parallax/moon.webp';
import Parallax from '@/components/parallax/Parallax';
import { IconName } from '@/components/UI/Icon';
import TextStroke from '@/components/UI/TextStroke';
import TournamentList from '@/components/landing/TournamentList';
import { setLoginModalVisible } from '@/modules/loginModal';
import { useAppDispatch } from '@/lib/hooks';
import parallaxCloud1 from '@/../public/images/clouds/parallax/cloud-1.webp';
import parallaxCloud2 from '@/../public/images/clouds/parallax/cloud-2.webp';
import parallaxCloud2Light from '@/../public/images/clouds/parallax/cloud-2-light.webp';
import parallaxCloud3 from '@/../public/images/clouds/parallax/cloud-3.webp';
import parallaxCloud3Light from '@/../public/images/clouds/parallax/cloud-3-light.webp';
import doubleImage1 from '@/../public/images/home/double-image-1.webp';
import doubleImage2 from '@/../public/images/home/double-image-2.webp';
import banner from '@/../public/images/banner.webp';

const Home = () => {
  const dispatch = useAppDispatch();
  return (
    <div id="home" className={styles.home}>
      <Parallax className={styles.parallax}>
        <ParallaxElementSettings speed={2.6} className={styles.parallaxCloud1}>
          <img src={parallaxCloud1.src} alt="background" loading="lazy" />
        </ParallaxElementSettings>
        <ParallaxElementSettings speed={2.3} className={styles.parallaxCloud2}>
          <img src={parallaxCloud2.src} alt="background" loading="lazy" />
        </ParallaxElementSettings>
        <ParallaxElementSettings speed={1.9} className={styles.parallaxCloud2Light}>
          <img src={parallaxCloud2Light.src} alt="background" loading="lazy" />
        </ParallaxElementSettings>
        <ParallaxElementSettings speed={3} className={styles.parallaxCloud3}>
          <img src={parallaxCloud3.src} alt="background" loading="lazy" />
        </ParallaxElementSettings>
        <ParallaxElementSettings speed={2.5} className={styles.parallaxCloud3Light}>
          <img src={parallaxCloud3Light.src} alt="background" loading="lazy" />
        </ParallaxElementSettings>
        <ParallaxElementSettings speed={2} className={styles.parallaxMoon}>
          <img src={moon.src} alt="background" loading="lazy" />
        </ParallaxElementSettings>
      </Parallax>
      <Slider
        className={styles.slider}
        slides={[
          <div key={'slide-1'} className={styles.homeHeader}>
            <div id="logo" className={styles.logo}>
              <img src="/images/logo-notext.webp" alt="Logo" loading="lazy" />
            </div>
            <div className={styles.homeTitle}>
              <TextStroke className={styles.main} classNameOfStroke={styles.stroke} width={20}>
                UTT Arena
              </TextStroke>
              <p>
                <span className={styles.accent}>6</span>, <span className={styles.accent}>7</span> et{' '}
                <span className={styles.accent}>8</span> décembre 2024
              </p>
            </div>
          </div>,
          <YoutubeVideoContainer key={'slide-2'} id="geOoiwoYtps" />,
          <div key={'slide-3'} className={styles.homeHeader}>
            <div className={styles.content}>
              <img src={banner.src} alt="Rejoindre l'aventure" loading="lazy" />
              <Title level={2} type={1} align="center">
                Rejoignez l'aventure
              </Title>
              <Button secondary large long onClick={() => dispatch(setLoginModalVisible(true))}>
                S'inscrire
              </Button>
            </div>
          </div>,
        ]}
        autoslide={false}
      />

      <AppearFromSide className={styles.ctaMain}>
        <Title level={2} type={1}>
          La plus grande compétition e-sport du grand est
        </Title>
        <TextStroke className={styles.ctaMainSubtitle}>Prépare toi à entrer dans l’arène !</TextStroke>
        <Link href="/event">
          <Button secondary>Découvrir l’évènement</Button>
        </Link>
      </AppearFromSide>

      <AppearFromSide fromRight className={styles.dataFlexing}>
        <BoxContainer title="chiffres.txt" className={styles.boxContainer}>
          <Counter value={6} name="Tournois" className={styles.sideCounter} />
          <VerticalDivider className={styles.divider} />
          <Counter value={4750} valueText=" €" name="de cashprize" className={styles.middleCounter} />
          <VerticalDivider className={styles.divider} />
          <Counter value={416} name="Participants" className={styles.sideCounter} />
        </BoxContainer>
      </AppearFromSide>

      <AppearFromSide className={styles.information}>
        <TextBlock title="UTT Arena 2024" images={[doubleImage1.src, doubleImage2.src]}>
          Le rendez-vous incontournable des amateurs de gaming de la région Grand-Est est de retour ! Il aura lieu les{' '}
          <strong>6, 7 et 8 décembre 2024</strong> au sein des locaux de l’Université de Technologie de Troyes ! Nous{' '}
          vous attendons nombreux pour cette 22e édition afin de passer 2 jours de folie ! <br />
          <br />
          Au programme : <strong>6 tournois</strong> sur tes jeux favoris, <strong>48h</strong> pour montrer tes skills
          parmis les <strong>416 joueurs</strong> qui composeront l’évènement, et tenter de remporter les{' '}
          <strong>cashprizes</strong>, <strong>lots</strong> et de nombreuses <strong>autres surprises</strong> ! Et
          pour animer cette édition, <strong>des guests d’exception</strong> viendront caster cette édition qui
          s’annonce enflammée ! Alors prépare tout ton stuff et impose toi dans l’arène !
        </TextBlock>
        <div className={styles.moreInfo}>
          <Link href={'/event#location'} className={styles.moreInfoContainer}>
            <Icon name={IconName.MapPin} />
            TROYES
          </Link>
          <Link href={'/event#program'} className={styles.moreInfoContainer}>
            <Icon name={IconName.Calendar} />
            6, 7, 8 Décembre 2024
          </Link>
        </div>
      </AppearFromSide>
      <div className={styles.tournaments}>
        <div className={styles.text}>
          <Title level={2}>Les tournois de l'UA24</Title>
          <div className={styles.textContent}>
            Cette année, l’UTT Arena propose <strong>6 tournois</strong> aux joueurs :{' '}
            <strong>League of Legends</strong>, <strong>Counter-Strike 2</strong>,{' '}
            <strong>Super Smash Bros. Ultimate</strong>, <strong>Teamfight Tactics</strong>, <strong>osu!</strong>, et{' '}
            <strong>un tournoi multigaming</strong>. <br />
            Tous les tournois donnent accès à la salle, à la buvette et à ses autres activités{' '}
            <strong>du vendredi soir au dimanche</strong> en <strong>24h/24</strong>. Tous les joueurs des tournois PC
            et multigaming (donc hors SSBU) auront accès à une <strong>place assise fixe</strong> où installer leurs
            ordinateurs. N’hésitez pas et rejoignez-nous dans l’arène !
          </div>
        </div>
        <TournamentList className={styles.list} />
      </div>
      <Partners />
    </div>
  );
};

export default Home;
