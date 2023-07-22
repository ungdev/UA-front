import Button from './UI/Button';
import Link from 'next/link';

const Navbar = () => (
  <nav>
    <Link href="/">
      <Button className="home">Accueil</Button>
    </Link>
    <Link href="/">
      <Button className="event">Événement</Button>
    </Link>
    <Link href="/">
      <Button className="tournament">Tournois</Button>
    </Link>
    <Link href="/">
      <Button className="help">Aide</Button>
    </Link>
  </nav>
);

export default Navbar;
