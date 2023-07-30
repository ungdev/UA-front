import Link from 'next/link';
import Navbar from './Navbar';

import logo from '../../public/images/logo.png';

/**
 * Header component that displays the logo, navigation bar, and buttons for about and login.
 * @returns JSX.Element
 */
export default function Header() {
  return (
    <header id="header">
      <Link href="/">
        <img src={logo.src} alt="Logo UA23" />
      </Link>
      <Navbar />
    </header>
  );
}
