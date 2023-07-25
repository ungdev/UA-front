import Button from './UI/Button';
import Link from 'next/link';

/**
 * Navbar component that displays a navigation bar with links to different pages.
 * @returns JSX.Element
 */
export default function Navbar() {
  return (
    <nav>
      <Link href="/">
        <Button className="home">Accueil</Button>
      </Link>
      <Link href="/">
        <Button className="event">Événement</Button>
      </Link>
      <Link href="/tournaments">
        <Button className="tournament">Tournois</Button>
      </Link>
      <Link href="/">
        <Button className="help">Aide</Button>
      </Link>
    </nav>
  );
}
