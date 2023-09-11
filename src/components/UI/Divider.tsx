import styles from './Divider.module.scss';

/**
 * A component that renders a divider with an optional white color.
 */
const Divider = ({
  white = false,
  className = '',
}: {
  /** A boolean indicating whether the divider should be white or not. */
  white?: boolean;
  /** A string of additional class names to apply to the divider. */
  className?: string;
}) => {
  return <div className={`${styles.divider} ${white && styles.white} ${className}`}></div>;
};

export default Divider;
