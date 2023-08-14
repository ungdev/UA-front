'use client';
import PanelHeader from '@/components/dashboard/PanelHeader';
import { useAppSelector } from '@/lib/hooks';
import { Permission, UserType } from '@/types';
import { hasOrgaPermission } from '@/utils/permission';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const permissions = useAppSelector((state) => state.login.user! && state.login.user!.permissions);
  const isShopAllowed = useAppSelector((state) => state.settings.shop);
  const isAdminPanel = pathname.startsWith('/dashboard/admin');

  // Define state variables
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasTeam, setHasTeam] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSpectator, setIsSpectator] = useState(false);

  // Update state variables based on changes to the login state
  useAppSelector((state) => {
    const user = state.login.user!;
    if (isLoggedIn !== !!user) {
      setIsLoggedIn(!!user);
      setHasTeam(!!user.teamId);
      setIsSpectator(user.type === UserType.spectator);
    } else if (user && hasTeam !== !!user.teamId) {
      setHasTeam(!!user.teamId);
    } else if (user && !isSpectator && user.type === UserType.spectator) {
      setIsSpectator(true);
    } else if (user && isSpectator && user.type !== UserType.spectator) {
      setIsSpectator(false);
    }
    if (user && hasPaid !== user.hasPaid) {
      setHasPaid(user.hasPaid);
    }
    if (user && user.permissions != undefined && hasOrgaPermission(user.permissions) !== isAdmin) {
      setIsAdmin(!isAdmin);
    }
  });

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
