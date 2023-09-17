import styles from './TextStroke.module.scss';
import { ReactNode } from 'react';

/**
 * Renders a text that has a stroke effect applied to it.
 */
export default function TextStroke({
  width = 8,
  className = '',
  classNameOfStroke = '',
  children,
}: {
  /** The width of the stroke. It may not be the exact width of the stroke in pixels */
  width?: number;
  /** An additional className to add to the wrapper div. */
  className?: string;
  /** An additional className to add to the stroke div */
  classNameOfStroke?: string;
  /** The component that should be stroked. This will often only be text. */
  children: ReactNode;
}) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {children}
      <div
        className={`${styles.stroke} ${classNameOfStroke}`}
        style={{ '--stroke-width': `${width}px` } as React.CSSProperties}>
        {children}
      </div>
    </div>
  );
}
