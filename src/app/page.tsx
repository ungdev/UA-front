'use client';
import styles from './style.module.scss';
import Partners from '@/components/Partners';
import Slider from '@/components/landing/Slider';
import Counter from '@/components/landing/Counter';
import BoxContainer from '@/components/landing/BoxContainer';
import { VerticalDivider, Button, Title, Icon, TextBlock, YoutubeVideoContainer } from '@/components/UI';
import AppearFromSide from '@/components/UI/AppearFromSide';
import Link from 'next/link';
import { IconName } from '@/components/UI/Icon';
import TextStroke from '@/components/UI/TextStroke';
import TournamentList from '@/components/landing/TournamentList';
import { setLoginModalVisible } from '@/modules/loginModal';
import { useAppDispatch } from '@/lib/hooks';
import doubleImage1 from '@/../public/images/home/double-image-1.webp';
import doubleImage2 from '@/../public/images/home/double-image-2.webp';
import banner from '@/../public/images/banner.webp';

const Home = () => {
  const dispatch = useAppDispatch();
  return (
    <div id="home" className={styles.home}>
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
                <span className={styles.accent}>28</span>, <span className={styles.accent}>29</span> et{' '}
                <span className={styles.accent}>30</span> novembre 2025
              </p>
            </div>
          </div>,
          <YoutubeVideoContainer key={'slide-2'} id="315SgDcRU2M" />,
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
          <Counter value={7} name="Tournois" className={styles.sideCounter} />
          <VerticalDivider className={styles.divider} />
          <Counter value={5850} valueText=" €" name="de cashprize" className={styles.middleCounter} />
          <VerticalDivider className={styles.divider} />
          <Counter value={496} name="Participants" className={styles.sideCounter} />
        </BoxContainer>
      </AppearFromSide>

      <AppearFromSide className={styles.information}>
        <TextBlock title="UTT Arena 2025" images={[doubleImage1.src, doubleImage2.src]}>
          Le rendez-vous incontournable des amateurs de gaming de la région Grand-Est est de retour ! Il aura lieu les{' '}
          <strong>28, 29 et 30 novembre 2025</strong> au sein des locaux de l’Université de Technologie de Troyes ! Nous{' '}
          vous attendons nombreux pour cette 23e édition afin de passer 2 jours de folie ! <br />
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
            28, 29 et 30 novembre 2025
          </Link>
        </div>
      </AppearFromSide>
      <div className={styles.tournaments}>
        <div className={styles.text}>
          <Title level={2}>Les tournois de l'UA25</Title>
          <div className={styles.textContent}>
            Cette année, l’UTT Arena propose <strong>6 tournois</strong> aux joueurs :{' '}
            <strong>League of Legends</strong>, <strong>Counter-Strike 2</strong>, <strong>Valorant</strong>,{' '}
            <strong>Teamfight Tactics</strong>, <strong>osu!</strong>, et <strong>un tournoi multigaming</strong>.{' '}
            <br />
            Tous les tournois donnent accès à la salle, à la buvette et à ses autres activités{' '}
            <strong>du vendredi soir au dimanche</strong> en <strong>24h/24</strong>. Tous les joueurs des tournois PC
            et multigaming auront accès à une <strong>place assise fixe</strong> où installer leurs ordinateurs.
            N’hésitez pas et rejoignez-nous dans l’arène !
          </div>
        </div>
        <TournamentList className={styles.list} />
      </div>
      <Partners />
    </div>
  );
};

export default Home;
