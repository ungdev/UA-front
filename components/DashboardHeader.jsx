import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import './DashboardHeader.css';

const DashboardHeader = ({ pathname, hasTeam, isVisitor, isPaid }) => {
  const links = () => {
    if (hasTeam) {
      return [
        { title: 'Équipe', href: '/dashboard/team' },
        { title: 'Boutique', href: '/dashboard/shop' },
        { title: 'Mes achats', href: '/dashboard/purchases' },
        { title: 'Mon compte', href: '/dashboard/account' },
      ];
    }
    if (isVisitor) {
      return [
        { title: 'Coach', href: '/dashboard/coach' },
        { title: 'Boutique', href: '/dashboard/shop' },
        { title: 'Mes achats', href: '/dashboard/purchases' },
        { title: 'Mon compte', href: '/dashboard/account' },
      ];
    }
    if (isPaid) {
      return [
        { title: 'Inscription', href: '/dashboard/register' },
        { title: 'Boutique', href: '/dashboard/shop' },
        { title: 'Mes achats', href: '/dashboard/purchases' },
        { title: 'Mon compte', href: '/dashboard/account' },
      ];
    }
    return [
      { title: 'Inscription', href: '/dashboard/register' },
      { title: 'Mon compte', href: '/dashboard/account' },
    ];
  };

  return (
    <header id="dashboard-header">
      <div className="header">
        <div className="home-title">
          <p>Dashboard</p>
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

DashboardHeader.propTypes = {
  /**
   * Current pathname
   */
  pathname: PropTypes.string.isRequired,
  /**
   * Is the user in a team ?
   */
  hasTeam: PropTypes.bool.isRequired,
  /**
   * Is the user a visitor ?
   */
  isVisitor: PropTypes.bool.isRequired,
  /**
   * Has the user paid ?
   */
  isPaid: PropTypes.bool.isRequired,
};

export default DashboardHeader;
