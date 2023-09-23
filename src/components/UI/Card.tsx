'use client';
import styles from './Card.module.scss';
import Link from 'next/link';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

import Button from '@/components/UI/Button';
import Divider from '@/components/UI/Divider';
import { ReactNode } from 'react';

/**
 * Card component that displays an image, content and a button.
 */
const Card = ({
  dark = false,
  imgSrc = null,
  children = null,
  buttonContent = '',
  onClick = () => {},
  href = null,
  target = '_self',
  className = '',
  classNameImg = '',
  alt = '',
  divider = 'bottom',
}: {
  /** Whether the card should use dark theme or not */
  dark?: boolean;
  /** Source of the image to display above */
  imgSrc?: string | null;
  /** Content of the card */
  children?: ReactNode;
  /** Content of the button */
  buttonContent?: ReactNode;
  /** Function called when the user clicks on the button */
  onClick?: () => void;
  /** Link URL surrounding the button */
  href?: string | null;
  /** Target for the link */
  target?: string;
  /** Class of the card */
  className?: string;
  /** Class of the image */
  classNameImg?: string;
  /** alt */
  alt?: string;
  /** Where the divider should be located */
  divider?: 'belowImage' | 'bottom';
}) => {
  let button = (
    <Button primary onClick={onClick}>
      {buttonContent}
    </Button>
  );
  if (href) {
    button = href.includes('http') ? (
      <a href={href} target={target} rel="noopener noreferrer">
        {button}
      </a>
    ) : (
      <Link href={href}>{button}</Link>
    );
  }

  return (
    <div className={`${styles.card} ${className} ${dark && styles.dark}`}>
      {imgSrc && (
        <>
          <img className={`${styles.cardImage} ${classNameImg}`} alt={alt} data-src={imgSrc} />
          {divider === 'belowImage' && <Divider />}
        </>
      )}
      {children && (
        <>
          <div className={styles.cardContent}>{children}</div>
          {buttonContent !== '' && <div className={styles.cardButton}>{button}</div>}
        </>
      )}
      {divider === 'bottom' && <Divider />}
    </div>
  );
};

export default Card;
