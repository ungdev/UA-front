import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Navbar from './Navbar';
import Header from './Header';
import CookieConsent from './CookieConsent';
import PanelHeader from './PanelHeader';
import Modal from './UI/Modal';
import Input from './UI/Input';
import Button from './UI/Button';
import { autoLogin } from '../modules/login';
import { hasOrgaPermission } from '../utils/permission';
import { isLoginAllowed, isShopAllowed } from '../utils/settings';
import { API } from '../utils/api';

const Wrapper = ({ Component }) => {
  const { pathname, query, replace } = useRouter();
  const dispatch = useDispatch();
  const isHome = pathname === '/';
  const isTournament = pathname.substr(0, 13) === '/tournaments/';
  const isDashboard = pathname.substr(0, 10) === '/dashboard';
  const isAdminPanel = pathname.substr(0, 6) === '/admin';
  const permissions = useSelector((state) => state.login.user && state.login.user.permissions);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasTeam, setHasTeam] = useState(false);
  const [isVisitor, setIsVisitor] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newPassword, setResetPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

  useSelector((state) => {
    const { user } = state.login;
    if (isLoggedIn !== !!user) {
      setIsLoggedIn(!!user);
      setHasTeam(!!user.teamId);
      setIsVisitor(user.type === 'visitor');
    } else if (user && hasTeam !== !!user.teamId) {
      setHasTeam(!!user.teamId);
    } else if (user && !isVisitor && user.type === 'visitor') {
      setIsVisitor(true);
    } else if (user && isVisitor && user.type === 'none') {
      setIsVisitor(false);
    }
    if (user && isPaid !== user.isPaid) {
      setIsPaid(user.isPaid);
    }
    if (user && hasOrgaPermission(user.permissions) !== isAdmin) {
      setIsAdmin(true);
    }
  });

  const isLoading = useSelector((state) => state.login.loading);

  // Handle redirections
  let redirect = null;

  if (isAdminPanel && !isLoggedIn) {
    redirect = '/';
  } else if (isDashboard && (!isLoggedIn || !isLoginAllowed())) {
    redirect = '/';
  } else if (isLoggedIn) {
    if (hasTeam && (pathname === '/dashboard' || pathname === '/dashboard/register')) {
      redirect = '/dashboard/team';
    } else if (pathname === '/dashboard/shop' && !isShopAllowed()) {
      redirect = '/dashboard';
    } else if (isVisitor && (pathname === '/dashboard' || pathname === '/dashboard/register')) {
      redirect = '/dashboard/coach';
    } else if (!isVisitor && !hasTeam && isPaid) {
      if (pathname === '/dashboard') {
        redirect = '/dashboard/register';
      }
    } else if (
      !isVisitor &&
      !hasTeam &&
      isDashboard &&
      pathname !== '/dashboard/register' &&
      pathname !== '/dashboard/account'
    ) {
      redirect = '/dashboard/register';
    }
    if (!isAdmin && isAdminPanel) {
      redirect = '/dashboard';
    } else if (pathname === '/admin' && permissions === 'entry') {
      redirect = '/admin/entry';
    } else if (pathname === '/admin' && permissions === 'anim') {
      redirect = '/admin/notification';
    } else if (pathname === '/admin' && permissions === 'admin') {
      redirect = '/admin/users';
    }
  }

  useEffect(() => {
    if (query.action === 'oauth') {
      switch (query.value) {
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
          toast.error("Vous avez refusé à nos services l'accès à votre compte Discord");
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
    }
  }, [isLoading]);

  // Redirect to desired path
  useEffect(() => {
    if (redirect && !isLoading) {
      replace(redirect);
      return;
    }
  }, [replace, redirect, isLoading]);

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  // Do not display the page content if the user will be redirected
  if (isLoading || redirect || (isDashboard && !isLoggedIn)) {
    return (
      <>
        <CookieConsent />
        <Navbar isLoggedIn={isLoggedIn} />
      </>
    );
  }

  const linksDashboard = () => {
    const menu = [];

    if (hasTeam) {
      menu.push({ title: 'Équipe', href: '/dashboard/team' });
      menu.push({ title: 'Informations', href: '/dashboard/infos' });
    } else if (isVisitor) {
      menu.push({ title: 'Coach', href: '/dashboard/coach' });
    } else if (isPaid) {
      menu.push({ title: 'Inscription', href: '/dashboard/register' });
    }

    if (hasTeam || isVisitor || isPaid) {
      if (isShopAllowed()) {
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

    if (permissions === 'anim' || permissions === 'admin') {
      menu.push({ title: 'Notifications', href: '/admin/notification' });
      menu.push({ title: 'Utilisateurs', href: '/admin/users' });
    }

    if (permissions === 'entry' || permissions === 'admin') {
      menu.push({ title: 'Entrée', href: '/admin/entry' });
    }

    menu.push({ title: 'Mon compte', href: '/admin/account' });

    return menu;
  };

  return (
    <>
      <CookieConsent />
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="page-container">
        {!isHome && !isTournament && !isDashboard && !isAdminPanel && <Header />}
        {isDashboard && <PanelHeader pathname={pathname} links={linksDashboard} title="Dashboard" />}
        {isAdminPanel && <PanelHeader pathname={pathname} links={linksAdmin} title="Administration" />}
        <main className={!isHome && !isTournament ? 'page-padding' : ''}>
          <Component />
        </main>
      </div>
      <Modal
        title="Réinitialiser le mot de passe"
        visible={query.action === 'pwd-reset'}
        buttons={null}
        onCancel={() => replace(pathname)}
        className="reset-password-modal">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            if (newPassword !== newPasswordConfirmation) {
              toast.error('Les deux mots de passe ne sont pas identiques.');
            }
            await API.post(`auth/reset-password/${query.value}`, { password: newPassword });
            toast.success('Le mot de passe a été réinitialisé, vous pouvez maintenant vous connecter.');
            if (!isLoading) {
              replace(pathname);
            }
          }}>
          <Input
            label="Mot de passe"
            value={newPassword}
            onChange={setResetPassword}
            type="password"
            autocomplete="password"
          />
          <Input
            label="Confirmer le mot de passe"
            value={newPasswordConfirmation}
            onChange={setNewPasswordConfirmation}
            type="password"
            autocomplete="new-password"
          />

          <Button className="new-password-modal-button" primary type="submit">
            Envoyer
          </Button>
        </form>
      </Modal>
    </>
  );
};

Wrapper.propTypes = {
  /**
   * Page component
   */
  Component: PropTypes.func.isRequired,
};

export default Wrapper;
