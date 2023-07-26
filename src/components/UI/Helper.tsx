import { ReactNode } from 'react';

const Helper = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => (
  <div className={`helper ${className}`}>
    <i className="fas fa-question-circle helper-icon" tabIndex={0} />

    <div className="helper-content">{children}</div>
  </div>
);

Helper.defaultProps = {
  className: '',
};

export default Helper;
