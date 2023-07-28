import Button from './UI/Button';
import { useRouter } from 'next/navigation';

import logo from '../../public/images/logo-footer.png';
import Link from 'next/link';
import { Icon } from './UI';

/**
 * Footer component that displays legal information and contact details.
 */
export default function Footer() {
  const router = useRouter();

  return (
    <footer>
      <img src={logo.src} alt="Logo UA23" />
      <div className="middle">
        <h3>Informations légales</h3>
        <Link href={'/legal'}><Button>Mentions légales</Button></Link>
        <Link href={'/legal'}><Button>Politique de confidentialité</Button></Link>
      </div>
      <div className="right">
        <h3>Plus d'informations</h3>
        <Link href={'/help#contact'}><Button>Nous contacter</Button></Link>
        <Link href={'/help#faq'}><Button>FAQ</Button></Link>
        <div className="socials">
          <Icon name="instagram" fill={true} />
          <Icon name="facebook" fill={true} />
          <Icon name="twitter" fill={true} />
          <Icon name="twitch" fill={true} />
          <Icon name="youtube" fill={true} />
        </div>
      </div>
    </footer>
  );
}
