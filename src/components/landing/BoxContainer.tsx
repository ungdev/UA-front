import { ReactNode } from 'react';
import Icon from '../UI/Icon';

/**
 * A container component that displays a title and content in a box.
 * @param title The title to display in the box.
 * @param children The content to display in the box.
 * @param padding Is the box content padded ?
 * @param color The color of the top of the box
 * @param className The class of the component
 */
function BoxContainer({
  title,
  children,
  padding = true,
  color = 'pink',
  className = '',
}: {
  title: string;
  children: ReactNode;
  padding?: boolean;
  color?: 'pink' | 'blue';
  className?: string;
}) {
  return (
    <div className={`box-container ${className}`}>
      <div className={`box-title ${color}`}>
        <Icon name="close" fill={false} strokeWidth={4} />
        {title}
      </div>
      <div className={'box-content ' + (!padding ? 'no-padding' : '')}>{children}</div>
    </div>
  );
}

export default BoxContainer;
