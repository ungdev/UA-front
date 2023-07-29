import Button from './UI/Button';
import Link from 'next/link';
import { useState } from 'react';

/**
 * Navbar component that displays a navigation bar with links to different pages.
 * @returns JSX.Element
 */
export default function Navbar() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  return (
    <nav>
      <div className="left">
        <Link href="/">
          <Button className="home">Accueil</Button>
        </Link>
        <Link href="/event">
          <Button className="event">Événement</Button>
        </Link>
        <Link href="/tournaments">
          <Button className="tournament">Tournois</Button>
        </Link>
        <Link href="/help">
          <Button className="help">Aide</Button>
        </Link>
      </div>
      <div className="right">
        <Link href="/about">
          <Button className="about">A propos</Button>
        </Link>

        <Button primary className="connection">
          Connexion
        </Button>

        <div className={"burger " + (isBurgerOpen ? 'open' : '')} onClick={() => setIsBurgerOpen(!isBurgerOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}
