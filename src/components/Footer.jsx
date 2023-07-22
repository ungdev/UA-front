import logo from '../../public/logo-footer.png'
import Button from './UI/Button';

const Footer = () => (
  <footer>
    <img src={logo.src} alt="Logo UA23" />
    <div className="middle">
      <h3>Informations légales</h3>
      <Button>Mentions légales</Button> <br />
      <Button>Politique de confidentialité</Button>
    </div>
    <div className="right">
      <h3>Contact</h3>
      <Button>FAQ</Button>
      <div className="lecarreblanc"></div>
    </div>
  </footer>
);

export default Footer;
