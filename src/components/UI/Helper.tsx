import styles from './Helper.module.scss';
import { ReactNode } from 'react';
import Icon, { IconName } from '@/components/UI/Icon';

/**
 * Helper component displays a question mark icon with a tooltip containing the helper text.
 */
const Helper = ({
  children,
  className = '',
}: {
  /** The helper text to be displayed in the tooltip. */
  children: ReactNode;
  /** An optional CSS class name to be applied to the helper component. */
  className?: string;
}) => (
  <div className={`${styles.helper} ${className}`}>
    <div tabIndex={0} className={styles.helperIcon}>
      <Icon name={IconName.QuestionCircle} />
    </div>

    <div className={styles.helperContent}>{children}</div>
  </div>
);

export default Helper;
