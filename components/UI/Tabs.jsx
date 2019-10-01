import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Tabs.css';

/**
 * Displays a menu with tabs
 */
const Tabs = ({ tabs, defaultIndex, className }) => {
  const [index, setIndex] = useState(defaultIndex);

  const tabsNav = tabs.map((tab, i) => (
    <button
      className={`tab-nav ${index === i ? 'active' : ''}`}
      onClick={() => setIndex(i)}
      key={tab.title}
    >
      {tab.title}
    </button>
  ));

  const tabsContent = tabs.map((tab, i) => (
    <div
      className={`tab-content ${index === i ? 'active' : ''}`}
      key={tab.title}
    >
      {tab.content}
    </div>
  ));

  return (
    <div className={`tabs ${className}`}>
      <div className="tabs-nav">
        { tabsNav }
      </div>

      <div className="tabs-content">
        { tabsContent }
      </div>
    </div>
  );
};

Tabs.propTypes = {
  /**
   * Tabs title and content
   */
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    }),
  ).isRequired,
  /**
   * Index of the default tab
   */
  defaultIndex: PropTypes.number,
  /**
   * Class of the container
   */
  className: PropTypes.string,
};

Tabs.defaultProps = {
  defaultIndex: 0,
  className: '',
};

export default Tabs;