import Link from 'next/link';

import { Title, Button } from '@/components/UI';

export default function NotFound() {
  return (
    <>
      <Title level={2}>Page introuvable</Title>
      <p>Erreur 404</p>

      <Link href="/">
        <Button primary leftIcon="fas fa-chevron-left">
          Retour à l'accueil
        </Button>
      </Link>
    </>
  );
}
