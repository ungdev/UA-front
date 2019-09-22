import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import './Tabs.css';

const Tabs = ({ tabs, defaultIndex, className }) => {
  const [index, setIndex] = useState(defaultIndex);
  const tabsNav = tabs.map((tab, i) => {
    const tabButton = (
      <button
        className={`tab-nav ${index === i ? 'active' : ''}`}
        onClick={() => setIndex(i)}
        key={tab.title}
      >
        {tab.title}
      </button>
    );

    return tab.path ? <Link href={tab.path}>{tabButton}</Link> : tabButton;
  });
  const tabsContent = tabs.map((tab, i) => (
    tab.content &&
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
   * The tabs title and content
   */
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    }),
  ).isRequired,
  /**
   * The index of the default tab
   */
  defaultIndex: PropTypes.number,
  /**
   * The class to apply to the container
   */
  className: PropTypes.string,
};

Tabs.defaultProps = {
  defaultIndex: 0,
  className: '',
};

export default Tabs;