import { ReactNode } from 'react';

/**
 * Helper component displays a question mark icon with a tooltip containing the helper text.
 * @param children The helper text to be displayed in the tooltip.
 * @param className The CSS class name to be applied to the helper component.
 */
const Helper = ({ children, className }: { children: ReactNode; className: string }) => (
  <div className={`helper ${className}`}>
    <i className="fas fa-question-circle helper-icon" tabIndex={0} />

    <div className="helper-content">{children}</div>
  </div>
);

export default Helper;
