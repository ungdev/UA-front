'use client';
import React from 'react';

const Helper = ({
  children,
  className,
}: {
  /**
   * To display when the cursor is hover the helper
   */
  children: Node;
  /**
   * Class to apply to the container
   */
  className: string;
}) => (
  <div className={`helper ${className}`}>
    <i className="fas fa-question-circle helper-icon" tabIndex="0" />

    <div className="helper-content">{children}</div>
  </div>
);

Helper.defaultProps = {
  className: '',
};

export default Helper;
