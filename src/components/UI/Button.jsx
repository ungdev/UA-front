import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays a button that triggers an action when clicked
 */
const Button = ({ primary, onClick, children, type, leftIcon, rightIcon, disabled, noStyle, className }) => {
  // eslint-disable-next-line no-console
  console.log(typeof children);
  // if (typeof children === 'string') {
  //   const firstLetter = children[0];
  //   const text = children.slice(1);
  //   children = (
  //     <>
  //       <span className="yellow">{firstLetter}</span>
  //       {text}
  //     </>
  //   );
  // }

  return (
    <div className={`buttonWrapper ${className} ${noStyle ? 'no-style' : ''} ${disabled ? 'disabled' : ''}`}>
      <div className={`topButtonDiv ${className} ${noStyle ? 'no-style' : ''} ${disabled ? 'disabled' : ''}`}>
        <div className={`bottomButtonDiv ${noStyle ? 'no-style' : ''} ${disabled ? 'disabled' : ''}`}>
          <button
            type={type}
            className={`button ${primary ? 'primary' : ''} ${noStyle ? 'no-style' : ''} ${!children ? 'empty' : ''}`}
            onClick={onClick}
            disabled={disabled}>
            {leftIcon && <i className={`button-icon-left ${leftIcon}`} />}
            {children}
            {rightIcon && <i className={`button-icon-right ${rightIcon}`} />}
          </button>
        </div>
      </div>
    </div>
  );
};

Button.propTypes = {
  /**
   * Whether the button is a primary button or not
   */
  primary: PropTypes.bool,
  /**
   * Function called when the user clicks on the button
   */
  onClick: PropTypes.func,
  /**
   * Button content
   */
  children: PropTypes.node,
  /**
   * Type button
   */
  type: PropTypes.string,
  /**
   * Left icon class name
   */
  leftIcon: PropTypes.string,
  /**
   * Right icon class name
   */
  rightIcon: PropTypes.string,
  /**
   * Is the button disabled ?
   */
  disabled: PropTypes.bool,
  /**
   * Should the button have no style ?
   */
  noStyle: PropTypes.bool,
  /**
   * Class of the container
   */
  className: PropTypes.string,
};

Button.defaultProps = {
  primary: false,
  onClick: () => {},
  children: '',
  type: 'button',
  leftIcon: '',
  rightIcon: '',
  disabled: false,
  noStyle: false,
  className: '',
};

export default Button;
