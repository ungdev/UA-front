import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

import Button from './Button';

/**
 * Displays a card which can contain an image, a content and a button
 */
const Card = ({ dark, imgSrc, content, buttonContent, onClick, href, target, className, classNameImg }) => {
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
      {imgSrc && <img className={`lazyload card-image ${classNameImg}`} alt="" data-src={imgSrc} />}
      {content && (
        <>
          <div className="card-content">{content}</div>
          {buttonContent !== '' && <div className="card-button">{button}</div>}
        </>
      )}
    </div>
  );
};

Card.propTypes = {
  /**
   * Whether the card should use dark theme or not
   */
  dark: PropTypes.bool,
  /**
   * Source of the image to display above
   */
  imgSrc: PropTypes.string,
  /**
   * Content of the card
   */
  content: PropTypes.node,
  /**
   * Content of the button
   */
  buttonContent: PropTypes.node,
  /**
   * Function called when the user clicks on the button
   */
  onClick: PropTypes.func,
  /**
   * Link URL surrounding the button
   */
  href: PropTypes.string,
  /**
   * Target for the link
   */
  target: PropTypes.string,
  /**
   * Class of the card
   */
  className: PropTypes.string,
  /**
   * Class of the image
   */
  classNameImg: PropTypes.string,
};

Card.defaultProps = {
  dark: false,
  imgSrc: null,
  content: null,
  buttonContent: '',
  onClick: () => {},
  href: null,
  target: '_self',
  className: '',
  classNameImg: '',
};

export default Card;
