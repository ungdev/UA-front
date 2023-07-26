'use client';
import { ReactNode, useEffect, useState } from 'react';
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import Header from './Header';
import CookieConsent from './CookieConsent';
import { fetchSettings } from '@/modules/settings';
import { autoLogin, validate } from '@/modules/login';
import { hasOrgaPermission } from '@/utils/permission';
import Footer from './Footer';

import { toast } from 'react-toastify';

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
  const { replace } = useRouter();
  const pathname = usePathname();
  const query: SearchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const isDashboard = pathname.substring(0, 10) === '/dashboard';
  // const permissions = useAppSelector((state) => state.login.user && state.login.user.permissions);

  // Define state variables
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasTeam, setHasTeam] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSpectator, setIsSpectator] = useState(false);

  // Update state variables based on changes to the login state
  useAppSelector((state) => {
    const { user } = state.login;
    if (isLoggedIn !== !!user) {
      setIsLoggedIn(!!user);
      setHasTeam(!!user.teamId);
      setIsSpectator(user.type === 'spectator');
    } else if (user && hasTeam !== !!user.teamId) {
      setHasTeam(!!user.teamId);
    } else if (user && !isSpectator && user.type === 'spectator') {
      setIsSpectator(true);
    } else if (user && isSpectator && user.type !== 'spectator') {
      setIsSpectator(false);
    }
    if (user && hasPaid !== user.hasPaid) {
      setHasPaid(user.hasPaid);
    }
    if (user && hasOrgaPermission(user.permissions) !== isAdmin) {
      setIsAdmin(!isAdmin);
    }
  });

  // Get settings from Redux store
  const isLoginAllowed = useAppSelector((state) => state.settings.login);
  // const isShopAllowed = useAppSelector((state) => state.settings.shop);

  const isLoading = useAppSelector((state) => state.login.loading);

  // Handle redirections
  let redirect: string | null = null;

  useEffect(() => {
    if (isLoading) {
      return;
    }
    // 3 actions possible :
    //  - oauth
    //  - validate
    //  - pwd-reset
    if (query.action === 'oauth') {
      switch (query.state) {
        case '0':
          toast.success('Le lien avec le compte Discord a bien été créé !');
          redirect = pathname;
          break;
        case '1':
          toast.success('Le lien avec le compte Discord a bien été mis à jour !');
          redirect = pathname;
          break;
        case '2':
          toast.success("Le lien avec le compte Discord n'a pas été modifié");
          redirect = pathname;
          break;
        case '3':
          toast.error("Ce compte Discord est déjà lié au compte d'un autre utilisateur");
          redirect = pathname;
          break;
        case '4':
          toast.error("Tu as refusé à nos services l'accès à ton compte Discord");
          redirect = pathname;
          break;
        case '5':
          toast.error('Une erreur de requête est survenue');
          redirect = pathname;
          break;
        case '6':
          toast.error('Une erreur inconnue est survenue');
          redirect = pathname;
          break;
      }
    } else if (query.action === 'validate') {
      dispatch(validate(query.state) as any);
      replace(pathname);
    }
  }, [isLoading]);

  // Fetch Settings
  useEffect(() => {
    isLoginAllowed || dispatch(fetchSettings() as any);
  }, []);

  // Redirect to desired path
  useEffect(() => {
    if (redirect && !isLoading) {
      replace(redirect);
    }
  }, [replace, redirect, isLoading]);

  // Automatically log in the user
  useEffect(() => {
    dispatch(autoLogin() as any);
  }, []);

  // Do not display the page content if the user will be redirected
  if (isLoading || redirect || (isDashboard && !isLoggedIn)) {
    return (
      <>
        <CookieConsent />
      </>
    );
  }

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
