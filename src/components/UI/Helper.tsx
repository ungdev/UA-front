import { ReactNode } from 'react';
import { Icon } from '.';
import { IconName } from './Icon';

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
  <div className={`helper ${className}`}>
    <div tabIndex={0} className="helper-icon">
      <Icon name={IconName.QuestionCircle} />
    </div>

    <div className="helper-content">{children}</div>
  </div>
);

export default Helper;
