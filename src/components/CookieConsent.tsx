'use client';
import styles from './CookieConsent.module.scss';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from './UI';
import { getCookie } from '@/utils/cookies';

const cookieName = 'cookie-consent';

/**
 * Component that displays a cookie consent banner and sets a cookie when the user accepts.
 * The banner is only displayed if the user has not previously accepted the cookie policy.
 */
export default function CookieConsent({
  initialDisplay = false,
}: {
  /** Whether the banner should be displayed initially. */
  initialDisplay?: boolean;
}) {
  const [display, setDisplay] = useState(initialDisplay ? initialDisplay : false);

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
    <div id={styles.cookieConsent}>
      Nous utilisons les cookies pour proposer et améliorer nos services. En appuyant sur J'accepte, tu consens
      {' à'} l'utilisation de ces cookies. <Link href="/legal">En&nbsp;savoir&nbsp;plus</Link>
      <br />
      <div className={styles.buttonRow}>
        <Button primary onClick={buttonClick} className={styles.cookieButton}>
          J'accepte
        </Button>
        <Button primary onClick={() => setDisplay(false)} className={styles.cookieButton}>
          Je refuse
        </Button>
      </div>
    </div>
  );
}
