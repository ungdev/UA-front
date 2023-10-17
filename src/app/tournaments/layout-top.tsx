'use client';
import styles from '@/app/tournaments/layout-top.module.scss';
import { Button, Title } from '@/components/UI';
import { setLoginModalVisible } from '@/modules/loginModal';
import { type Action } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { redirect, usePathname, useRouter } from 'next/navigation';

export default function LayoutTop() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const login = useAppSelector((state) => state.settings.login);

  return (
    <div className={styles.topContainer}>
      <div className={styles.top}>
        <Title level={3} type={1} align={'center'}>
          Forme ton équipe et hisse-toi vers la victoire ultime dans un tournoi !
        </Title>
        <div className={styles.text}>
          Rejoins-nous dès maintenant pour vivre une expérience inoubliable, où l'amitié, la stratégie, et l'adrénaline
          se mêlent pour créer des souvenirs inégalables. C'est l'occasion parfaite de mettre en avant tes talents, de
          relever des défis palpitants et de créer des liens durables avec des coéquipiers passionnés.
        </div>
        <div className={styles.buttons}>
          <Button
            className={styles.button}
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
          <Button
            className={styles.button}
            primary
            onClick={() => {
              if (login) {
                dispatch(redirect('/dashboard'));
                return;
              }
              dispatch(setLoginModalVisible(true) as unknown as Action);
            }}>
            {login ? 'Dashboard' : 'Se connecter'}
          </Button>
        </div>
      </div>
    </div>
  );
}
