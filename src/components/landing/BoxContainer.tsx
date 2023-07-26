import { ReactNode } from 'react';

/**
 * A container component that displays a title and content in a box.
 * @param title The title to display in the box.
 * @param children The content to display in the box.
 */
function BoxContainer({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="box-container">
      <div className="box-title">{title}</div>
      <div className="box-content">{children}</div>
    </div>
  );
}

BoxContainer.defaultProps = {
  title: '',
};

export default BoxContainer;
