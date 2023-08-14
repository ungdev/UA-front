import { ReactNode } from 'react';
import { Icon } from '.';

/**
 * Helper component displays a question mark icon with a tooltip containing the helper text.
 * @param children The helper text to be displayed in the tooltip.
 * @param className The CSS class name to be applied to the helper component.
 */
const Helper = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`helper ${className}`}>
    <div tabIndex={0} className='helper-icon'>
      <Icon name="question-circle" fill={false} />
    </div>

    <div className="helper-content">{children}</div>
  </div>
);

export default Helper;
