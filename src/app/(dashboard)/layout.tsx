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
  const hasPaid = useAppSelector((state) => state.login.status.paid);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const linksDashboard = () => {
    const menu = [];

    if (hasTeam) {
      menu.push({ title: 'Équipe', href: '/dashboard/team' });
    } else if (isSpectator) {
      menu.push({ title: 'Spectateur', href: '/dashboard/spectator' });
    } else if (hasPaid) {
      menu.push({ title: 'Inscription', href: '/dashboard/register' });
    }

    if (isSpectator || hasTeam) {
      if (isShopAllowed) {
        menu.push({ title: 'Boutique', href: '/dashboard/shop' });
      }
      menu.push({ title: 'Mes achats', href: '/dashboard/purchases' });
    } else {
      menu.push({ title: 'Inscription', href: '/dashboard/register' });
    }

    menu.push({ title: 'Mon compte', href: '/dashboard/account' });
    return menu;
  };

  const linksAdmin = () => {
    const menu = [];

    if (permissions.includes(Permission.anim) || permissions.includes(Permission.admin)) {
      menu.push({ title: 'Utilisateurs', href: '/admin/users' });
    }

    if (permissions.includes(Permission.entry) || permissions.includes(Permission.admin)) {
      menu.push({ title: 'Entrée', href: '/admin/scan' });
    }

    menu.push({ title: 'Mon compte', href: '/admin/account' });

    return menu;
  };

  return (
    <>
      {isAdminPanel ? (
        <PanelHeader pathname={pathname} links={linksAdmin} title="Administration" />
      ) : (
        <PanelHeader pathname={pathname} links={linksDashboard} title="Dashboard" />
      )}
      {children}
    </>
  );
}
