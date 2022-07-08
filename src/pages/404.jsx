import React from 'react';
import Link from 'next/link';

import { Button } from '../components/UI';

const Error404 = () => (
  <>
    <h2>Page introuvable</h2>
    <p>Erreur 404</p>

    <Link href="/">
      <Button primary leftIcon="fas fa-chevron-left">
        Retour à l'accueil
      </Button>
    </Link>
  </>
);

export default Error404;
