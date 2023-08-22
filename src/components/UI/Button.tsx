'use client';
/**
 * A reusable button component that can be customized with different props.
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
  /** Whether the button is primary or not. */
  primary?: boolean;
  /** Whether the button is secondary or not. */
  secondary?: boolean;
  /** Whether the button is outline or not. */
  outline?: boolean;
  /** Whether the button is large or not. */
  large?: boolean;
  /** Whether the button is long or not. */
  long?: boolean;
  /** Whether the button should take all the width of its container or not. */
  veryLong?: boolean;
  /** The function to call when the button is clicked. */
  onClick?: () => void;
  /** The content of the button. */
  children?: React.ReactNode;
  /** The type of the button. */
  type?: 'submit' | 'reset' | 'button';
  /** Whether the button is disabled or not. */
  disabled?: boolean;
  /** An optional class name for the button. */
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
