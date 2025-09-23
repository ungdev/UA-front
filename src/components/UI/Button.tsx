'use client';
import styles from './Button.module.scss';
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
  onLightBackground = false,
  outline = false,
  large = false,
  long = false,
  veryLong = false,
  onClick = undefined, // default to undefined to avoid bugs
  children = '',
  type = 'button',
  disabled = false,
  className = '',
  umamiEvent = undefined,
}: {
  /** Whether the button is primary or not. */
  primary?: boolean;
  /** Whether the button is secondary or not. */
  secondary?: boolean;
  /** Whether the button is on a light or a dark background.
   * If this is set to true on a normal button (neither primary nor secondary), instead of fading white on hover, it fades black */
  onLightBackground?: boolean;
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
  /** The name of the event to send to Umami on click. If not provided, no event is sent. */
  umamiEvent?: string;
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${primary ? styles.primary : ''} ${secondary ? styles.secondary : ''}
                  ${onLightBackground ? styles.onLightBackground : ''} ${className} ${outline ? styles.outline : ''}
                  ${large ? styles.large : ''}  ${long ? styles.long : ''} ${veryLong ? styles.veryLong : ''}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}>
      {umamiEvent && <div data-umami-event={umamiEvent}></div>}
      <div className={styles.buttonContainer}>{children}</div>
    </button>
  );
};

export default Button;
