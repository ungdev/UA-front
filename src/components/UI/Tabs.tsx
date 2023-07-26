'use client';
import { ReactNode, useState } from 'react';

/**
 * A component that displays a set of tabs with associated content
 * @param tabs An array of objects representing the tabs. Each object should have a `key` string, `title` string, a `content` ReactNode, and an optional `onClick` function that will be called when the tab is clicked
 * @param defaultIndex The index of the default tab to display
 * @param className The class name to apply to the container element
 */
const Tabs = ({
  tabs,
  defaultIndex,
  className,
}: {
  tabs: { key: string; title: string; content: ReactNode; onClick?: (index: number) => void }[];
  defaultIndex: number;
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
