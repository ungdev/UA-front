'use client';
import styles from './Wrapper.module.scss';
import { ReactNode, Suspense, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import Header from './Header';
import CookieConsent from './CookieConsent';
import { fetchSettings } from '@/modules/settings';
import { autoLogin } from '@/modules/login';
import Footer from './Footer';

import { type Action } from '@reduxjs/toolkit';
import { Permission } from '@/types';
import Loading from '@/app/loader';
import { setRedirect } from '@/modules/redirect';
import { fetchTournaments } from '@/modules/tournament';
import { fetchPartners } from '@/modules/partners';
import { fetchAllCarts } from '@/modules/carts';

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
  const isOrga = useAppSelector((state) => state.login.status.admin);
  const isSpectator = useAppSelector((state) => state.login.status.spectator);
  const hasTeam = useAppSelector((state) => state.login.status.team);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    // Admin login
    if (pathname === '/admin/login') {
      if (isLoggedIn) {
        dispatch(setRedirect('/dashboard'));
      }
      return;
    }

    // Dashboard
    if (isDashboard && !isLoggedIn) {
      dispatch(setRedirect('/'));
      return;
    }
    if (pathname === '/dashboard') {
      if (permissions.includes(Permission.orga)) dispatch(setRedirect('/admin'));
      else if (hasTeam) dispatch(setRedirect('/dashboard/team'));
      else if (isSpectator) dispatch(setRedirect('/dashboard/spectator'));
      else dispatch(setRedirect('/dashboard/register'));
    }
    if (pathname === '/dashboard/register' && (hasTeam || isSpectator)) {
      dispatch(setRedirect('/dashboard'));
      return;
    }
    if (pathname === '/dashboard/shop' && !isShopAllowed) {
      dispatch(setRedirect('/dashboard'));
      return;
    }
    if (
      !isSpectator &&
      !hasTeam &&
      !isOrga &&
      isDashboard &&
      !['/dashboard/register', '/dashboard/account', '/dashboard/purchases'].includes(pathname)
    ) {
      dispatch(setRedirect('/dashboard/register'));
    }

    // Admin panel
    if (isAdminPanel && !isOrga) {
      dispatch(setRedirect('/dashboard'));
      return;
    }
    if (pathname === '/admin') {
      if (permissions.includes(Permission.anim) || permissions.includes(Permission.admin))
        dispatch(setRedirect('/admin/users'));
      else if (permissions.includes(Permission.entry) || permissions.includes(Permission.admin))
        dispatch(setRedirect('/admin/scan'));
      else dispatch(setRedirect('/admin/badge'));
      return;
    }
    if (
      pathname === '/admin/users' &&
      !permissions.includes(Permission.anim) &&
      !permissions.includes(Permission.admin)
    ) {
      dispatch(setRedirect('/admin'));
      return;
    }
    if (
      pathname === '/admin/scan' &&
      !permissions.includes(Permission.entry) &&
      !permissions.includes(Permission.admin)
    ) {
      dispatch(setRedirect('/admin'));
      return;
    }
    if (
      ['/admin/tournaments', '/admin/shop', '/admin/partners', '/admin/settings'].includes(pathname) &&
      !permissions.includes(Permission.admin)
    ) {
      dispatch(setRedirect('/admin'));
      return;
    }
  }, [isLoggedIn, isLoginAllowed, isShopAllowed, isOrga, isSpectator, hasTeam, pathname, isLoading]);

  const tournaments = useAppSelector((state) => state.tournament.tournaments);
  const partners = useAppSelector((state) => state.partners.partners);
  const carts = useAppSelector((state) => state.carts.allCarts);

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

  useEffect(() => {
    if (!isLoggedIn) return;
    // Fetch carts
    carts.length || dispatch(fetchAllCarts() as unknown as Action);
  }, [isLoggedIn]);

  // Render the layout with child components
  return (
    <>
      <CookieConsent />
      {isLoading || (isDashboard && !isLoggedIn) ? (
        <main id="loading" className={styles.loading}>
          <Loading />
        </main>
      ) : (
        <div id="page-container" className={styles.pageContainer}>
          <Header connected={isLoggedIn} admin={isOrga} />
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
