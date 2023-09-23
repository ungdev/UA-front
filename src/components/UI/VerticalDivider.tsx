import styles from './VerticalDivider.module.scss';

/**
 * A vertical divider component.
 */
const Divider = ({
  className = '',
}: {
  /** An additional string to add to the component */
  className?: string;
}) => {
  return <div className={`${styles.verticalDivider} ${className}`}></div>;
};

export default Divider;
