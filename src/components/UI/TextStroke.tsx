import styles from './TextStroke.module.scss';
import { ReactNode } from 'react';

export default function TextStroke({
  width = 8,
  className = '',
  children,
}: {
  width: number;
  className: string;
  children: ReactNode;
}) {
  return (
    <div className={`${styles.stroked} ${className}`}>
      <div className={`${styles.stroke} ${className}`} style={{ '--stroke-width': `${width}px` }}>
        {children}
      </div>
      {children}
    </div>
  );
}
