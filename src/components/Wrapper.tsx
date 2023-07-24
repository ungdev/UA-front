'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import Header from './Header';
import CookieConsent from './CookieConsent';
import { fetchSettings } from '../modules/settings';
import { autoLogin, validate } from '../modules/login';
import { hasOrgaPermission } from '../utils/permission';
import Footer from "./Footer";

import { toast } from 'react-toastify';

export default function Wrapper({ children } : { children: any }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const query: any = useSearchParams();
  const dispatch = useDispatch();
  const isDashboard = pathname.substring(0, 10) === '/dashboard';
  const permissions = useSelector((state: any) => state.login.user && state.login.user.permissions);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasTeam, setHasTeam] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSpectator, setIsSpectator] = useState(false);

  useSelector((state: any) => {
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

  const isLoginAllowed = useSelector((state: any) => state.settings.login);
  const isShopAllowed = useSelector((state: any) => state.settings.shop);

  const isLoading = useSelector((state: any) => state.login.loading);

  // Handle redirections
  let redirect: any = null;

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

  return (
    <>
      <CookieConsent />
      <div className="page-container">
        <Header />
        <main>
          { children }
        </main>
        <Footer />
      </div>
    </>
  );
};