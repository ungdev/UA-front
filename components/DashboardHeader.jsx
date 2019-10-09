import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import './DashboardHeader.css';

const DashboardHeader = ({ pathname, hasTeam }) => {
  const links = [
    { title: 'Équipe', href: '/dashboard/team' },
    { title: 'Boutique', href: '/dashboard/shop' },
    { title: 'Mes achats', href: '/dashboard/purchases' },
    { title: 'Mon compte', href: '/dashboard/account' },
  ];
  if (!hasTeam) {
    // Replace 'team' by 'register'
    links[0] = { title: 'Inscription', href: '/dashboard/register' };
  }

  return (
    <header id="dashboard-header">
      <div className="header">
        <div className="home-title">
          <p>Dashboard</p>
        </div>
      </div>

      <div className="nav">
        {links.map((link) => (
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
};

export default DashboardHeader;
