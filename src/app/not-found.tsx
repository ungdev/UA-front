import styles from './not-found.module.scss';
import Link from 'next/link';

import { Title, Button } from '@/components/UI';

export default function NotFound() {
  return (
    <>
      <div id="not-found" className={styles.notFound}>
        <Title level={1} type={1} align="center">
          Page introuvable
        </Title>
        <p>Erreur 404</p>

        <Link href="/">
          <Button primary>Retour à l'accueil</Button>
        </Link>
      </div>
    </>
  );
}
