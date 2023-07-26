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
      <Title level={2}>Une erreur est survenue...</Title>
      <p>{error.name && `Erreur ${error.name}`}</p>

      <Link href="/">
        <Button primary leftIcon="fas fa-chevron-left">
          Retour à l'accueil
        </Button>
      </Link>
    </>
  );
}
