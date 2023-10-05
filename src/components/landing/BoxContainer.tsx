import styles from './BoxContainer.module.scss';
import { ReactNode } from 'react';
import Icon, { IconName } from '@/components/UI/Icon';

/**
 * A container component that displays a title and content in a box.
 */
function BoxContainer({
  title,
  children,
  padding = true,
  color = 'pink',
  className = '',
  contentClassName = '',
}: {
  /** The title to display in the box. */
  title: string;
  /** The content to display in the box. */
  children: ReactNode;
  /** Is the box content padded ? */
  padding?: boolean;
  /** The color of the top of the box */
  color?: 'pink' | 'blue';
  /** The class of the component */
  className?: string;
  /** A string to add to the div of the content */
  contentClassName?: string;
}) {
  return (
    <div className={`${styles.boxContainer} ${className}`}>
      <div className={`${styles.boxTitle} ${styles[color]}`}>
        <Icon name={IconName.Cross} strokeWidth={4} />
        {title}
      </div>
      <div className={`${styles.boxContent} ${!padding ? styles.noPadding : ''} ${contentClassName}`}>{children}</div>
    </div>
  );
}

export default BoxContainer;
