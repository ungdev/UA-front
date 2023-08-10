'use client';
import { ReactNode, useEffect, useState } from 'react';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import Header from './Header';
import CookieConsent from './CookieConsent';
import { fetchSettings } from '@/modules/settings';
import { autoLogin } from '@/modules/login';
import Footer from './Footer';

import { toast } from 'react-toastify';
import { type Action } from '@reduxjs/toolkit';

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
  const query: SearchParams = useSearchParams();
  const dispatch = useAppDispatch();

  // Test if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useAppSelector((state) => {
    const { user } = state.login;
    if (isLoggedIn !== !!user) {
      setIsLoggedIn(!!user);
    }
  });

  // Get settings from Redux store
  const isLoginAllowed = useAppSelector((state) => state.settings.login);
  const isLoading = useAppSelector((state) => state.login.loading);

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
