'use client';
import React, { useState } from 'react';

/**
 * Displays a menu with tabs
 */
const Tabs = ({
  tabs,
  defaultIndex,
  className,
}: {
  /**
   * Tabs title and content
   */
  tabs: { title: string; content: string; onClick: (number) => void }[];
  /**
   * Index of the default tab
   */
  defaultIndex: number;
  /**
   * Class of the container
   */
  className: string;
}) => {
  const [index, setIndex] = useState(defaultIndex);

  const tabsNav = tabs.map((tab, i) => (
    <button
      className={`tab-nav ${index === i ? 'active' : ''}`}
      onClick={() => {
        if (tab.onClick) {
          tab.onClick(i);
        }
        setIndex(i);
      }}
      key={tab.title}>
      {tab.title}
    </button>
  ));

  const tabsContent = tabs.map((tab, i) => (
    <div className={`tab-content ${index === i ? 'active' : ''}`} key={tab.key}>
      {tab.content}
    </div>
  ));

  return (
    <div className={`tabs ${className}`}>
      <div className="tabs-nav">{tabsNav}</div>

      <div className="tabs-content">{tabsContent}</div>
    </div>
  );
};

Tabs.defaultProps = {
  defaultIndex: 0,
  className: '',
};

export default Tabs;
