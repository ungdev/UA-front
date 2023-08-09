'use client';
import { ReactNode, useEffect, useState } from 'react';
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import Header from './Header';
import CookieConsent from './CookieConsent';
import { fetchSettings } from '@/modules/settings';
import { autoLogin } from '@/modules/login';
import { hasOrgaPermission } from '@/utils/permission';
import Footer from './Footer';

import { toast } from 'react-toastify';
import { type Action } from '@reduxjs/toolkit';
import { Permission, UserType } from '@/types';

interface SearchParams extends ReadonlyURLSearchParams {
  action?: string;
  state?: string;
}

/**
 * Wrapper component that provides common layout and functionality for all pages.
 * @param children The child components to be rendered within the layout.
 * @returns The Wrapper component.
 */
export default function Wrapper({ children }: { children: ReactNode }) {
  // Import necessary hooks and modules
  const pathname = usePathname();
  const query: SearchParams = useSearchParams();
  const dispatch = useAppDispatch();

  // Define state variables
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasTeam, setHasTeam] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSpectator, setIsSpectator] = useState(false);

  const permissions = useAppSelector((state) => state.login.user && state.login.user.permissions);

  // Update state variables based on changes to the login state
  useAppSelector((state) => {
    const { user } = state.login;
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

  // Get settings from Redux store
  const isLoginAllowed = useAppSelector((state) => state.settings.login);
  const isShopAllowed = useAppSelector((state) => state.settings.shop);
  const isLoading = useAppSelector((state) => state.login.loading);

  // Handle redirections
  let redirect: string | null = null;

  useEffect(() => {
    if (isLoading) {
      return;
    }
    // 1 action possible :
    //  - oauth
    if (query.action === 'oauth') {
      switch (query.state) {
        case '0':
          toast.success('Le lien avec le compte Discord a bien été créé !');
          break;
        case '1':
          toast.success('Le lien avec le compte Discord a bien été mis à jour !');
          break;
        case '2':
          toast.success("Le lien avec le compte Discord n'a pas été modifié");
          break;
        case '3':
          toast.error("Ce compte Discord est déjà lié au compte d'un autre utilisateur");
          break;
        case '4':
          toast.error("Tu as refusé à nos services l'accès à ton compte Discord");
          break;
        case '5':
          toast.error('Une erreur de requête est survenue');
          break;
        case '6':
          toast.error('Une erreur inconnue est survenue');
          break;
      }
    }
  }, [isLoading]);

  
  useEffect(() => {
    // Fetch Settings
    isLoginAllowed || dispatch(fetchSettings() as unknown as Action);

    // Automatically log in the user
    dispatch(autoLogin() as unknown as Action);
  }, []);
  
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


  // Render the layout with child components
  return (
    <>
      <CookieConsent />
      <div className="page-container">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
