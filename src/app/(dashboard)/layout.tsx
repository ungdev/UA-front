'use client';
import PanelHeader from '@/components/dashboard/PanelHeader';
import { useAppSelector } from '@/lib/hooks';
import { Permission } from '@/types';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const permissions = useAppSelector((state) => state.login.user! && state.login.user!.permissions);
  const isShopAllowed = useAppSelector((state) => state.settings.shop);
  const isAdminPanel = pathname.startsWith('/admin');

  // Define state variables
  const isSpectator = useAppSelector((state) => state.login.status.spectator);
  const hasTeam = useAppSelector((state) => state.login.status.team);
  const hasBoughtSomething = useAppSelector((state) => !!state.carts.allCarts.length);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const links = () => {
    const menu = [];

    // Team / spectator / register
    if (hasTeam) {
      menu.push({ title: 'Équipe', href: '/dashboard/team' });
    } else if (isSpectator) {
      menu.push({ title: 'Spectateur', href: '/dashboard/spectator' });
    } else {
      menu.push({ title: 'Inscription', href: '/dashboard/register' });
    }
    // Shop
    if (isShopAllowed && (isSpectator || hasTeam || permissions.includes(Permission.orga))) {
      menu.push({ title: 'Boutique', href: '/dashboard/shop' });
    }
    if (isSpectator || hasTeam || hasBoughtSomething) {
      menu.push({ title: 'Mes achats', href: '/dashboard/purchases' });
    }

    // Admin panel
    if (permissions.includes(Permission.anim) || permissions.includes(Permission.admin)) {
      menu.push({ title: 'Utilisateurs', href: '/admin/users' });
      menu.push({ title: 'Tournois', href: '/admin/tournaments' });
    }
    if (permissions.includes(Permission.entry) || permissions.includes(Permission.admin)) {
      menu.push({ title: 'Entrée', href: '/admin/scan' });
    }
    if (permissions.includes(Permission.admin)) {
      menu.push({ title: 'Boutique', href: '/admin/shop' });
      menu.push({ title: 'Partenaires', href: '/admin/partners' });
      menu.push({ title: 'Mails', href: '/admin/mails' });
      menu.push({ title: 'Paramètres', href: '/admin/settings' });
    }
    if (permissions.includes(Permission.orga)) {
      menu.push({ title: 'Badge', href: '/admin/badge' });
    }
    if (permissions.includes(Permission.admin)) {
      menu.push({ title: 'Badge Generator', href: '/admin/genbadge' });
    }

    // Account panel
    menu.push({ title: 'Compte', href: '/dashboard/account' });
    return menu;
  };

  return (
    <>
      {isAdminPanel ? (
        <PanelHeader pathname={pathname} links={links} title="Administration" />
      ) : (
        <PanelHeader pathname={pathname} links={links} title="Dashboard" />
      )}
      {children}
    </>
  );
}
