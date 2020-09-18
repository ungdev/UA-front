import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from './UI';
import { getCookie } from '../utils';

const cookieName = 'cookie-consent';

const CookieConsent = () => {
  const [display, setDisplay] = useState(false);

  const buttonClick = () => {
    // Set expiration date in 1 year
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${cookieName}=true; expires=${expires}; path= /`;

    setDisplay(false);
  };

  useEffect(() => {
    if (getCookie(cookieName) === '') {
      setDisplay(true);
    }
  }, []);

  if (!display) {
    return null;
  }

  return (
    <div className="cookie-consent">
      Nous utilisons les cookies pour proposer et améliorer nos services. En navigant sur notre site, vous acceptez
      l'utilisation des cookies.{' '}
      <Link href="/legal">
        <a>En&nbsp;savoir&nbsp;plus</a>
      </Link>
      <Button onClick={buttonClick} className="cookie-consent-button">
        J'ai compris
      </Button>
    </div>
  );
};

export default CookieConsent;
