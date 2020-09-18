import React from 'react';
import Link from 'next/link';

import { Title, Button } from '../components/UI';

const Error404 = () => (
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

export default Error404;
