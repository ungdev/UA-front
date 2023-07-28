import { ReactNode } from 'react';
import Icon from '../UI/Icon';

/**
 * A container component that displays a title and content in a box.
 * @param title The title to display in the box.
 * @param children The content to display in the box.
 * @param padding Is the box content padded ?
 */
function BoxContainer({ title, children, padding = true }: { title: string; children: ReactNode; padding?: boolean }) {
  return (
    <div className="box-container">
      <div className="box-title">
        <Icon name='close' fill={false} strokeWidth={4} />
        {title}
      </div>
      <div className={"box-content " + (!padding ? 'no-padding': '')}>{children}</div>
    </div>
  );
}

export default BoxContainer;
