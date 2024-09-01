'use client';
import styles from '@/app/tournaments/layout-top.module.scss';
import { Button, Title } from '@/components/UI';
import { setLoginModalVisible } from '@/modules/loginModal';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { setRedirect } from '@/modules/redirect';

export default function LayoutTop() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const status = useAppSelector((state) => state.login.status);

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
              if (status.login) {
                dispatch(setRedirect('/dashboard'));
                return;
              }
              dispatch(setLoginModalVisible(true));
            }}>
            {status ? 'Dashboard' : 'Se connecter'}
          </Button>
        </div>
      </div>
    </div>
  );
}
