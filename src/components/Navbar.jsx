import Button from './UI/Button';

const Navbar = () => (
  <nav>
    <Button className="home">Accueil</Button>
    <Button className="event">Event</Button>
    <Button className="tournament">Tournois</Button>
    <Button className="help">Aide</Button>
  </nav>
);

export default Navbar;
