import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

import Button from './Button';
import './Card.css';

const Card = ({ imgSrc, content, buttonContent, onClick, link, classNameCard, classNameImg }) => {
  const button = <Button primary onClick={onClick}>{buttonContent}</Button>;
  return (
    <div className={`card ${classNameCard}`}>
      {imgSrc && <img className={`lazyload card-img ${classNameImg}`} alt="" data-src={imgSrc} />}
      { content
        && (
        <>
          <div className="card-content">{content}</div>
          <div className="card-button">
            {buttonContent !== '' && link ? <Link href={link} key={link}>{button}</Link> : button}
          </div>
        </>
        ) }
    </div>
  );
};

Card.propTypes = {
  imgSrc: PropTypes.string,
  content: PropTypes.object,
  buttonContent: PropTypes.node,
  onClick: PropTypes.func,
  link: PropTypes.string,
  classNameCard: PropTypes.string,
  classNameImg: PropTypes.string,
};

Card.defaultProps = {
  imgSrc: undefined,
  buttonContent: '',
  onClick: () => {},
  link: undefined,
  content: undefined,
  classNameCard: '',
  classNameImg: '',
};

export default Card;
