'use client';
import { useEffect } from 'react';
import Link from 'next/link';

import { Title, Button } from '@/components/UI';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <Title level={1} type={2}>
        Une erreur est survenue...
      </Title>
      <p>{error.name && `Erreur ${error.name}`}</p>

      <Button primary onClick={reset}>
        Réessayer
      </Button>

      <Link href="/">
        <Button primary>Retour à l'accueil</Button>
      </Link>
    </>
  );
}
