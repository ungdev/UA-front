import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

import Button from './Button';
import Divider from './Divider';

/**
 * Displays a card which can contain an image, a content and a button
 */
const Card = ({
  dark,
  imgSrc,
  content,
  buttonContent,
  onClick,
  href,
  target,
  className,
  classNameImg,
  alt,
  divider,
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
      <Link href={href}>
        <a>{button}</a>
      </Link>
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
      {content && (
        <>
          <div className="card-content">{content}</div>
          {buttonContent !== '' && <div className="card-button">{button}</div>}
        </>
      )}
      {divider === 'bottom' && <Divider />}
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
  /**
   * alt
   */
  alt: PropTypes.string,
  /**
   * Where the divider should be located
   */
  divider: PropTypes.oneOf(['belowImage', 'bottom', 'nowhere']),
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
  alt: '',
  divider: 'bottom',
};

export default Card;
