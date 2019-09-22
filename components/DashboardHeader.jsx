import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import './DashboardHeader.css';

const links = [
  { title: "Équipe", href: '/dashboard/team' },
  { title: "Panier", href: '/dashboard/cart' },
  { title: "Mes achats", href: '/dashboard/purchases' },
  { title: "Mon compte", href: '/dashboard/account' },
];

const DashboardHeader = () => {
  const { pathname } = useRouter();

  return (
    <div id="dashboard-header">
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
    </div>
  );
};

export default DashboardHeader;
