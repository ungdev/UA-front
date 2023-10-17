import styles from './Tooltip.module.scss';
import { ReactNode } from 'react';

export default function Tooltip({
  tooltip,
  enabled = true,
  className,
  center,
  children,
}: {
  /** The string that will be displayed. It should not be too long, it would look bad otherwise, until it is fixed. */
  tooltip: string;
  /** Whether this toolbox is enabled or not. If set to false, it will act as a normal <div>. */
  enabled?: boolean;
  /** Classname to apply to the container. */
  className?: string;
  /** is centered */
  center?: boolean;
  /** The object that should be tooltiped. */
  children: ReactNode;
}) {
  if (!enabled) {
    return <div className={`${styles.container} ${center && styles.center} ${className}`}>{children}</div>;
  }
  return (
    <div className={`${styles.container} ${center && styles.center} ${className}`}>
      {children}
      <div className={styles.tooltip}>
        <div className={styles.content}>{tooltip}</div>
      </div>
    </div>
  );
}
