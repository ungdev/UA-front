'use client';
import PanelHeader from '@/components/dashboard/PanelHeader';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchAdminPartners, fetchAdminTournaments, fetchAdminItems } from '@/modules/admin';
import { Permission } from '@/types';
import type { Action } from '@reduxjs/toolkit';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const permissions = useAppSelector((state) => state.login.user! && state.login.user!.permissions);
  const isShopAllowed = useAppSelector((state) => state.settings.shop);
  const isAdminPanel = pathname.startsWith('/admin');

  // Define state variables
  const isSpectator = useAppSelector((state) => state.login.status.spectator);
  const hasTeam = useAppSelector((state) => state.login.status.team);
  const hasPaid = useAppSelector((state) => state.login.status.paid);

  // Fetch admin data
  const adminPartners = useAppSelector((state) => state.admin.partners);
  const adminTournaments = useAppSelector((state) => state.admin.tournaments);
  const adminItems = useAppSelector((state) => state.admin.items);

  useEffect(() => {
    if (!isAdminPanel || pathname === '/admin/login') return;
    adminPartners || dispatch(fetchAdminPartners() as unknown as Action);
    adminTournaments || dispatch(fetchAdminTournaments() as unknown as Action);
    adminItems || dispatch(fetchAdminItems() as unknown as Action);
  }, [pathname]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Define links for Dashboard
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

  // Define links for Admin Panel
  const linksAdmin = () => {
    const menu = [];

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
      menu.push({ title: 'Paramètres', href: '/admin/settings' });
    }

    menu.push({ title: 'Compte', href: '/admin/account' });
    menu.push({ title: 'Badge', href: '/admin/badge' });

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
