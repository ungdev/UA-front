import styles from './Tooltip.module.scss';
import { ReactNode } from 'react';

export default function Tooltip({
  tooltip,
  enabled = true,
  children,
}: {
  /** The string that will be displayed. It should not be too long, it would look bad otherwise, until it is fixed. */
  tooltip: string;
  /** Whether this toolbox is enabled or not. If set to false, it will act as a normal <div>. */
  enabled?: boolean;
  /** The object that should be tooltiped. */
  children: ReactNode;
}) {
  console.log(enabled);
  if (!enabled) {
    return <div className={styles.container}>{children}</div>;
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
