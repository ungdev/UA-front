'use client';
import styles from './Footer.module.scss';
import Button from './UI/Button';

import logo from '@/../public/images/logo-footer.webp';
import Link from 'next/link';
import { Icon } from './UI';
import { useState } from 'react';
import { IconName } from './UI/Icon';
import Image from 'next/image';

/**
 * Footer component that displays legal information and contact details.
 */
export default function Footer() {
  const [copyrightTurned, setCopyrightTurned] = useState(false);
  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.row}>
        <div>
          <Image src={logo.src} alt="Logo UA23" width={340} height={139} />
        </div>
        <div className={styles.middle}>
          <h3>Informations légales</h3>
          <Link href={'/legal'}>
            <Button>Mentions légales</Button>
          </Link>
          <Link href={'/legal#CGV'}>
            <Button>Conditions générales de ventes</Button>
          </Link>
        </div>
        <div className={styles.right}>
          <h3>Plus d'informations</h3>
          <Link href={'/help#contact'}>
            <Button>Nous contacter</Button>
          </Link>
          <Link href={'/help#faq'}>
            <Button>FAQ</Button>
          </Link>
          <div className={styles.socials}>
            <Link href={'https://discord.gg/WhxZwKU'} aria-label="Discord" rel="noopener" passHref={true}>
              <Icon name={IconName.Discord} fill={true} />
            </Link>
            <Link href={'https://www.twitch.tv/uttarena'} aria-label="Twitch" rel="noopener" passHref={true}>
              <Icon name={IconName.Twitch} fill={true} />
            </Link>
            <Link
              href={'https://www.youtube.com/user/UTTNetGroup/'}
              aria-label="Youtube"
              rel="noopener"
              passHref={true}>
              <Icon name={IconName.Youtube} fill={true} />
            </Link>
            <Link href={'https://www.instagram.com/uttarena/'} aria-label="Instagram" rel="noopener" passHref={true}>
              <Icon name={IconName.Instagram} fill={true} />
            </Link>
            <Link href={'https://twitter.com/uttarena'} aria-label="Twitter" rel="noopener" passHref={true}>
              <Icon name={IconName.Twitter} fill={true} />
            </Link>
            <Link href={'https://www.facebook.com/UTTArena'} aria-label="Facebook" rel="noopener" passHref={true}>
              <Icon name={IconName.Facebook} fill={true} />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <Button
          className={`${copyrightTurned ? styles.turned : ''}`}
          onClick={() => setCopyrightTurned(!copyrightTurned)}>
          © {new Date().getFullYear()} UTT Net Group
        </Button>
      </div>
    </footer>
  );
}
