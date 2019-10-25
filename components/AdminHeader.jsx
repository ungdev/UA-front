import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';


import './AdminHeader.css';

const AdminHeader = ({ pathname }) => {
  const permissions = useSelector((state) => state.login.user && state.login.user.permissions);

  const links = () => {
    if (permissions === 'entry') {
      return [
        { title: 'Entrée', href: '/admin/entry' },
      ];
    }
    return [
      { title: 'Entrée', href: '/admin/entry' },
      { title: 'Notifications', href: '/admin/notif' },
      { title: 'Utilisateurs', href: '/admin/users' },
    ];
  };

  return (
    <header id="admin-header">
      <div className="header">
        <div className="home-title">
          <p>Administration</p>
        </div>
      </div>
      <div className="nav">
        {links().map((link) => (
          <Link href={link.href} key={link.href}>
            <a className={`nav-link ${link.href === pathname ? 'active' : ''}`}>
              <span>
                {link.title}
              </span>
            </a>
          </Link>
        ))}
      </div>
    </header>
  );
};

AdminHeader.propTypes = {
  /**
   * Current pathname
   */
  pathname: PropTypes.string.isRequired,
};

export default AdminHeader;
