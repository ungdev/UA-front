import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import './PanelHeader.css';

const PanelHeader = ({ pathname, links, title }) => (
  <header id="panel-header">
    <div className="header">
      <div className="home-title">
        <p>{title}</p>
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

PanelHeader.propTypes = {
  /**
   * Current pathname
   */
  pathname: PropTypes.string.isRequired,
  /**
   * Title panel
   */
  title: PropTypes.string.isRequired,
  /**
   * Links to display
   */
  links: PropTypes.func.isRequired,
};

export default PanelHeader;
