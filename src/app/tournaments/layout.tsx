'use client';
import { Button, Title } from '@/components/UI';
import constellation1 from '@/../public/images/clouds/constellation-1.png';
import constellation2 from '@/../public/images/clouds/constellation-2.png';
import constellation3 from '@/../public/images/clouds/constellation-3.png';
import cloud1 from '@/../public/images/clouds/cloud-1.png';
import cloud2 from '@/../public/images/clouds/cloud-2.png';
import cloud3 from '@/../public/images/clouds/cloud-3.png';
import cloud4 from '@/../public/images/clouds/cloud-4.png';
import parallaxCloud1 from '@/../public/images/clouds/parallax/cloud-1.png';
import parallaxCloud2 from '@/../public/images/clouds/parallax/cloud-2.png';
import parallaxCloud2Light from '@/../public/images/clouds/parallax/cloud-2-light.png';
import parallaxCloud3 from '@/../public/images/clouds/parallax/cloud-3.png';
import parallaxCloud3Light from '@/../public/images/clouds/parallax/cloud-3-light.png';
import moon from '@/../public/images/clouds/parallax/moon.png';
import Partners from '../../components/Partners';
import { usePathname, useRouter } from 'next/navigation';
import { setLoginModalVisible } from '@/modules/loginModal';
import { useAppDispatch } from '@/lib/hooks';
import type { Action } from '@reduxjs/toolkit';
import ScrollingParallax from '@/components/UI/ScrollingParallax';

const TournamentsLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="tournaments">
      <div className="top-container">
        <div className="top">
          <Title level={1} align={'center'}>
            Forme ton équipe et hisse-toi vers la victoire ultime dans un tournoi !
          </Title>
          <div className="text">
            Rejoins-nous dès maintenant pour vivre une expérience inoubliable, où l'amitié, la stratégie, et
            l'adrénaline se mêlent pour créer des souvenirs inégalables. C'est l'occasion parfaite de mettre en avant
            tes talents, de relever des défis palpitants et de créer des liens durables avec des coéquipiers passionnés.
          </div>
          <div className="buttons">
            <Button
              primary
              onClick={() => {
                if (pathname === '/tournaments') {
                  router.replace('/tournaments?scroll=true', {
                    scroll: false,
                  });
                } else {
                  router.push('/tournaments?scroll=true', {
                    scroll: false,
                  });
                }
              }}>
              Découvrir les tournois
            </Button>
            <Button primary onClick={() => dispatch(setLoginModalVisible(true) as unknown as Action)}>
              Se connecter
            </Button>
          </div>
        </div>
      </div>
      <div className="tournaments-content">
        <div className="background"></div>
        <div className="background-elements">
          <img src={constellation1.src} alt="background" className="constellation-1-1" />
          <img src={cloud3.src} alt="background" className="cloud-3" />
          <img src={cloud2.src} alt="background" className="constellation-2-1" />
          <img src={constellation2.src} alt="background" className="constellation-2-2" />
          <img src={cloud1.src} alt="background" className="constellation-3-1" />
          <img src={cloud4.src} alt="background" className="constellation-1-2" />
          <img src={constellation1.src} alt="background" className="constellation-1-3" />
          <img src={constellation3.src} alt="background" className="constellation-3-2" />
          <ScrollingParallax speed={2.6}>
            <img src={parallaxCloud1.src} alt="background" className="parallax-cloud-1" />
          </ScrollingParallax>
          <ScrollingParallax speed={2.3}>
            <img src={parallaxCloud2.src} alt="background" className="parallax-cloud-2" />
          </ScrollingParallax>
          <ScrollingParallax speed={1.9}>
            <img src={parallaxCloud2Light.src} alt="background" className="parallax-cloud-2-light" />
          </ScrollingParallax>
          <ScrollingParallax speed={3}>
            <img src={parallaxCloud3.src} alt="background" className="parallax-cloud-3" />
          </ScrollingParallax>
          <ScrollingParallax speed={1}>
            <img src={parallaxCloud3Light.src} alt="background" className="parallax-cloud-3-light" />
          </ScrollingParallax>
          <ScrollingParallax speed={2}>
            <img src={moon.src} alt="background" className="parallax-moon" />
          </ScrollingParallax>
        </div>
        {children}
      </div>
      <Partners />
    </div>
  );
};

export default TournamentsLayout;
