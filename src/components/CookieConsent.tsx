import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from './UI';
import { getCookie } from '@/utils/cookies';

const cookieName = 'cookie-consent';

/**
 * Component that displays a cookie consent banner and sets a cookie when the user accepts.
 * The banner is only displayed if the user has not previously accepted the cookie policy.
 */
export default function CookieConsent() {
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
      Nous utilisons les cookies pour proposer et améliorer nos services. En appuyant sur J'accepte, tu consens
      {' à'} l'utilisation de ces cookies. <Link href="/legal">En&nbsp;savoir&nbsp;plus</Link>
      <br />
      <div className="button-row">
        <Button onClick={buttonClick} className="cookie-button consent">
          J'accepte
        </Button>
        <Button onClick={() => setDisplay(false)} className="cookie-button deny">
          Je refuse
        </Button>
      </div>
    </div>
  );
}
