'use client';
/**
 * A reusable button component that can be customized with different props.
 * @param {boolean} primary - Determines if the button is a primary button.
 * @param {function} onClick - The function to be called when the button is clicked.
 * @param {string} children - The text or element to be displayed inside the button.
 * @param {string} type - The type of the button (e.g. "submit", "reset", "button").
 * @param {string} leftIcon - The class name of the icon to be displayed on the left side of the button.
 * @param {string} rightIcon - The class name of the icon to be displayed on the right side of the button.
 * @param {boolean} disabled - Determines if the button is disabled.
 * @param {boolean} noStyle - Determines if the button has no default styles.
 * @param {boolean} isPink - Determines if the button has a pink background color.
 * @param {string} className - The class name(s) to be added to the button.
 * @returns {JSX.Element} - A button element with the specified props.
 */
const Button = ({
  primary = false,
  secondary = false,
  outline = false,
  large = false,
  long = false,
  veryLong = false,
  onClick = () => {},
  children = '',
  type = 'button',
  disabled = false,
  className = '',
}: {
  primary?: boolean;
  secondary?: boolean;
  outline?: boolean;
  large?: boolean;
  long?: boolean;
  veryLong?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <button
      type={type}
      className={`button ${primary ? 'primary' : ''} ${secondary ? 'secondary' : ''} ${className ? className : ''} ${
        outline ? 'outline' : ''
      } ${large ? 'large' : ''}  ${long ? 'long' : ''} ${veryLong ? 'very-long' : ''}  ${!children ? 'empty' : ''}`}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
