import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

import Button from './Button';
import './Card.css';

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
  className,
  classNameImg,
}) => {
  const button = <Button primary onClick={onClick}>{buttonContent}</Button>;
  const LinkComponent = href.includes('http') ? 'a' : Link;
  return (
    <div className={`card ${className} ${dark ? 'dark' : ''}`}>
      {imgSrc && <img className={`lazyload card-img ${classNameImg}`} alt="" data-src={imgSrc} />}
      {content && (
        <>
          <div className="card-content">{content}</div>
          { buttonContent !== ''
          && (
            <div className="card-button">
              { href ? <LinkComponent href={href}>{button}</LinkComponent> : button }
            </div>
          )}
        </>
      )}
    </div>
  );
};

Card.propTypes = {
  /**
   * Dark theme
   */
  dark: PropTypes.bool,
  /**
   * The source of the image to display to the top
   */
  imgSrc: PropTypes.string,
  /**
   * The content of the card
   */
  content: PropTypes.node,
  /**
   * The content of the button
   */
  buttonContent: PropTypes.node,
  /**
   * The function triggered when the user clicks on the button
   */
  onClick: PropTypes.func,
  /**
   * The href of the link surrounding the button
   */
  href: PropTypes.string,
  /**
   * The class to apply to the card
   */
  className: PropTypes.string,
  /**
   * The class to apply to the image
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
  className: '',
  classNameImg: '',
};

export default Card;
