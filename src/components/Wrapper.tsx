'use client';
import { ReactNode, Suspense, useEffect } from 'react';
import { ReadonlyURLSearchParams, useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import Header from './Header';
import CookieConsent from './CookieConsent';
import { fetchSettings } from '@/modules/settings';
import { autoLogin } from '@/modules/login';
import Footer from './Footer';

import { toast } from 'react-toastify';
import { type Action } from '@reduxjs/toolkit';
import { Permission } from '@/types';
import Loading from '@/app/loader';
import { setRedirect } from '@/modules/redirect';
import { fetchTournaments } from '@/modules/tournament';
import { fetchPartners } from '@/modules/partners';

interface SearchParams extends ReadonlyURLSearchParams {
  action?: string;
  state?: string;
}
/**
 * The navigation events component that is used to track navigation events.
 * Used mainly by Matomo
 */
export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    // used by Matomo
    const w = window as any;
    if (w && w._paq) {
      w._paq.push(['setCustomUrl', url]);
      w._paq.push(['setDocumentTitle', document.title]);
      w._paq.push(['trackPageView']);
    }
  }, [pathname, searchParams]);

  return null;
}
/** The redirect handler that redirects the user to the specified location. */
const RedirectHandler = () => {
  const redirectLocation = useAppSelector((state) => state.redirect);
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    if (redirectLocation) {
      dispatch(setRedirect(null));
      router.push(redirectLocation);
    }
  }, [redirectLocation]);

  return <></>;
};

/**
 * Wrapper component that provides common layout and functionality for all pages.
 */
export default function Wrapper({
  children,
}: {
  /** The child components to be rendered within the layout. */
  children: ReactNode;
}) {
  // Import necessary hooks and modules
  const query: SearchParams = useSearchParams();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const isAdminPanel = pathname.startsWith('/admin');
  const isDashboard = pathname.startsWith('/dashboard');
  const permissions = useAppSelector((state) => state.login.user?.permissions) || [];

  // Get settings from Redux store
  const isLoginAllowed = useAppSelector((state) => state.settings.login);
  const isLoading = useAppSelector((state) => state.login.loading);
  const isShopAllowed = useAppSelector((state) => state.settings.shop);

  // Get user informations from Redux store
  const isLoggedIn = useAppSelector((state) => state.login.status.login);
  const isAdmin = useAppSelector((state) => state.login.status.admin);
  const isSpectator = useAppSelector((state) => state.login.status.spectator);
  const hasTeam = useAppSelector((state) => state.login.status.team);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isAdminPanel && !isLoggedIn) {
      if (pathname !== '/admin/login' || isLoginAllowed) {
        dispatch(setRedirect('/'));
      }
    } else if (isDashboard && (!isLoggedIn || !isLoginAllowed)) {
      dispatch(setRedirect('/'));
    } else if (isLoggedIn) {
      if (hasTeam && (pathname === '/dashboard' || pathname === '/dashboard/register')) {
        dispatch(setRedirect('/dashboard/team'));
      } else if (pathname === '/dashboard/shop' && !isShopAllowed) {
        dispatch(setRedirect('/dashboard'));
      } else if (isSpectator && (pathname === '/dashboard' || pathname === '/dashboard/register')) {
        dispatch(setRedirect('/dashboard/spectator'));
      } else if (!isSpectator && !hasTeam) {
        if (
          pathname === '/dashboard' ||
          (isDashboard && pathname !== '/dashboard/register' && pathname !== '/dashboard/account')
        ) {
          dispatch(setRedirect('/dashboard/register'));
        }
      }
      if (!isAdmin && isAdminPanel) {
        dispatch(setRedirect('/dashboard'));
      } else if (
        pathname === '/admin' &&
        (permissions.includes(Permission.admin) || permissions.includes(Permission.anim))
      ) {
        dispatch(setRedirect('/admin/users'));
      } else if (pathname === '/admin' && permissions.includes(Permission.entry)) {
        dispatch(setRedirect('/admin/scan'));
      }
    }
  }, [isLoggedIn, isLoginAllowed, isShopAllowed, isAdmin, isSpectator, hasTeam, pathname, isLoading]);

  // TODO: implement a special route for the oauth callback
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

  const tournaments = useAppSelector((state) => state.tournament.tournaments);
  const partners = useAppSelector((state) => state.partners.partners);

  // Fetch static values
  useEffect(() => {
    // Fetch Settings
    isLoginAllowed || dispatch(fetchSettings() as unknown as Action);

    // Fetch Tournaments
    tournaments || dispatch(fetchTournaments() as unknown as Action);

    // Fetch Partners
    partners || dispatch(fetchPartners() as unknown as Action);

    // Automatically log in the user
    isLoggedIn || dispatch(autoLogin() as unknown as Action);
  }, []);

  // Render the layout with child components
  return (
    <>
      <CookieConsent />
      {isLoading || (isDashboard && !isLoggedIn) ? (
        <main className="loading">
          <Loading />
        </main>
      ) : (
        <div className="page-container">
          <Header connected={isLoggedIn} admin={isAdmin} />
          <main>{children}</main>
          <Footer />
        </div>
      )}
      {/* Used to detect navigation events */}
      <Suspense fallback={null}>
        <NavigationEvents />
      </Suspense>
      {/* Used to redirect the user */}
      <RedirectHandler />
    </>
  );
}
