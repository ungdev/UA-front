'use client';
import styles from './Square.module.scss';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

/**
 * Square component that displays an image, content and a button.
 */
const Square = ({
  imgSrc = null,
  onClick = () => {},
  className = '',
  alt = '',
  replacementText = null,
}: {
  /** Source of the image to display above */
  imgSrc?: string | null;
  /** Function called when the user clicks on the button */
  onClick?: () => void;
  /** Class of the square */
  className?: string;
  /** alt */
  alt?: string;
  /** replacementText */
  replacementText?: string | null;
}) => {
  return (
    <div className={`${styles.square} ${className}`} onClick={onClick}>
      <img className="lazyload" alt={alt} data-src={imgSrc} />
      {!imgSrc && replacementText && <div className={styles.replacementText}>{replacementText}</div>}
    </div>
  );
};

export default Square;
