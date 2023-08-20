'use client';
import Link from 'next/link';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

import Button from './Button';
import Divider from './Divider';
import { ReactNode } from 'react';

/**
 * Card component that displays an image, content and a button.
 * @param {boolean} dark - Whether the card should use dark theme or not
 * @param {string} imgSrc - Source of the image to display above
 * @param {node} content - Content of the card
 * @param {node} buttonContent - Content of the button
 * @param {function} onClick - Function called when the user clicks on the button
 * @param {string} href - Link URL surrounding the button
 * @param {string} target - Target for the link
 * @param {string} className - Class of the card
 * @param {string} classNameImg - Class of the image
 * @param {string} alt - alt
 * @param {string} divider - Where the divider should be located
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
  dark?: boolean;
  imgSrc?: string | null;
  children?: ReactNode;
  buttonContent?: ReactNode;
  onClick?: () => void;
  href?: string | null;
  target?: string;
  className?: string;
  classNameImg?: string;
  alt?: string;
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
    <div className={`card ${className} ${dark ? 'dark' : ''}`}>
      {imgSrc && (
        <>
          <img className={`lazyload card-image ${classNameImg}`} alt={alt} data-src={imgSrc} />
          {divider === 'belowImage' && <Divider />}
        </>
      )}
      {children && (
        <>
          <div className="card-content">{children}</div>
          {buttonContent !== '' && <div className="card-button">{button}</div>}
        </>
      )}
      {divider === 'bottom' && <Divider />}
    </div>
  );
};

export default Card;
