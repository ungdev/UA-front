import logo from '../../public/images/logo-footer.png';
import Button from './UI/Button';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();

  return (
    <footer>
      <img src={logo.src} alt="Logo UA23" />
      <div className="middle">
        <h3>Informations légales</h3>
        <Button onClick={() => router.push('/legal')}>Mentions légales</Button> <br />
        <Button onClick={() => router.push('/legal')}>Politique de confidentialité</Button>
      </div>
      <div className="right">
        <h3>Contact</h3>
        <Button>FAQ</Button>
        <div className="lecarreblanc"></div>
      </div>
    </footer>
  );
};
