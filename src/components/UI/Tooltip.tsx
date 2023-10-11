import styles from './Tooltip.module.scss';
import { CSSProperties, ReactNode } from 'react';

export default function Tooltip({
  tooltip,
  enabled = true,
  children,
}: {
  tooltip: string;
  enabled?: boolean;
  children: ReactNode;
}) {
  if (!enabled) {
    return <div className={styles.tooltipContainer}>{children}</div>;
  }
  return (
    <div className={styles.container}>
      {children}
      <div className={styles.tooltip}>
        <div className={styles.content}>{tooltip}</div>
      </div>
    </div>
  );
}
