import React from 'react';
import Tabs from './UI/Tabs';

import './HeaderDashboard.css';

const HeaderDashboard = () => (
  <>
    <div id="header-dashboard">
      <div className="home-title">
        <p className="main">Dashboard</p>
      </div>
    </div>
    <Tabs tabs={[
      { title: "Equipe", path: '/dashboard' },
      { title: "Panier", path: '/dashboard/cart' },
      { title: "Mes Achats", path: '/dashboard/purchases' },
      { title: "Mon Compte", path: '/dashboard/account'}
    ]} />
  </>
);

export default HeaderDashboard;
