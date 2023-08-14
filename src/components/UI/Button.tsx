'use client';
/**
 * A reusable button component that can be customized with different props.
 * @param {boolean} primary - Whether the button is primary or not.
 * @param {boolean} secondary - Whether the button is secondary or not.
 * @param {boolean} outline - Whether the button is outline or not.
 * @param {boolean} large - Whether the button is large or not.
 * @param {boolean} long - Whether the button is long or not.
 * @param {boolean} veryLong - Whether the button is very long or not.
 * @param {() => void} onClick - The function to call when the button is clicked.
 * @param {React.ReactNode} children - The content of the button.
 * @param {('submit' | 'reset' | 'button')} type - The type of the button.
 * @param {boolean} disabled - Whether the button is disabled or not.
 * @param {string} className - The class name of the button.
 * @returns {JSX.Element} - The Button component.
 * @example
 * <Button primary onClick={() => console.log('Button clicked')}>
 *  Button
 * </Button>
 * @example
 * <Button secondary outline large long veryLong>
 * Button
 * </Button>
 * @example
 * <Button disabled>
 * Button
 * </Button>
 **/
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
