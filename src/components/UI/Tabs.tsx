'use client';
import styles from './Tabs.module.scss';
import { ReactNode, useState } from 'react';

/**
 * A component that displays a set of tabs with associated content
 * @param tabs An array of objects representing the tabs. Each object should have a `key` string, `title` string, a `content` ReactNode, and an optional `onClick` function that will be called when the tab is clicked
 * @param defaultIndex The index of the default tab to display
 * @param className The class name to apply to the container element
 */
const Tabs = ({
  tabs,
  defaultIndex = 0,
  className = '',
}: {
  /** An array of objects representing the tabs. Each object should have a `key` string, `title` string, a `content` ReactNode, and an optional `onClick` function that will be called when the tab is clicked */
  tabs: { key: string; title: string; content: ReactNode; onClick?: (index: number) => void }[];
  /** The index of the default tab to display */
  defaultIndex?: number;
  /** An optional class name to apply to the container element */
  className?: string;
}) => {
  const [index, setIndex] = useState(defaultIndex);

  const tabsNav = tabs.map((tab, i) => (
    <button
      className={`${styles.tabNav} ${index === i ? styles.active : ''}`}
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
    <div className={`${styles.tabContent} ${index === i ? styles.active : ''}`} key={tab.key}>
      {tab.content}
    </div>
  ));

  return (
    <div className={`${styles.tabs} ${className}`}>
      <div className={styles.tabsNav}>{tabsNav}</div>

      <div className={styles.tabContent}>{tabsContent}</div>
    </div>
  );
};

export default Tabs;
