'use client';
import Button from './UI/Button';

import logo from '../../public/images/logo-footer.png';
import Link from 'next/link';
import { Icon } from './UI';
import { useState } from 'react';

/**
 * Footer component that displays legal information and contact details.
 */
export default function Footer() {
  const [copyrightTurned, setCopyrightTurned] = useState(false);
  return (
    <footer>
      <div className="row">
        <div>
          <img src={logo.src} alt="Logo UA23" />
        </div>
        <div className="middle">
          <h3>Informations légales</h3>
          <Link href={'/legal'}>
            <Button>Mentions légales</Button>
          </Link>
          <Link href={'/legal'}>
            <Button>Politique de confidentialité</Button>
          </Link>
        </div>
        <div className="right">
          <h3>Plus d'informations</h3>
          <Link href={'/help#contact'}>
            <Button>Nous contacter</Button>
          </Link>
          <Link href={'/help#faq'}>
            <Button>FAQ</Button>
          </Link>
          <div className="socials">
            <Link href={'https://discord.gg/WhxZwKU'}>
              <Icon name="discord" fill={true} />
            </Link>
            <Link href={'https://www.twitch.tv/uttarena'}>
              <Icon name="twitch" fill={true} />
            </Link>
            <Link href={'https://www.youtube.com/user/UTTNetGroup/'}>
              <Icon name="youtube" fill={true} />
            </Link>
            <Link href={'https://www.instagram.com/uttarena/'}>
              <Icon name="instagram" fill={true} />
            </Link>
            <Link href={'https://www.facebook.com/UTTArena'}>
              <Icon name="facebook" fill={true} />
            </Link>
            <Link href={'https://twitter.com/uttarena'}>
              <Icon name="twitter" fill={true} />
            </Link>
          </div>
        </div>
      </div>
      <div className="copyright">
        <Button className={`${copyrightTurned ? 'turned' : ''}`} onClick={() => setCopyrightTurned(!copyrightTurned)}>
          © {new Date().getFullYear()} UTT Net Group
        </Button>
      </div>
    </footer>
  );
}
