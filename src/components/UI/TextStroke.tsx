import styles from './TextStroke.module.scss';
import { ReactNode } from 'react';

export default function TextStroke({
  width = 8,
  className = '',
  classNameOfStroke = '',
  children,
}: {
  width: number;
  className: string;
  classNameOfStroke: string;
  children: ReactNode;
}) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {children}
      <div className={`${styles.stroke} ${classNameOfStroke}`} style={{ '--stroke-width': `${width}px` }}>
        {children}
      </div>
    </div>
  );
}
