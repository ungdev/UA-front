'use client';
import styles from './Square.module.scss';

/**
 * Square component that displays an image, content and a button.
 */
const Square = ({
  imgSrc = null,
  onClick = () => {},
  className = '',
  alt = '',
  replacementText = null,
  text = '',
  long = false,
}: {
  /** Source of the image to display above */
  imgSrc?: string | null;
  /** Function called when the user clicks on the button */
  onClick?: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  /** Class of the square */
  className?: string;
  /** alt */
  alt?: string;
  /** replacementText */
  replacementText?: string | null;
  /** text */
  text?: string;
  /** long */
  long?: boolean;
}) => {
  return (
    <div className={`${styles.square} ${className} ${long ? styles.long : ''}`} onClick={onClick}>
      {imgSrc && <img className="lazyload" alt={alt} data-src={imgSrc} loading="lazy" />}
      {!imgSrc && replacementText && <div className={styles.replacementText}>{replacementText}</div>}
      {text && <div className={styles.text}>{text}</div>}
    </div>
  );
};

export default Square;
