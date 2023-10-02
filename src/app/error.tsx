'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import styles from './not-found.module.scss';

import { Title, Button } from '@/components/UI';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  function copyError() {
    // Copy the error to the clipboard
    navigator.clipboard.writeText(error.toString());
  }

  return (
    <>
      <div id={styles.notFound}>
        <Title level={1} type={1} align="center">
          Une erreur est survenue...
        </Title>
        {/* <p>{error.name && `Erreur ${error.name}`}</p> */}
        <p>Si tu penses que ce n'est pas ta faute, contacte le staff.</p>

        {/* allow user to copy the error to his clipboard */}
        <Button onClick={copyError}>Copier l'erreur</Button>

        <div className={styles.buttons}>
          <Link href={window.location.href}>
            <Button primary onClick={reset}>
              Réessayer
            </Button>
          </Link>

          <Link href="/">
            <Button primary>Retour à l'accueil</Button>
          </Link>
        </div>

        <div className={styles.grass}>
          <p>C'est l'heure de toucher de l'herbe...</p>
        </div>
      </div>
    </>
  );
}
